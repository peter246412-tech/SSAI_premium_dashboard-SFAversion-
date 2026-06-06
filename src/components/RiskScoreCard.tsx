import type { RiskResult } from "../types";

type RiskScoreCardProps = {
  riskResult: RiskResult;
};

const levelGuide = [
  { label: "안정", range: "0-30", color: "bg-emerald-400" },
  { label: "주의", range: "31-60", color: "bg-[#d7b76a]" },
  { label: "위험", range: "61-80", color: "bg-[#ff8f3d]" },
  { label: "고위험", range: "81-100", color: "bg-red-500" },
];

const scoreColor: Record<RiskResult["riskLevel"], string> = {
  안정: "#34d399",
  주의: "#fde047",
  위험: "#fb923c",
  고위험: "#f87171",
};

export function RiskScoreCard({ riskResult }: RiskScoreCardProps) {
  const circumference = 282.74;
  const progress = (riskResult.riskScore / 100) * circumference;
  const remaining = circumference - progress;
  const markerLeft = `${Math.min(100, Math.max(0, riskResult.riskScore))}%`;
  const accent = scoreColor[riskResult.riskLevel];

  return (
    <section className="dashboard-card relative overflow-hidden border-[rgba(255,168,92,0.22)] bg-[radial-gradient(circle_at_50%_35%,rgba(255,122,69,0.13),transparent_36%),radial-gradient(circle_at_85%_18%,rgba(255,80,64,0.10),transparent_28%),linear-gradient(180deg,#172232_0%,#101827_100%)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#D6B45A]/70 to-transparent" />
      <div className="pointer-events-none absolute -right-24 top-12 h-64 w-64 rounded-full bg-[#FF4D2E]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-28 h-52 w-52 rounded-full bg-[#D6B45A]/8 blur-3xl" />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#D6B45A]">PROCUREMENT RISK INDEX</p>
          <h2 className="mt-2 text-2xl font-black text-white">Current PCB Procurement Risk</h2>
          <p className="mt-1 text-sm font-semibold text-slate-400">SFA Semicon PCB 조달 위험도</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-md border border-[rgba(255,111,64,0.45)] bg-[rgba(255,111,64,0.10)] px-3 py-1.5 text-xs font-black text-[#FFD7C2] shadow-[0_0_24px_rgba(255,111,64,0.10)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A45] shadow-[0_0_10px_rgba(255,122,69,0.55)]" />
          {riskResult.riskLevel} 구간
        </span>
      </div>

      <div className="mt-8 grid gap-5">
        <div className="relative mx-auto h-[315px] w-full max-w-[500px]">
          <div className="absolute inset-x-12 bottom-16 top-10 rounded-full bg-[radial-gradient(circle,rgba(255,122,69,0.15),transparent_58%)] blur-2xl" />
          <svg className="h-full w-full overflow-visible" viewBox="0 0 220 142" aria-label={`Risk score ${riskResult.riskScore}`}>
            <defs>
              <linearGradient id="riskArc" x1="20" y1="112" x2="200" y2="112" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#D6B45A" />
                <stop offset="52%" stopColor="#F2A84B" />
                <stop offset="100%" stopColor="#FF6B3D" />
              </linearGradient>
              <filter id="arcGlow">
                <feGaussianBlur stdDeviation="2.6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d="M20 112 A90 90 0 0 1 200 112" fill="none" stroke="rgba(71,82,100,0.48)" strokeWidth="16" strokeLinecap="round" />
            <path d="M20 112 A90 90 0 0 1 200 112" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeLinecap="round" />
            <path
              d="M20 112 A90 90 0 0 1 200 112"
              fill="none"
              stroke="url(#riskArc)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${remaining}`}
              filter="url(#arcGlow)"
            />
          </svg>

          <div className="absolute left-1/2 top-[57%] flex w-full max-w-[320px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 px-4 text-center">
            <p
              className="text-[clamp(98px,8vw,132px)] font-extrabold leading-[0.85] text-[#F8FAFC] [text-shadow:0_2px_0_rgba(255,255,255,0.10),0_12px_0_rgba(20,24,35,0.28),0_24px_52px_rgba(0,0,0,0.55),0_0_34px_rgba(255,122,69,0.24)]"
              style={{ fontFamily: '"Inter", "SF Pro Display", "Pretendard", sans-serif', letterSpacing: "-0.065em" }}
            >
              {riskResult.riskScore}
            </p>
            <span className="h-px w-40 bg-gradient-to-r from-transparent via-[#FFB083]/70 to-transparent" />
            <span className="rounded-full border border-[#ff7a45]/35 bg-[#ff7a45]/10 px-4 py-1.5 text-sm font-black text-[#FFB083] shadow-[0_0_20px_rgba(255,122,69,0.08)]">
              61-80 위험 구간
            </span>
          </div>
        </div>

        <div className="rounded-md border border-white/10 bg-black/10 p-3 shadow-inner">
          <div className="relative h-3 rounded-full bg-[#2F3746]">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 via-[#d6b45a] via-60% to-[#ff4d4d]"
              style={{ width: `${riskResult.riskScore}%` }}
            />
            <span
              className="absolute top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_18px_rgba(255,122,69,0.45)]"
              style={{ left: markerLeft, background: accent }}
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {levelGuide.map((level) => {
              const isActive = level.label === riskResult.riskLevel;

              return (
                <div
                  className={`rounded-md border px-2.5 py-2 ${
                    isActive ? "border-[rgba(255,122,69,0.38)] bg-[rgba(255,122,69,0.08)]" : "border-white/10 bg-white/[0.025]"
                  }`}
                  key={level.label}
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${level.color}`} />
                    <span className="text-xs font-black text-white">{level.label}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-500">{level.range}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
