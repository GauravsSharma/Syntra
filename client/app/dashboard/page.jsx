"use client"
import { SetupProgress } from "@/components/overview/Setupprogress";
import { KnowledgeBase } from "@/components/overview/KnowledgebaseOverview";
import { Sections } from "@/components/overview/SectionsOverview";
import { RecentChats } from "@/components/overview/Recentchats";
import { InstallWidget } from "@/components/overview/Installwidget";
import { useGetOverview } from "@/hooks/useOrganization";
import { useEffect, useState } from "react";

export default function OverviewPage() {
  const {data,isLoading} = useGetOverview()
  const [completedSteps, setCompletedSteps] = useState([]);
  const [konwledgeBaseCount, setKnowledgeBaseCount] = useState({
    website: 0,
    file: 0,
    text: 0
  });
 const [sections, setSections] = useState([]);
 const [conversations, setConversations] = useState([]);
 useEffect(()=>{
   if(!data) return;
   console.log(data);
   
   const {steps, knowledgeBaseCount, sections, conversations} = data.data;
   console.log(steps);
   setCompletedSteps(steps)
  setKnowledgeBaseCount(knowledgeBaseCount)
  setSections(sections)
  setConversations(conversations)
 },[data,data?.data])

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 md:p-8">
        <SetupProgress completedSteps={completedSteps} />

        <div className="flex flex-col gap-4">
          {/* Knowledge Base + Sections — full width */}  
          <div className="flex flex-col gap-4">
            <KnowledgeBase knowledgeBaseCount={konwledgeBaseCount} />
            <Sections sections={sections} />
          </div>

          {/* Install Widget + Recent Chats — stacked on mobile, side by side on md+ */}
          <div className="flex flex-col md:flex-row justify-start w-full items-stretch gap-4">
            <InstallWidget />
            <RecentChats conversations={conversations} />
          </div>
        </div>
      </div>
    </div>
  );
}