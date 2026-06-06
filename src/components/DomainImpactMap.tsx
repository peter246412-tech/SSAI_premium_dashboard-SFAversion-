const impactRows = [
  {
    domain: "Market",
    name: "시장",
    signals: "환율 · 구리 · 수입물가",
    cost: 5,
    delivery: 2,
    quality: 1,
    primary: "원가",
    checkpoint: "원화 원가 재계산",
  },
  {
    domain: "News",
    name: "뉴스",
    signals: "가격 · 납기 · 생산 차질",
    cost: 3,
    delivery: 5,
    quality: 3,
    primary: "납기",
    checkpoint: "공급처 회신 확보",
  },
  {
    domain: "Geo",
    name: "지정학",
    signals: "대만 · 중국 · 통관",
    cost: 3,
    delivery: 5,
    quality: 2,
    primary: "납기",
    checkpoint: "생산지·통관 조건 확인",
  },
  {
    domain: "Logistics",
    name: "물류",
    signals: "SCFI · 항만 · 리드타임",
    cost: 3,
    delivery: 5,
    quality: 2,
    primary: "납기",
    checkpoint: "ETA·운송모드 확인",
  },
];

const axisMeta = {
  cost: { label: "원가", color: "bg-amber-300", border: "border-amber-300/30", text: "text-amber-100" },
  delivery: { label: "납기", color: "bg-sky-300", border: "border-sky-300/30", text: "text-sky-100" },
  quality: { label: "품질", color: "bg-violet-300", border: "border-violet-300/30", text: "text-violet-100" },
};

function StrengthBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          className={`h-2.5 flex-1 rounded-full ${index < value ? color : "bg-white/10"}`}
          key={index}
        />
      ))}
    </div>
  );
}

export function DomainImpactMap() {
  return (
    <section className="dashboard-card overflow-hidden p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6b45a]">Procurement Impact Matrix</p>
          <h2 className="mt-2 text-xl font-black text-white">어떤 데이터가 원가 · 납기 · 품질을 흔드는가</h2>
          <p className="mt-2 text-sm font-semibold text-slate-400">각 데이터가 구매 의사결정의 어느 축을 흔드는지 실무 기준으로 표시합니다.</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-black">
          <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-amber-100">원가 Cost</span>
          <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-sky-100">납기 Delivery</span>
          <span className="rounded-full border border-violet-300/30 bg-violet-400/10 px-3 py-1 text-violet-100">품질 Quality</span>
        </div>
      </div>

      <div className="mt-5 grid gap-3 xl:grid-cols-4">
        {impactRows.map((row) => (
          <article className="rounded-md border border-white/10 bg-white/[0.035] p-4" key={row.domain}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-black text-white">{row.name}</p>
                <p className="mt-1 text-xs font-black text-[#f6e7bd]">{row.domain}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs font-black text-slate-300">
                핵심 {row.primary}
              </span>
            </div>

            <p className="mt-4 min-h-[38px] text-sm font-bold leading-5 text-slate-300">{row.signals}</p>

            <div className="mt-4 space-y-3">
              <div className={`rounded-md border ${axisMeta.cost.border} bg-black/10 p-3`}>
                <div className="mb-2 flex items-center justify-between">
                  <span className={`text-xs font-black ${axisMeta.cost.text}`}>{axisMeta.cost.label}</span>
                  <span className="text-xs font-black text-slate-500">{row.cost}/5</span>
                </div>
                <StrengthBar color={axisMeta.cost.color} value={row.cost} />
              </div>

              <div className={`rounded-md border ${axisMeta.delivery.border} bg-black/10 p-3`}>
                <div className="mb-2 flex items-center justify-between">
                  <span className={`text-xs font-black ${axisMeta.delivery.text}`}>{axisMeta.delivery.label}</span>
                  <span className="text-xs font-black text-slate-500">{row.delivery}/5</span>
                </div>
                <StrengthBar color={axisMeta.delivery.color} value={row.delivery} />
              </div>

              <div className={`rounded-md border ${axisMeta.quality.border} bg-black/10 p-3`}>
                <div className="mb-2 flex items-center justify-between">
                  <span className={`text-xs font-black ${axisMeta.quality.text}`}>{axisMeta.quality.label}</span>
                  <span className="text-xs font-black text-slate-500">{row.quality}/5</span>
                </div>
                <StrengthBar color={axisMeta.quality.color} value={row.quality} />
              </div>
            </div>

            <div className="mt-4 rounded-md border border-[#d6b45a]/20 bg-[#d6b45a]/10 px-3 py-2">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#f6e7bd]">Check</p>
              <p className="mt-1 text-sm font-black text-white">{row.checkpoint}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
