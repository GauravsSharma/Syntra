import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
const TONE_OPTIONS = [
    {
        value: "strict",
        label: "Strict",
        badge: "Fact-based",
        description: "Only answer if fully confident. No small talk.",
    },
    {
        value: "neutral",
        label: "Neutral",
        badge: "Balanced",
        description: "Professional, concise, and direct.",
    },
    {
        value: "friendly",
        label: "Friendly",
        badge: "Conversational",
        description: "Warm and conversational. Good for general FAQ.",
    },
    {
        value: "empathetic",
        label: "Empathetic",
        badge: "Support",
        description: "Support-first, apologetic, and calming.",
    },
];
const SectionFormFields = ({
    formData,
    setFormData,
    selectedSources,
    setSelectedSources,
    knowledgeSources,
    isLoadingSources,
    isDisabled,
}) => {
    return (
        <>
            <div className="space-y-4">
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                    Basics
                </h4>
            </div>
            <div className="space-y-1">
                <Label className="text-zinc-300">Section Name</Label>
                <Input
                    placeholder="e.g. Billing Policy"
                    className="bg-white/2 rounded-lg border-white/10 text-white placeholder:text-zinc-400"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={isDisabled}
                />
            </div>
            <div className="space-y-1">
                <Label className="text-zinc-300">Description</Label>
                <Input
                    placeholder="when should AI use this ?"
                    className="bg-white/2 rounded-lg border-white/10 text-white placeholder:text-zinc-400"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    disabled={isDisabled}
                />
                <p className='text-[11px] text-zinc-500'>Used by the routing model to decide when to activate this section</p>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                        Data Sources
                    </h4>

                    <span className="text-xs text-zinc-500">
                        {selectedSources.length} attached
                    </span>
                </div>

                {/* 👇 Now Select is on next line */}
                <Select
                    value={selectedSources[0] || ""}
                    onValueChange={(value) => {
                        if (!selectedSources.includes(value)) {
                            setSelectedSources([...selectedSources, value]);
                        }
                    }}
                    disabled={isDisabled}
                >
                    <SelectTrigger className="bg-white/2 w-full rounded-lg border-white/10 text-white">
                        <SelectValue
                            placeholder={
                                isLoadingSources
                                    ? "Loading sources..."
                                    : "Select knowledge sources..."
                            }
                        />
                    </SelectTrigger>
                    <SelectContent className="bg-[#131313] rounded-lg border border-zinc-800">
                        {knowledgeSources?.length > 0 ? (
                            knowledgeSources.map((source) => (
                                <SelectItem key={source.id} value={String(source.id)} className='rounded-lg'>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-zinc-500 capitalize">
                                            {source.type}
                                        </span>
                                        <span>{source.name}</span>
                                    </div>
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem value="none" disabled className="text-center text-zinc-500">
                                No sources available
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
                {selectedSources?.length > 0 && (
                    <div className="space-y-2">
                        {selectedSources.map((sourceId) => {
                            const source = knowledgeSources?.find(
                                (s) => s.id === sourceId
                            );

                            if (!source) return null;

                            return (
                                <div
                                    key={sourceId}
                                    className="flex items-center justify-between p-2 rounded-md bg-white/5"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-zinc-500 capitalize">
                                            {source.type}
                                        </span>
                                        <span className="text-sm text-zinc-400">
                                            {source.name}
                                        </span>
                                    </div>

                                    {/* Remove button */}
                                    <button
                                        onClick={() =>
                                            setSelectedSources(
                                                selectedSources.filter((id) => id !== sourceId)
                                            )
                                        }
                                        className="text-xs cursor-pointer text-red-400 hover:text-red-300"
                                        disabled={isDisabled}
                                    >
                                        Remove
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className='space-y-4'>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                    Tone
                </h4>
                <RadioGroup
                    value={formData?.tone || "neutral"}
                    onValueChange={(value) =>
                        setFormData({ ...formData, tone: value })
                    }
                    className=""
                    disabled={isDisabled}
                >
                    {TONE_OPTIONS.map((option) => (
                        <label
                            key={option.value}
                            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${formData?.tone === option.value
                                ? "border-white/20 bg-white/5"
                                : "border-white/10 hover:bg-white/5"
                                }`}
                        >
                            {/* Custom radio */}
                            <RadioGroupItem
                                value={option.value}
                                className="mt-1 h-4 w-4 rounded-full border border-zinc-500 data-[state=checked]:border-green-400 data-[state=checked]:bg-green-400"
                            />

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-white">
                                        {option.label}
                                    </span>

                                    {option.badge && (
                                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-zinc-400">
                                            {option.badge}
                                        </span>
                                    )}
                                </div>

                                <p className="text-xs text-zinc-500 mt-1">
                                    {option.description}
                                </p>
                            </div>
                        </label>
                    ))}
                </RadioGroup>

            </div>

            <div className="space-y-4">
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                    Scope Rules
                </h4>
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                        <Label className="text-zinc-300 text-xs">
                            Allowed Topics
                        </Label>

                        <Input
                            className="bg-white/2 border-white/10 text-white placeholder:text-zinc-400 rounded-lg"
                            placeholder="e.g. pricing, refunds"
                            value={formData.allowedTopics}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    allowedTopics: e.target.value,
                                })
                            }
                            disabled={isDisabled}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-zinc-300 text-xs">
                            Blocked Topics
                        </Label>

                        <Input
                            className="bg-white/2 border-white/10 text-white placeholder:text-zinc-400 rounded-lg"
                            placeholder="e.g. competitors, politics"
                            value={formData.blockedTopics}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    blockedTopics: e.target.value,
                                })
                            }
                            disabled={isDisabled}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionFormFields
