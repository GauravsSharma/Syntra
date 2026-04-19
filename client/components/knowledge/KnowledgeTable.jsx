import { Globe, Search, SlidersHorizontal } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'
import { Badge } from '../ui/badge'
import { getStatusBadge } from '@/global/getIconeBadge'

const KnowledgeTable = ({ isLoading, sources,setActiveSource,setIsSheetOpen }) => {
  
   const handleRowClick = (source) => {
        setActiveSource(source);
        setIsSheetOpen(true);
   }
    return (
        <div className="bg-[#131313] border border-zinc-800 rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                <h2 className="text-white font-medium">Sources</h2>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                            placeholder="Search sources..."
                            className="pl-9 bg-[#0f0f0f] border-zinc-700 text-zinc-300 placeholder:text-zinc-600 h-9 w-48 md:w-64 text-xs focus-visible:ring-zinc-600"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-700"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Column Headers */}
            <Table className="w-full border-none">
                <TableHeader className="border-none">
                    <TableRow className="border-none hover:bg-transparent">
                        <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                            Name
                        </TableHead>
                        <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                            Type
                        </TableHead>
                        <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                            Status
                        </TableHead>
                        <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                            Last Updated
                        </TableHead>
                        <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="border-none">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i} className="border-none">
                                <TableCell className="px-4 py-3 hover:bg-none">
                                    <Skeleton className="h-5 w-32 bg-white/5" />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <Skeleton className="h-5 w-20 bg-white/5" />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <Skeleton className="h-5 w-20 bg-white/5" />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <Skeleton className="h-5 w-28 bg-white/5 " />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <Skeleton className="h-5 w-16 bg-white/5" />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : sources.length > 0 ? (
                        sources.map((source, index) => (
                            <TableRow key={index} className="border-none hover:bg-zinc-800/50">
                                <TableCell>
                                    <div className="flex items-start gap-3">
                                        {/* Icon */}
                                        <div className="mt-1">
                                            <Globe size={22} className=" text-blue-500" />
                                        </div>

                                        {/* Text content */}
                                        <div className="flex flex-col leading-tight">
                                            {/* Main name / URL */}
                                            <span className="text-sm text-zinc-300 truncate max-w-[250px]">
                                                {source.name}
                                            </span>

                                            {/* Sub text (same or cleaned URL) */}
                                            <span className="text-xs text-zinc-500 truncate max-w-[250px]">
                                                {source.name}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-zinc-400 capitalize">{source.type}</TableCell>
                                <TableCell className="text-zinc-400 capitalize">{getStatusBadge(source.status)}</TableCell>
                                <TableCell className="text-zinc-400">
                                    {new Date(source?.last_updated).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="">
                                    <Button  variant="outline" className={"text-[12px] px-4 text-zinc-400 hover:text-zinc-300 hover:bg-transparent bg-transparent cursor-pointer"} onClick={() => handleRowClick(source)}>VIEW</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow className="border-none">
                            <TableCell
                                colSpan={5}
                                className="h-32 text-center px-4 text-sm text-zinc-500"
                            >
                                No knowledge sources added yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>

    )
}

export default KnowledgeTable
