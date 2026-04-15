"use client"
import { cn } from '@/lib/utils';
import { Building2, ChevronLeft, GlobeIcon, LinkIcon, Sparkles, Settings } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useSendMetadata } from '@/hooks/useUser';
const STEPS = [
    {
        id: "business",
        label: "Business Name",
        question: "What is the name of your business?",
        description: "This will be the identity of your Organization.",
        icon: Building2,
        placeholder: "e.g. Acme Corp",
        type: "text",
        field: "businessName",
    },
    {
        id: "website",
        label: "Website",
        question: "What is your website URL?",
        description: "We will scrape data from here to train your chatbot.",
        icon: GlobeIcon,
        placeholder: "https://acme.com",
        type: "url",
        field: "websiteUrl",
    },
    {
        id: "links",
        label: "Extra Context",
        question: "Any other links to add?",
        description: "Add external links like Notion pages or Help docs to improve knowledge.",
        icon: LinkIcon,
        placeholder: "https://notion.so/docs ...",
        type: "textarea",
        badge: "Optional",
        field: "externalLinks",
    },
];

const InitialForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const {mutate, isPending} = useSendMetadata()
    const [formData, setFormData] = useState({
        businessName: "",
        websiteUrl: "",
        externalLinks: "",
    });

    const inputRef = useRef(null);
    const isLastStep = currentStep === STEPS.length - 1;
    const progress = ((currentStep + 1) / STEPS.length) * 100;
    const stepData = STEPS[currentStep];
    const Icon = stepData.icon;
    const isValid =
        formData[stepData.field]?.trim() !== "" || stepData.badge === "Optional";

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [currentStep]);

    const animateTransition = (callback) => {
        setIsAnimating(true);
        setTimeout(() => {
            callback();
            setIsAnimating(false);
        }, 300);
    };

    const handleNext = () => {
        if (!isValid) return;
        if (isLastStep) {
            handleSubmit();
            return;
        }
        animateTransition(() => setCurrentStep((prev) => prev + 1));
    };

    const handleBack = () => {
        if (currentStep === 0) return;
        animateTransition(() => setCurrentStep((prev) => prev - 1));
    };

    const handleSubmit = () => {
        // Simulate async submission
        mutate(formData, {
            onSuccess: () => {
                alert("Organization setup complete!");
               // You can redirect or reset the form here
            },
            onError: () => {
                alert("There was an error submitting your data. Please try again.");
            },
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (stepData.type === "textarea") {
                if (e.metaKey || e.ctrlKey) handleNext();
            } else {
                handleNext();
            }
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [stepData.field]: e.target.value,
        }));
    };

    return (
        <div className="relative w-full font-sans min-h-screen bg-black text-white flex flex-col">

            {/* Top progress bar */}
            <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-50">
                <div
                    className="h-full bg-indigo-500 transition-all duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Top right label */}
            <div className="fixed top-6 right-8 z-50">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest font-serif">
                    Setup Your Account
                </span>
            </div>

            {/* Main content */}
            <div className="flex-1 flex items-center justify-center px-6">
                {isPending ? (
                    /* Submitting state */
                    <div className="flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
                        <div className="relative mb-6">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-indigo-500/30 blur-2xl rounded-full animate-pulse" />
                            {/* Icon box */}
                            <div className="relative w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/30 mx-auto">
                                <Sparkles className="w-8 h-8 text-white animate-bounce" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold text-white mb-2 mt-2">
                            Storing your organization info!
                        </h2>
                        <p className="text-zinc-500 text-sm">
                            Scanning {formData.websiteUrl}...
                        </p>
                    </div>
                ) : (
                    /* Form state */
                    <div className="w-full max-w-xl">
                        <div
                            className={cn(
                                "transition-all duration-300 ease-in-out transform",
                                isAnimating
                                    ? "opacity-0 translate-y-4 scale-95"
                                    : "opacity-100 translate-y-0 scale-100"
                            )}
                        >
                            {/* Back button + Step badge row */}
                            <div className="flex items-center gap-3 mb-8">
                                {currentStep > 0 && (
                                    <button
                                        onClick={handleBack}
                                        className="w-7 h-7 flex items-center justify-center rounded-full text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                )}
                                <span className="text-[11px] font-semibold tracking-widest uppercase bg-indigo-600/80 text-indigo-200 px-2.5 py-1 rounded">
                                    Step {currentStep + 1} of {STEPS.length}
                                </span>
                            </div>

                            {/* Question */}
                            <h1 className="text-4xl font-semibold text-white leading-tight mb-3">
                                {stepData.question}
                            </h1>

                            {/* Description */}
                            <p className="text-zinc-500 text-sm mb-8">
                                {stepData.description}
                                {stepData.badge && (
                                    <span className="ml-2 text-xs border border-zinc-700 text-zinc-400 px-2 py-0.5 rounded-full">
                                        {stepData.badge}
                                    </span>
                                )}
                            </p>

                            {/* Input */}
                            <div className="relative mb-8">
                                {stepData.type === "textarea" ? (
                                    <textarea
                                        ref={inputRef}
                                        value={formData[stepData.field]}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder={stepData.placeholder}
                                        rows={3}
                                        className="w-full bg-transparent border-0 border-b border-zinc-700 focus:border-indigo-500 outline-none text-white placeholder-zinc-600 text-base py-2 pr-10 resize-none transition-colors duration-200"
                                    />
                                ) : (
                                    <input
                                        ref={inputRef}
                                        type={stepData.type}
                                        value={formData[stepData.field]}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder={stepData.placeholder}
                                        className="w-full bg-transparent border-0 border-b border-zinc-700 focus:border-indigo-500 outline-none text-white placeholder-zinc-600 text-base py-2 pr-10 transition-colors duration-200"
                                    />
                                )}
                                {/* Icon on right */}
                                <div className="absolute right-2 bottom-2.5 text-zinc-600">
                                    <Icon className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Footer row */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-zinc-600 flex items-center gap-1">
                                    {stepData.type === "textarea" ? (
                                        <>
                                            <kbd className="text-zinc-500 border border-zinc-700 rounded px-1 py-0.5 text-[10px]">⌘</kbd>
                                            <span>+</span>
                                            <kbd className="text-zinc-500 border border-zinc-700 rounded px-1 py-0.5 text-[10px]">Enter</kbd>
                                            <span className="ml-1">to continue</span>
                                        </>
                                    ) : (
                                        <>
                                            Press{" "}
                                            <kbd className="mx-1 text-zinc-500 border border-zinc-700 rounded px-1 py-0.5 text-[10px]">Enter ↵</kbd>
                                            {" "}to continue
                                        </>
                                    )}
                                </span>

                                <button
                                    onClick={handleNext}
                                    disabled={!isValid}
                                    className={cn(
                                        "flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                        isValid
                                            ? "bg-white text-black hover:bg-zinc-200"
                                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                    )}
                                >
                                    {isLastStep ? (
                                        <>
                                            Submit
                                            <Settings className="w-4 h-4" />
                                        </>
                                    ) : (
                                        <>
                                            Continue
                                            <span className="text-base">→</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InitialForm;