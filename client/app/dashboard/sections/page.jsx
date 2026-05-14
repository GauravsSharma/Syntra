'use client'

import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import SectionsHeader from '@/components/sections/SectionsHeader'
import SectionsTable from '@/components/sections/SectionsTable'
import SectionFormFields from '@/components/sections/SectionFormFields'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useGetKnowledgeSources } from '@/hooks/useKnowledge'
import { Button } from '@/components/ui/button'
import {
  useAddSection,
  useDeleteSection,
  useGetSections,
  useToggleSectionStatus
} from '@/hooks/useSections'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useSectionStore } from '@/stores/useSectionStore'
import { useUserStore } from '@/stores/useUserStore'

const INITIAL_FORM = {
  name: '',
  tone: 'Neutral',
  description: '',
  allowedTopics: '',
  excludedTopics: '',
}

const SectionsPage = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState(null)

  const { metadata } = useUserStore()

  const { data: knowledgeSources, isLoading: isLoadingSources } =
    useGetKnowledgeSources(metadata)

  const { mutate: deleteSec, isPending: isDeleting } =
    useDeleteSection()
const { mutate: toggleStatus, isPending: togglePending } =
  useToggleSectionStatus()
  const [selectedSources, setSelectedSources] = useState([])

  const { isLoading } = useGetSections(metadata)

  const { sections } = useSectionStore()

  const [formData, setFormData] = useState(INITIAL_FORM)

  const { mutate, isPending: isSaving } = useAddSection()

  const handleCreateSection = () => {
    setSelectedSection({
      id: 'new',
      name: '',
      tone: 'Neutral',
      source: 0,
      description: '',
      status: 'Draft',
      scopeLabel: '',
    })

    setSelectedSources([])
    setIsSheetOpen(true)
    setFormData(INITIAL_FORM)
  }

  const handleSaveSection = () => {
    const payload = {
      name: formData.name,
      tone: formData.tone,
      description: formData.description,
      allowed_topics: formData.allowedTopics
        .split(',')
        .map((t) => t.trim()),

      blocked_topics: formData.excludedTopics
        .split(',')
        .map((t) => t.trim()),

      data_sources: selectedSources,
    }

    mutate(payload, {
      onSuccess: () => {
        toast.success('Section created successfully')
        setIsSheetOpen(false)
        setFormData(INITIAL_FORM)
      },

      onError: () => {
        toast.error('Failed to create section')
      },
    })
  }

  const handleDeleteSection = () => {
    if (selectedSection.id === 'new' || !selectedSection.id) {
      toast.error('Cannot delete unsaved section')
      return
    }

    confirm(
      'Are you sure you want to delete this section? This action cannot be undone.'
    ) &&
      deleteSec(selectedSection.id, {
        onSuccess: () => {
          setIsSheetOpen(false)
          toast.success('Section deleted successfully')
        },

        onError: () => {
          toast.error('Failed to delete section')
        },
      })
  }

  const onPreview = (section) => {
    setSelectedSection(section)

    setFormData({
      name: section.name,
      tone: section.tone,
      description: section.description,
      allowedTopics: section.allowedTopics.join(', '),
      excludedTopics: section.blockedTopics.join(', '),
    })

    setSelectedSources(section.sourceIds || [])
    setIsSheetOpen(true)
  }

  const isPreviewMode = selectedSection?.id !== 'new'

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-6 md:p-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionsHeader
          onCreateSection={handleCreateSection}
        />

        <SectionsTable
          sections={sections}
          isLoading={isLoading}
          onCreateSection={handleCreateSection}
          onPreview={onPreview}
        />
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg border-l border-zinc-800 bg-[#131313] p-0 flex flex-col">
          {selectedSection && (
            <>
              <SheetHeader className="p-4 sm:p-6 border-b border-white/5">
                <SheetTitle className="text-lg sm:text-xl text-white">
                  {selectedSection.id === 'new'
                    ? 'Create Section'
                    : 'View Section'}
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
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

              {selectedSection?.id === 'new' && (
                <div className="p-4 sm:p-6 border-t border-white/5">
                  <Button
                    className={`w-full rounded-lg flex items-center justify-center gap-2 transition
                    ${
                      isSaving
                        ? 'bg-zinc-100 text-zinc-500 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-zinc-200'
                    }`}
                    onClick={handleSaveSection}
                    disabled={isSaving}
                  >
                    {isSaving && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}

                    {isSaving
                      ? 'Creating...'
                      : 'Create Section'}
                  </Button>
                </div>
              )}
            </>
          )}

        {selectedSection?.id !== 'new' && (
  <div className="p-4 sm:p-6 bg-red-500/5 border-t border-red-500/10 space-y-3">
    <h5 className="text-sm font-medium text-red-400">
      Danger Zone
    </h5>

    <p className="text-xs text-red-500/70 leading-relaxed">
      Deleting this section will remove all associated
      routing rules.
    </p>

    {/* toggle status button */}
    <Button
      variant="outline"
      size="sm"
      className="w-full rounded-lg border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 cursor-pointer"
      disabled={togglePending}
      onClick={() =>
        toggleStatus(selectedSection.id, {
          onSuccess: () => {
            toast.success('Section status updated')
          },

          onError: () => {
            toast.error('Failed to update section status')
          },
        })
      }
    >
      {togglePending && (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      )}

      {togglePending
        ? 'Updating...'
        : selectedSection?.status === 'active'
        ? 'Deactivate Section'
        : 'Activate Section'}
    </Button>

    {/* delete dialog */}
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="w-full rounded-lg cursor-pointer bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Deleting...
            </>
          ) : (
            'Delete Section'
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-[#131313] border border-zinc-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Section?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-zinc-400">
            This action cannot be undone. This will
            permanently delete the section.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDeleteSection}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
)}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default SectionsPage