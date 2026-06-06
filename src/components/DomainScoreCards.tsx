import type { DomainKey, DomainScores } from "../types";
import { DOMAIN_LABELS, DOMAIN_WEIGHTS, getDomainContributions } from "../lib/riskScoring";

type DomainScoreCardsProps = {
  domainScores: DomainScores;
  activeDomain: DomainKey;
  onSelectDomain: (domain: DomainKey) => void;
};

const domainStyle = {
  market: {
    color: "#60a5fa",
    bg: "from-blue-400/20 to-blue-400/5",
    label: "시장",
    note: "환율·구리·수입물가",
    impacts: [
      { label: "원가", level: "주요", className: "border-amber-300/35 bg-amber-400/10 text-amber-100" },
      { label: "납기", level: "간접", className: "border-slate-300/20 bg-white/[0.04] text-slate-300" },
      { label: "품질", level: "낮음", className: "border-slate-300/20 bg-white/[0.04] text-slate-400" },
    ],
  },
  news: {
    color: "#f87171",
    bg: "from-red-400/20 to-red-400/5",
    label: "뉴스",
    note: "공급처 위험 기사",
    impacts: [
      { label: "납기", level: "주요", className: "border-sky-300/35 bg-sky-400/10 text-sky-100" },
      { label: "품질", level: "중간", className: "border-violet-300/35 bg-violet-400/10 text-violet-100" },
      { label: "원가", level: "중간", className: "border-amber-300/25 bg-amber-400/10 text-amber-100" },
    ],
  },
  geo: {
    color: "#c084fc",
    bg: "from-violet-400/20 to-violet-400/5",
    label: "지정학",
    note: "대만·중국 노출",
    impacts: [
      { label: "납기", level: "주요", className: "border-sky-300/35 bg-sky-400/10 text-sky-100" },
      { label: "원가", level: "중간", className: "border-amber-300/25 bg-amber-400/10 text-amber-100" },
      { label: "품질", level: "간접", className: "border-slate-300/20 bg-white/[0.04] text-slate-300" },
    ],
  },
  logistics: {
    color: "#34d399",
    bg: "from-emerald-400/20 to-emerald-400/5",
    label: "물류",
    note: "SCFI·항만·리드타임",
    impacts: [
      { label: "납기", level: "주요", className: "border-sky-300/35 bg-sky-400/10 text-sky-100" },
      { label: "원가", level: "중간", className: "border-amber-300/25 bg-amber-400/10 text-amber-100" },
      { label: "품질", level: "간접", className: "border-slate-300/20 bg-white/[0.04] text-slate-300" },
    ],
  },
};

export function DomainScoreCards({ domainScores, activeDomain, onSelectDomain }: DomainScoreCardsProps) {
  const contributions = getDomainContributions(domainScores);
  const totalContribution = contributions.reduce((sum, item) => sum + item.contribution, 0);

  return (
    <section className="dashboard-card relative overflow-hidden p-5">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#f3d58a] to-transparent" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-500">Weighted Domain Contribution</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">도메인별 가중 기여도</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">SFA PCB는 환율·구리·수입물가 영향이 커 Market 가중치를 45%로 적용합니다.</p>
        </div>
        <div className="text-right">
          <span className="rounded-md border border-[#c9a85c]/40 bg-[#c9a85c]/10 px-3 py-1 text-sm font-bold text-[#f6e7bd]">
            Total Risk {Math.round(totalContribution)}
          </span>
          <p className="mt-2 text-xs font-bold text-slate-500">카드 클릭 시 상세 기준 표시</p>
        </div>
      </div>

      <div className="mt-6 rounded-md border border-white/10 bg-white/[0.035] p-4">
        <div className="flex h-4 overflow-hidden rounded-full bg-white/10">
          {contributions.map(({ domain, contribution }) => (
            <div
              key={domain}
              style={{
                width: `${(contribution / totalContribution) * 100}%`,
                backgroundColor: domainStyle[domain].color,
              }}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold text-slate-400">
          {contributions.map(({ domain, contribution }) => (
            <span className="inline-flex items-center gap-1.5" key={domain}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: domainStyle[domain].color }} />
              {DOMAIN_LABELS[domain]} {contribution.toFixed(1)}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {contributions.map(({ domain, score, contribution }) => {
          const style = domainStyle[domain];
          const weight = Math.round(DOMAIN_WEIGHTS[domain] * 100);
          return (
            <button
              className={`rounded-md border bg-gradient-to-br ${style.bg} p-4 text-left transition hover:-translate-y-0.5 hover:border-[#c9a85c]/50 ${
                activeDomain === domain ? "border-[#c9a85c]/70 shadow-[0_0_30px_rgba(201,168,92,0.16)]" : "border-white/10"
              }`}
              key={domain}
              type="button"
              onClick={() => onSelectDomain(domain)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-white">{style.label}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{style.note}</p>
                </div>
                <span className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 text-xs font-black text-slate-300">
                  {activeDomain === domain ? "SELECTED" : `W ${weight}%`}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {style.impacts.map((impact) => (
                  <span className={`rounded-full border px-2.5 py-1 text-[11px] font-black ${impact.className}`} key={`${domain}-${impact.label}`}>
                    {impact.label} · {impact.level}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase text-slate-500">{DOMAIN_LABELS[domain]}Score</p>
                  <p className="mt-1 text-5xl font-black leading-none text-white">{score}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase text-slate-500">Contribution</p>
                  <p className="mt-1 text-2xl font-black" style={{ color: style.color }}>
                    {contribution.toFixed(1)}
                  </p>
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: style.color }} />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
