import summary from "../data/generated/prewar_signal_summary.json";

const domainLabels: Record<string, string> = {
  market: "Market",
  news: "News",
  geo: "Geo",
  logistics: "Logistics",
};

export function PreWarSignalView() {
  const domainScores = Object.entries(summary.domainScores);

  return (
    <section className="dashboard-card overflow-hidden p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d6b45a]">As-of Signal View</p>
          <h2 className="mt-2 text-2xl font-black text-white">{summary.analysisLabel}</h2>
          <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-400">{summary.marketDateRule}</p>
        </div>
        <div className="rounded-md border border-[rgba(255,122,69,0.35)] bg-[rgba(255,122,69,0.08)] px-4 py-3 text-right">
          <p className="text-xs font-black uppercase text-[#ffd2ba]">Current Risk</p>
          <p className="mt-1 text-3xl font-black text-white">{summary.riskScore}</p>
          <p className="text-sm font-black text-[#ffd2ba]">{summary.riskLevel}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {domainScores.map(([domain, score]) => (
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-4" key={domain}>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{domainLabels[domain]}</p>
            <p className="mt-2 text-3xl font-black text-white">{score}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">2026-02-21 운영 스냅샷 기준</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="rounded-md border border-white/10 bg-black/10 p-4">
          <h3 className="text-sm font-black text-[#f6e7bd]">상위 위험 원인</h3>
          <ol className="mt-3 space-y-2">
            {summary.topCauses.map((cause, index) => (
              <li className="flex gap-3 text-sm font-semibold leading-6 text-slate-300" key={cause}>
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#d6b45a]/30 bg-[#d6b45a]/10 text-xs font-black text-[#f6e7bd]">
                  {index + 1}
                </span>
                {cause}
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-md border border-white/10 bg-black/10 p-4">
          <h3 className="text-sm font-black text-[#f6e7bd]">SFA 구매팀 권고 액션</h3>
          <ol className="mt-3 space-y-2">
            {summary.recommendedActions.map((action, index) => (
              <li className="flex gap-3 text-sm font-semibold leading-6 text-slate-300" key={action}>
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#ff7a45]/30 bg-[#ff7a45]/10 text-xs font-black text-[#ffd2ba]">
                  {index + 1}
                </span>
                {action}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold leading-6 text-slate-300">
        <p>{summary.noticeKo}</p>
        <p className="mt-1 text-slate-500">{summary.noticeEn}</p>
      </div>
    </section>
  );
}
