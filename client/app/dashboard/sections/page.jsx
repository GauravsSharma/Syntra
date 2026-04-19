'use client'

import { useState } from 'react'
import SectionsHeader from '@/components/sections/SectionsHeader'
import SectionsTable from '@/components/sections/SectionsTable'
import SectionFormFields from '@/components/sections/SectionFormFields'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useGetKnowledgeSources } from '@/hooks/useKnowledge'
import { Button } from '@/components/ui/button'

const SectionsPage = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const { data: knowledgeSources, isLoading: isLoadingSources } = useGetKnowledgeSources();

    const [selectedSources, setSelectedSources] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [sections, setSections] = useState([]);
    const [isLoadingSections, setIsLoadingSections] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        tone: "Neutral",
        description: "",
        allowedTopics: "",
        excludedTopics: "",
    });

    const handleCreateSection = () => {
        setSelectedSection({
            id: "new",
            name: "",
            tone: "Neutral",
            source: 0,
            description: "",
            status: "Draft",
            scopeLabel: ""
        })
        setSelectedSources([]);
        setIsSheetOpen(true);
        setFormData({});
    }
    const handleSaveSection = () => {
        setIsSaving(true);
        console.log(formData);
        console.log(selectedSources);
        
        // Simulate API call to save section
    }
    const handleDeleteSection = () => {
        setIsSaving(true);
        // Simulate API call to delete section
    }
    const isPreviewMode = selectedSection?.id !== "new";
    return (
        <div className="min-h-screen bg-[#0a0a0a] px-8 py-8">
            <SectionsHeader onCreateSection={handleCreateSection} />
            <SectionsTable
                sections={sections}
                isLoading={false}
                onCreateSection={handleCreateSection}
            />
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md border-l border-zinc-800 bg-[#131313] p-0 flex flex-col">
                    {selectedSection && (
                        <>
                            <SheetHeader className="p-6 border-b border-white/5">
                                <SheetTitle className="text-xl text-white">
                                    {selectedSection.id === "new"
                                        ? "Create Section"
                                        : "View Section"}
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                <SectionFormFields
                                    formData={formData}
                                    setFormData={setFormData}
                                    selectedSources={selectedSources}
                                    setSelectedSources={setSelectedSources}
                                    knowledgeSources={knowledgeSources}
                                    isLoadingSources={isLoadingSources}
                                    isDisabled={isPreviewMode}
                                />
                            </div>
                            {selectedSection?.id === "new" && (
                                <div className="p-6 border-t border-white/5">
                                    <Button
                                        className="w-full bg-white text-black rounded-lg hover:bg-zinc-200"
                                        onClick={handleSaveSection}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? "Creating..." : "Create Section"}
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                    {selectedSection?.id !== "new" && (
                        <div className="p-6 bg-red-500/5 border-t border-red-500/10 space-y-3">

                            <h5 className="text-sm font-medium text-red-400">
                                Danger Zone
                            </h5>

                            <p className="text-xs text-red-500/70">
                                Deleting this section will remove all associated routing rules.
                            </p>

                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-full rounded-lg cursor-pointer bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
                                onClick={handleDeleteSection}
                                disabled={isSaving}
                            >
                                {isSaving ? "Deleting..." : "Delete Section"}
                            </Button>

                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default SectionsPage