
import { ArrowUp, Check } from "lucide-react";

const chatMessages = [
  { role: "user", text: "How do I reset my API key?" },
  {
    role: "assistant",
    text: 'Head to Settings → API Keys, then click "Rotate". Want me to walk you through it?',
  },
  { role: "user", text: "Actually I need a human, billing issue." },
  { role: "system", text: "Connecting you to an agent..." },
  {
    role: "assistant",
    text: "Hi, this is Maya from billing — I've pulled up your account. 🤚",
  },
];

const bullets = [
  "Instant team notifications",
  "10-minute live join window",
  "Automatic email fallback",
];

export default function EscalationSection({ playfair }) {
  return (
    <section className="w-full px-4 py-10 md:px-10 lg:px-16 bg-transparent">
      {/* Dark rounded card */}
      <div
        className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden relative"
        style={{
          background:
            "radial-gradient(ellipse at 80% 40%, #4a1a0a 0%, #1a1008 40%, #111008 100%)",
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-0 px-8 py-14 md:px-14 md:py-16">

          {/* Left — text */}
          <div className="flex-1 lg:pr-12">
            {/* Label */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#c0522a] inline-block" />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#aaa]">
                Real-time escalation
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-6">
              Never leave a
              <br />
              customer{" "}
              <span className={`${playfair?.className ?? ""} italic font-normal`}>
                hanging
              </span>
              .
            </h2>

            {/* Body */}
            <p className="text-[15px] text-[#aaa] leading-relaxed mb-8 max-w-md">
              When the AI hits its limits, customers raise a ticket and your
              team gets notified instantly. Agents have a 10-minute window to
              join live — if no one's available, Syntra falls back to email
              follow-up so no conversation slips through.
            </p>

            {/* Bullets */}
            <ul className="flex flex-col gap-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <Check size={15} className="text-[#c0522a] shrink-0" strokeWidth={2.5} />
                  <span className="text-[14.5px] text-white/80">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — chat card */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

              {/* Chat header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0ede8]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 2L11.8 8.2H18.2L13 11.8L14.8 18L10 14.4L5.2 18L7 11.8L1.8 8.2H8.2L10 2Z"
                        fill="white"
                        opacity="0.9"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1a1a1a] leading-tight">
                      Syntra Assistant
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-[6px] h-[6px] rounded-full bg-[#3cb96a] inline-block" />
                      <span className="text-[11px] text-[#666]">Online</span>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#888]">
                  Live
                </span>
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-3 px-5 py-5">
                {chatMessages.map((msg, i) => {
                  if (msg.role === "user") {
                    return (
                      <div
                        key={i}
                        className="self-end bg-[#f2efe9] text-[#1a1a1a] text-[13.5px] leading-[1.5] px-4 py-2.5 rounded-[16px_16px_4px_16px] max-w-[78%] ml-auto"
                      >
                        {msg.text}
                      </div>
                    );
                  }
                  if (msg.role === "system") {
                    return (
                      <div key={i} className="flex items-center gap-2 self-start">
                        <div className="flex gap-1 px-3 py-2 bg-[#1a1a1a] rounded-full">
                          {[0, 1, 2].map((d) => (
                            <span
                              key={d}
                              className="w-1.5 h-1.5 rounded-full bg-white/60"
                            />
                          ))}
                        </div>
                        <span className="text-[12.5px] text-[#888] italic">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={i}
                      className="self-start bg-[#1a1a1a] text-white text-[13.5px] leading-[1.55] px-4 py-3 rounded-[16px_16px_16px_4px] max-w-[82%]"
                    >
                      {msg.text}
                    </div>
                  );
                })}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2.5 px-4 pb-4 pt-1">
                <input
                  readOnly
                  className="flex-1 bg-[#f5f2ed] rounded-full px-4 py-2.5 text-sm text-[#aaa] outline-none border-none cursor-default"
                  placeholder="Ask anything..."
                />
                <button className="w-9 h-9 rounded-full bg-[#c0522a] flex items-center justify-center shrink-0">
                  <ArrowUp size={15} color="white" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}