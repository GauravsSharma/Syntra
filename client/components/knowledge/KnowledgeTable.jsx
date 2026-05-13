import { Globe, Search, SlidersHorizontal } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'
import { getStatusBadge } from '@/global/getIconeBadge'

const KnowledgeTable = ({ isLoading, sources, setActiveSource, setIsSheetOpen }) => {

  const handleRowClick = (source) => {
    setActiveSource(source);
    setIsSheetOpen(true);
  }

  return (
    <div className="bg-[#131313] border border-zinc-800 rounded-xl overflow-hidden">

      {/* Table Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-zinc-800 gap-3">
        <h2 className="text-white font-medium shrink-0">Sources</h2>
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Search sources..."
              className="pl-9 bg-[#0f0f0f] border-zinc-700 text-zinc-300 placeholder:text-zinc-600 h-9 w-36 sm:w-48 md:w-64 text-xs focus-visible:ring-zinc-600"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-700"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable table wrapper */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[520px] border-none">
          <TableHeader className="border-none">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider w-[40%]">
                Name
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider hidden sm:table-cell">
                Type
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider hidden md:table-cell">
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
                  <TableCell className="px-4 py-3">
                    <Skeleton className="h-5 w-32 bg-white/5" />
                  </TableCell>
                  <TableCell className="px-4 py-3 hidden sm:table-cell">
                    <Skeleton className="h-5 w-20 bg-white/5" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton className="h-5 w-20 bg-white/5" />
                  </TableCell>
                  <TableCell className="px-4 py-3 hidden md:table-cell">
                    <Skeleton className="h-5 w-28 bg-white/5" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton className="h-5 w-16 bg-white/5" />
                  </TableCell>
                </TableRow>
              ))
            ) : sources.length > 0 ? (
              sources.map((source, index) => (
                <TableRow key={index} className="border-none hover:bg-zinc-800/50">
                  <TableCell className="px-4 py-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 shrink-0">
                        <Globe size={20} className="text-blue-500" />
                      </div>
                      <div className="flex flex-col leading-tight min-w-0">
                        <span className="text-sm text-zinc-300 truncate max-w-[160px] sm:max-w-[220px] md:max-w-[280px]">
                          {source.name}
                        </span>
                        <span className="text-xs text-zinc-500 truncate max-w-[160px] sm:max-w-[220px] md:max-w-[280px]">
                          {source.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-400 capitalize hidden sm:table-cell">
                    {source.type}
                  </TableCell>
                  <TableCell className="text-zinc-400 capitalize">
                    {getStatusBadge(source.status)}
                  </TableCell>
                  <TableCell className="text-zinc-400 hidden md:table-cell">
                    {new Date(source?.last_updated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-zinc-400 hover:text-white hover:bg-white/5"
                       onClick={() => handleRowClick(source)}
                    >
                      View
                    </Button>
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
    </div>
  )
}

export default KnowledgeTable