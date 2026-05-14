
import {
  Globe,
  LayoutGrid,
  Palette,
  Bell,
  Users,
  BarChart2,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: Globe,
    title: "Knowledge sources",
    description:
      "Feed your chatbot with website URLs, CSV files, or custom text. It learns instantly.",
  },
  {
    number: "02",
    icon: LayoutGrid,
    title: "Sections",
    description:
      "Group knowledge sources and assign a unique tone per section. One chatbot, many personalities.",
  },
  {
    number: "03",
    icon: Palette,
    title: "Customisation",
    description:
      "Match your brand. Set colors, welcome messages, and chatbot persona in minutes.",
  },
  {
    number: "04",
    icon: Bell,
    title: "Real-time escalation",
    description:
      "When AI can't help, users raise a ticket. Your team gets notified instantly and takes over the chat live.",
  },
  {
    number: "05",
    icon: Users,
    title: "Team & invites",
    description:
      "Invite teammates to your organisation. Manage roles and handle support together.",
  },
  {
    number: "06",
    icon: BarChart2,
    title: "Dashboard & analytics",
    description:
      "Track conversations, escalations, resolution times, and team performance — all in one place.",
  },
];

export default function FeaturesSection({ playfair }) {
  return (
    <section className="w-full bg-transparent px-6 py-20 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#c0522a] inline-block" />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#555]">
              Everything you need
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#1a1a1a] leading-[1.1] max-w-2xl ">
            Built for teams who take{" "}
            <br className="hidden sm:block" />
            <span
              className={`${playfair?.className ?? ""} italic font-normal`}
            >
              support
            </span>{" "}
            seriously.
          </h2>
        </div>

      {/* Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {features.map((feature) => {
    const Icon = feature.icon;

    return (
     <div
     id="features"
  key={feature.number}
  className="
    group
    relative
    overflow-hidden
    rounded-[24px]
    border border-black/5
    bg-[#f5f1ea]
    p-5
    min-h-[220px]
    transition-all duration-500 ease-out
    hover:-translate-y-1
    hover:border-[#c0522a]/30
    hover:shadow-[0_14px_40px_rgba(0,0,0,0.06)]
  "
>
  {/* Glow */}
  <div
    className="
      absolute inset-0 opacity-0
      group-hover:opacity-100
      transition-opacity duration-500
      bg-[radial-gradient(circle_at_top_right,rgba(192,82,42,0.08),transparent_45%)]
    "
  />

  {/* Top */}
  <div className="relative z-10 flex items-center justify-between mb-10">
    <div
      className="
        w-10 h-10 rounded-full
        bg-[#111]
        flex items-center justify-center
      "
    >
      <Icon size={16} color="white" strokeWidth={1.8} />
    </div>

    <span className="text-[12px] text-[#999] font-medium tracking-wide">
      {feature.number}
    </span>
  </div>

  {/* Content */}
  <div className="relative z-10">
    <h3 className="text-[18px] font-semibold text-[#1a1a1a] mb-3">
      {feature.title}
    </h3>

    <p className="text-[14px] text-[#666] leading-relaxed">
      {feature.description}
    </p>
  </div>

  {/* Bottom line */}
  <div
    className="
      absolute bottom-0 left-0
      h-[2px] w-0
      bg-[#c0522a]
      transition-all duration-500
      group-hover:w-full
    "
  />
</div>
    );
  })}
</div>
      </div>
    </section>
  );
}