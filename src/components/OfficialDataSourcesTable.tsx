import sources from "../data/generated/official_data_sources.json";

const sourceTypeTone: Record<string, string> = {
  "Official data": "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
  "Proxy data": "border-blue-300/30 bg-blue-400/10 text-blue-200",
  "Scenario estimate": "border-amber-300/30 bg-amber-400/10 text-amber-200",
  "Need internal data": "border-red-300/30 bg-red-400/10 text-red-200",
};

const displayIndicators = new Set([
  "USD/KRW 환율",
  "Copper Price",
  "Brent Crude Oil",
  "전자/전기 수입물가지수",
  "공급처 위험 뉴스",
  "공급처별 매입 비중",
]);

const summary = [
  { label: "Official Data", value: 3, tone: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200" },
  { label: "Proxy Data", value: 2, tone: "border-blue-300/30 bg-blue-400/10 text-blue-200" },
  { label: "Scenario Estimate", value: 2, tone: "border-amber-300/30 bg-amber-400/10 text-amber-200" },
  { label: "Need Internal Data", value: 2, tone: "border-red-300/30 bg-red-400/10 text-red-200" },
];

export function OfficialDataSourcesTable() {
  const displaySources = sources.filter((source) => displayIndicators.has(source.indicator));

  return (
    <section className="dashboard-card overflow-hidden">
      <div className="border-b border-white/10 p-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6b45a]">Data Source & Reliability</p>
        <h2 className="mt-2 text-xl font-black text-white">데이터 출처 및 신뢰도</h2>
        <p className="mt-2 text-sm font-semibold text-slate-400">
          공식 데이터, 프록시 데이터, 내부자료 필요 항목을 구분합니다.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {summary.map((item) => (
            <div className={`rounded-md border px-3 py-2 ${item.tone}`} key={item.label}>
              <p className="text-[11px] font-black uppercase tracking-[0.12em] opacity-80">{item.label}</p>
              <p className="mt-1 text-2xl font-black">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1060px] w-full text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-4 py-3">Domain</th>
              <th className="px-4 py-3">Indicator</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Data Date</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Reliability</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Decision Use</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {displaySources.map((source) => (
              <tr className="align-top hover:bg-white/[0.035]" key={`${source.domain}-${source.indicator}`}>
                <td className="px-4 py-4 font-bold text-slate-300">{source.domain}</td>
                <td className="px-4 py-4 font-black text-white">{source.indicator}</td>
                <td className="px-4 py-4 font-black text-[#f6e7bd]">{source.value}</td>
                <td className="px-4 py-4 text-slate-400">{source.dataDate}</td>
                <td className="px-4 py-4">
                  {source.sourceUrl ? (
                    <a className="font-bold text-blue-200 underline decoration-blue-200/30 underline-offset-4" href={source.sourceUrl} rel="noreferrer" target="_blank">
                      {source.source}
                    </a>
                  ) : (
                    <span className="font-bold text-slate-300">{source.source}</span>
                  )}
                  <p className="mt-1 text-xs text-slate-500">{source.sourceCode}</p>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-black ${sourceTypeTone[source.sourceType] ?? sourceTypeTone["Scenario estimate"]}`}>
                    {source.sourceType}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-300">{source.status}</td>
                <td className="px-4 py-4 text-slate-400">{source.usedFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-white/10 px-5 py-4 text-sm font-semibold text-slate-400">
        공식 데이터는 실제 공개 출처 기반으로 반영하고, 내부자료가 필요한 값은 Need internal data로 구분합니다.
      </p>
    </section>
  );
}
