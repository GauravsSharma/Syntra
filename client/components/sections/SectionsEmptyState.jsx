import { ShieldAlert } from 'lucide-react'

const SectionsEmptyState = ({ onCreateSection }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <ShieldAlert size={36} className="text-zinc-600" />
      <p className="text-zinc-500 text-sm">No sections defined yet.</p>
      <button
        onClick={onCreateSection}
        className="text-blue-500 hover:text-blue-400 text-sm transition-colors"
      >
        Create your first section
      </button>
    </div>
  )
}

export default SectionsEmptyState