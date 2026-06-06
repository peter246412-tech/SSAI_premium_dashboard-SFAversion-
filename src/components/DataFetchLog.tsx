import logs from "../data/generated/data_fetch_log.json";

const statusTone: Record<string, string> = {
  success: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
  partial: "border-blue-300/30 bg-blue-400/10 text-blue-200",
  fallback: "border-amber-300/30 bg-amber-400/10 text-amber-200",
  pending: "border-slate-300/20 bg-white/[0.05] text-slate-300",
  blocked: "border-red-300/30 bg-red-400/10 text-red-200",
};

export function DataFetchLog() {
  return (
    <section className="dashboard-card overflow-hidden">
      <div className="border-b border-white/10 p-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6b45a]">Data Pipeline Status</p>
        <h2 className="mt-2 text-xl font-black text-white">데이터 연동 상태</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-4 py-3">pipeline</th>
              <th className="px-4 py-3">source</th>
              <th className="px-4 py-3">status</th>
              <th className="px-4 py-3">records</th>
              <th className="px-4 py-3">updated_at</th>
              <th className="px-4 py-3">message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {logs.map((log) => (
              <tr className="align-top hover:bg-white/[0.035]" key={log.scriptName}>
                <td className="px-4 py-4 font-black text-white">{log.scriptName}</td>
                <td className="px-4 py-4 text-slate-300">{log.source}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-black ${statusTone[log.status] ?? statusTone.pending}`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-4 py-4 font-bold text-slate-300">{log.recordsFetched}</td>
                <td className="px-4 py-4 text-slate-400">{log.lastRunAt}</td>
                <td className="px-4 py-4 text-slate-400">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
