import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const SectionsHeader = ({ onCreateSection }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      {/* Left Content */}
      <div className="min-w-0">
        <h1 className="text-xl sm:text-2xl font-semibold text-white">
          Sections
        </h1>

        <p className="text-zinc-500 text-sm mt-1 max-w-md">
          Define behavior and tone for different topics.
        </p>
      </div>

      {/* Button */}
      <Button
        onClick={onCreateSection}
        className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 text-sm font-medium flex items-center justify-center gap-1.5"
      >
        <Plus size={16} />
        Create Section
      </Button>
    </div>
  );
};

export default SectionsHeader;