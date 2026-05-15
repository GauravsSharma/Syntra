"use client";

import { useEffect, useState } from "react";
import { Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddKnowledge } from "@/hooks/useKnowledge";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function AddKnowledgeModal({ open, onClose, tab = "website" }) {
  const [activeTab, setActiveTab] = useState(tab);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [qaContent, setQaContent] = useState({ title: "", content: "" });
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const { mutate, isPending } = useAddKnowledge()
  const queryClient = useQueryClient();
  const tabs = [
    { id: "website", label: "WEBSITE" },
    { id: "qa", label: "Q&A / TEXT" },
    { id: "file", label: "FILE UPLOAD" },
  ];

  const isValidUrl = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const validate = () => {
    const newErrors = {};

    if (activeTab === "website") {
      if (!websiteUrl.trim()) {
        newErrors.websiteUrl = "Website URL is required.";
      } else if (!isValidUrl(websiteUrl.trim())) {
        newErrors.websiteUrl = "Please enter a valid URL (e.g. https://example.com).";
      }
    }

    if (activeTab === "qa") {
      if (!qaContent.title.trim()) {
        newErrors.qaTitle = "Title is required.";
      }
      if (!qaContent.content.trim()) {
        newErrors.qaContent = "Content is required.";
      } else if (qaContent.content.trim().length < 20) {
        newErrors.qaContent = "Content must be at least 20 characters.";
      }
    }

    if (activeTab === "file") {
      if (!file) {
        newErrors.file = "Please upload a CSV file.";
      } else if (!file.name.endsWith(".csv")) {
        newErrors.file = "Only CSV files are allowed.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleClose = () => {
    setWebsiteUrl("");
    setQaContent({ title: "", content: "" });
    setFile(null);
    setErrors({});
    setActiveTab(tab);
    onClose();
  };

  const handleTabSwitch = (tabId) => {
    setActiveTab(tabId);
    setErrors({});
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      setErrors((prev) => ({ ...prev, file: undefined }));
    }
  };

  const handleFileSelect = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setErrors((prev) => ({ ...prev, file: undefined }));
    }
  };
  const handleSubmit = () => {
    if (!validate()) return;
    const type = activeTab === "website" ? "website" : activeTab === "qa" ? "qa" : "file";
    let formdata = new FormData();
    if (type === "website") {
      formdata.append("type", "website");
      formdata.append("url", websiteUrl);
    }
    if (type === "qa") {
      console.log("qa submit called !");
      formdata.append("type", "text");
      formdata.append("title", qaContent.title);
      formdata.append("content", qaContent.content);
    }
    if (type === "file") {
      formdata.append("type", "file");
      formdata.append("file", file);
      console.log("file submit called !");
    }
    mutate(formdata, {
      onSuccess: () => {
        handleClose();
        toast.success("Knowledge source added successfully!");
        queryClient.invalidateQueries({ queryKey: ["et-knowledge-sources"] });
      },
      onError: (err) => {
        console.log(err);
        toast.error("Failed to add knowledge source.");
      }
    })
  }
  return (
     <Dialog open={open} onOpenChange={handleClose}>
      {/*
       * Responsive strategy:
       *  - Mobile  : full-width bottom sheet, rounded top corners only,
       *              pinned to the bottom of the viewport.
       *  - sm (640px+) : classic centered modal, max-w-xl, fully rounded.
       *
       * Tailwind's `DialogContent` from shadcn/ui ships with its own
       * position/transform classes.  Override them entirely with the
       * classes below so the two layouts work correctly.
       */}
      <DialogContent
        className={[
          // ── shared ──────────────────────────────────────────────────
          "bg-[#1c1c1c] border border-zinc-700 text-white shadow-2xl p-0 gap-0",
          "[&>button]:opacity-100 [&>button]:text-zinc-400 [&>button]:hover:text-white",
 
          // ── mobile: bottom sheet ─────────────────────────────────────
          // Remove the default centered-modal transforms and position it
          // at the bottom edge instead.
          "fixed inset-x-0 bottom-0 top-auto",
          "w-full max-w-full",
          "rounded-t-2xl rounded-b-none",
          "translate-x-0 translate-y-0",   // override shadcn -50%/-50%
 
          // ── sm+: centered modal ──────────────────────────────────────
          "sm:inset-auto sm:left-1/2 sm:top-1/2",
          "sm:-translate-x-1/2 sm:-translate-y-1/2",
          "sm:max-w-xl",
          "sm:rounded-2xl",
        ].join(" ")}
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="px-4 pt-5 pb-4 sm:px-6 sm:pt-6">
          <DialogTitle className="text-white text-base sm:text-lg font-semibold mb-1">
            Add New Source
          </DialogTitle>
          <p className="text-zinc-400 text-xs">
            Choose a content type to train your assistant.
          </p>
 
          {/* Tabs */}
          <div className="flex items-center mt-4 sm:mt-5 border-b border-zinc-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabSwitch(tab.id)}
                className={`relative px-3 sm:px-4 pb-3 text-xs font-semibold tracking-wider transition-colors ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
 
        {/* ── Tab Content ─────────────────────────────────────────────── */}
        <div className="px-4 pb-4 sm:px-6">
 
          {/* WEBSITE TAB */}
          {activeTab === "website" && (
            <div className="space-y-4">
              <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-3 sm:p-4 flex items-start gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-xs mb-0.5">
                    Crawl Website
                  </p>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Enter a website URL to crawl significantly or add a specific
                    page link to provide focused context.
                  </p>
                </div>
              </div>
 
              <div>
                <label className="text-xs text-zinc-300 mb-2 block">
                  Website URL <span className="text-red-400">*</span>
                </label>
                <Input
                  placeholder="https://example.com"
                  value={websiteUrl}
                  onChange={(e) => {
                    setWebsiteUrl(e.target.value);
                    if (errors.websiteUrl)
                      setErrors((prev) => ({ ...prev, websiteUrl: undefined }));
                  }}
                  className={`bg-[#0f0f0f] border text-white placeholder:text-zinc-600 focus-visible:ring-0 h-10 rounded-lg transition-colors ${
                    errors.websiteUrl
                      ? "border-red-500 focus-visible:border-red-500"
                      : "border-zinc-700 focus-visible:border-zinc-500"
                  }`}
                />
                {errors.websiteUrl && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {errors.websiteUrl}
                  </p>
                )}
              </div>
            </div>
          )}
 
          {/* Q&A TAB */}
          {activeTab === "qa" && (
            <div className="space-y-4">
              <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-xl p-3 sm:p-4">
                <p className="text-white font-medium text-xs mb-1">Q&A / Text</p>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Manually copy-paste FAQs, internal notes, or policies directly
                  into the editor.
                </p>
              </div>
 
              {/* Title */}
              <div>
                <label className="text-xs text-zinc-300 mb-2 block">
                  Title <span className="text-red-400">*</span>
                </label>
                <Input
                  placeholder="e.g. FAQs, Internal Notes, Policies..."
                  value={qaContent.title}
                  onChange={(e) => {
                    setQaContent((prev) => ({ ...prev, title: e.target.value }));
                    if (errors.qaTitle)
                      setErrors((prev) => ({ ...prev, qaTitle: undefined }));
                  }}
                  className={`bg-[#0f0f0f] border text-white placeholder:text-zinc-600 focus-visible:ring-0 h-10 rounded-lg transition-colors ${
                    errors.qaTitle
                      ? "border-red-500 focus-visible:border-red-500"
                      : "border-zinc-700 focus-visible:border-zinc-500"
                  }`}
                />
                {errors.qaTitle && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {errors.qaTitle}
                  </p>
                )}
              </div>
 
              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-zinc-300">
                    Content <span className="text-red-400">*</span>
                  </label>
                  <span
                    className={`text-xs ${
                      qaContent.content.length > 0 &&
                      qaContent.content.length < 20
                        ? "text-red-400"
                        : "text-zinc-500"
                    }`}
                  >
                    {qaContent.content.length} / 20 min
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={qaContent.content}
                  onChange={(e) => {
                    setQaContent((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }));
                    if (errors.qaContent)
                      setErrors((prev) => ({ ...prev, qaContent: undefined }));
                  }}
                  placeholder="Paste your Q&A content here..."
                  className={`w-full bg-[#0f0f0f] border rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 text-xs resize-none focus:outline-none transition-colors ${
                    errors.qaContent
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-700 focus:border-zinc-500"
                  }`}
                />
                {errors.qaContent && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {errors.qaContent}
                  </p>
                )}
              </div>
            </div>
          )}
 
          {/* FILE UPLOAD TAB */}
          {activeTab === "file" && (
            <div className="space-y-4">
              <div className="bg-slate-600/10 border border-slate-500/30 rounded-xl p-3 sm:p-4">
                <p className="text-white font-medium text-xs mb-1">
                  File Upload
                </p>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Upload CSV files to instantly train your assistant with
                  existing documents.
                </p>
              </div>
 
              <div>
                <label
                  htmlFor="file-upload"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors ${
                    errors.file
                      ? "border-red-500"
                      : isDragging
                      ? "border-zinc-400 bg-zinc-800/30"
                      : "border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  {file ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span className="text-emerald-400 text-sm">✓</span>
                      </div>
                      <p className="text-white text-xs font-medium">
                        {file.name}
                      </p>
                      <p className="text-zinc-500 text-xs">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setFile(null);
                        }}
                        className="text-zinc-500 text-xs hover:text-red-400 transition-colors mt-1"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-zinc-400 text-xs">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-zinc-600 text-xs mt-1">
                        CSV files only
                      </p>
                    </>
                  )}
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                {errors.file && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {errors.file}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
 
        {/* ── Footer ──────────────────────────────────────────────────── */}
        {/*
         * Mobile  : buttons are full-width and stacked (Cancel below Import).
         * sm+     : buttons are inline, right-aligned, auto width.
         * `flex-col-reverse` keeps "Import" visually on top on mobile
         * while keeping Cancel first in DOM order for keyboard/a11y.
         */}
        <div className="flex flex-col-reverse gap-2 px-4 pb-6 pt-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:px-6">
          <Button
            variant="ghost"
            onClick={handleClose}
            className="w-full sm:w-auto text-zinc-300 hover:text-white hover:bg-zinc-800 px-5 text-xs"
          >
            Cancel
          </Button>
 
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 font-medium px-5 text-xs flex items-center justify-center gap-2"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? "Importing..." : "Import Source"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}