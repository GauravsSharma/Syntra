import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

const SectionsHeader = ({ onCreateSection }) => {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Sections</h1>
        <p className="text-zinc-500 text-sm mt-1">Define behavior and tone for different topics.</p>
      </div>
      <Button
        onClick={onCreateSection}
        className="bg-white text-black hover:bg-zinc-200 text-sm font-medium flex items-center gap-1.5"
      >
        <Plus size={16} />
        Create Section
      </Button>
    </div>
  )
}

export default SectionsHeader