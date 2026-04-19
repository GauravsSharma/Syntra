import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import SectionsEmptyState from './SectionsEmptyState'

const SectionsTable = ({ sections, isLoading, onCreateSection }) => {
  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="text-zinc-500 text-xs uppercase tracking-wider font-medium px-5 py-3">
              Name
            </TableHead>
            <TableHead className="text-zinc-500 text-xs uppercase tracking-wider font-medium px-5 py-3">
              Sources
            </TableHead>
            <TableHead className="text-zinc-500 text-xs uppercase tracking-wider font-medium px-5 py-3">
              Tone
            </TableHead>
            <TableHead className="text-zinc-500 text-xs uppercase tracking-wider font-medium px-5 py-3">
              Scope
            </TableHead>
            <TableHead className="text-zinc-500 text-xs uppercase tracking-wider font-medium px-5 py-3">
              Status
            </TableHead>
            <TableHead className="text-zinc-500 text-xs uppercase tracking-wider font-medium px-5 py-3 text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sections.length === 0 ? (
            <TableRow className="border-none hover:bg-transparent">
              <TableCell colSpan={6}>
                <SectionsEmptyState onCreateSection={onCreateSection} />
              </TableCell>
            </TableRow>
          ) : (
            sections.map((section, index) => (
              <TableRow key={index} className="border-zinc-800 hover:bg-zinc-900/50">
                <TableCell className="text-zinc-300 text-sm px-5 py-3">{section.name}</TableCell>
                <TableCell className="text-zinc-400 text-sm px-5 py-3">{section.sources}</TableCell>
                <TableCell className="text-zinc-400 text-sm px-5 py-3">{section.tone}</TableCell>
                <TableCell className="text-zinc-400 text-sm px-5 py-3">{section.scope}</TableCell>
                <TableCell className="text-zinc-400 text-sm px-5 py-3">{section.status}</TableCell>
                <TableCell className="text-zinc-400 text-sm px-5 py-3 text-right">{section.action}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default SectionsTable