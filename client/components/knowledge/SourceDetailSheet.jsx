import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet'
import { Globe, X } from 'lucide-react'
import { Button } from '../ui/button'
import { getStatusBadge } from '@/global/getIconeBadge'

const SourceDetailSheet = ({ isSheetOpen, setIsSheetOpen, activeSource }) => {

    return (

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent className="w-full sm:max-w-md border-l border-zinc-800 bg-[#131313] p-0 flex flex-col">
                <div className="h-full flex flex-col">

                    {/* Header */}
                    <SheetHeader className="px-5 py-4 border-b border-zinc-800">
                        <SheetTitle className="text-white text-base flex items-center gap-2">
                            <Globe size={18} className="text-blue-500 shrink-0" />
                            {activeSource?.name}
                        </SheetTitle>
                        <SheetDescription className="text-zinc-500 text-xs truncate pl-[26px]">
                            {activeSource?.name}
                        </SheetDescription>
                        <div className="flex items-center gap-2 pl-[26px]">
                            {getStatusBadge(activeSource?.status)}
                            <span className="text-zinc-500 text-xs">
                                Updated{' '}
                                {activeSource?.last_updated
                                    ? new Date(activeSource.last_updated).toLocaleDateString('en-US', {
                                        month: '2-digit',
                                        day: '2-digit',
                                        year: 'numeric',
                                    })
                                    : '—'}
                            </span>
                        </div>
                    </SheetHeader>

                    {/* Content Preview */}
                    <div className="px-5 py-4 flex-1 overflow-y-auto">
                        <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-3">
                            Content Preview
                        </h3>
                        <p className="text-zinc-300 text-sm leading-relaxed font-mono">
                            {activeSource?.content || 'No content preview available for this source.'}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-4 border-t border-zinc-800">
                        <Button
                            variant="destructive"
                            className="w-full bg-transparent border border-red-500/60 text-red-500 hover:bg-red-500/10 hover:border-red-500"
                        >
                            Disconnect Source
                        </Button>
                    </div>

                </div>
            </SheetContent>
        </Sheet>
    )
}

export default SourceDetailSheet