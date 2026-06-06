import { BarChart3, ShieldCheck, TriangleAlert } from "lucide-react";
import type { SupplierImportExposure } from "../types";

type ImportExposureTableProps = {
  exposures: SupplierImportExposure[];
};

const riskTone: Record<SupplierImportExposure["riskLevel"], string> = {
  Low: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Medium: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  High: "border-red-400/30 bg-red-400/10 text-red-200",
};

const subTone: Record<SupplierImportExposure["substitutability"], string> = {
  Low: "text-red-200",
  Medium: "text-amber-200",
  High: "text-emerald-200",
};

export function ImportExposureTable({ exposures }: ImportExposureTableProps) {
  const totalShare = exposures.reduce((sum, exposure) => sum + exposure.share, 0);

  return (
    <section className="dashboard-card overflow-hidden">
      <div className="border-b border-slate-200 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-slate-500">SFA Import Exposure Matrix</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">PCB 수입·조달 라인별 리스크 설명표</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              공급처 비중은 임시 산정치입니다. 실제 ERP 매입 비중이 들어오면 이 표의 share와 Risk Score 기여도가 자동 교체됩니다.
            </p>
          </div>
          <div className="rounded-md border border-[#c9a85c]/30 bg-[#c9a85c]/10 px-4 py-3 text-right">
            <p className="text-xs font-bold uppercase text-[#f6e7bd]">Covered Share</p>
            <p className="mt-1 text-2xl font-black text-white">{totalShare}%</p>
          </div>
        </div>

        <div className="mt-5 grid gap-2">
          {exposures.map((exposure) => (
            <div className="grid grid-cols-[120px_1fr_54px] items-center gap-3" key={exposure.supplier}>
              <span className="text-sm font-bold text-slate-300">{exposure.supplier}</span>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#c9a85c] to-[#f3d58a]"
                  style={{ width: `${exposure.share}%` }}
                />
              </div>
              <span className="text-right text-sm font-black text-white">{exposure.share}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1280px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-5 py-4 font-black">공급처 / 비중</th>
              <th className="px-5 py-4 font-black">수입 품목·라인</th>
              <th className="px-5 py-4 font-black">역할 / 대체 가능성</th>
              <th className="px-5 py-4 font-black">터지는 사건</th>
              <th className="px-5 py-4 font-black">근거 데이터</th>
              <th className="px-5 py-4 font-black">왜 위험한가 / 왜 안전한가</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {exposures.map((exposure) => (
              <tr key={exposure.supplier}>
                <td className="px-5 py-5 align-top">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-black text-white">{exposure.supplier}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {exposure.countryType === "Domestic" ? "국내" : "해외"} · {exposure.country}
                      </p>
                    </div>
                    <span className={`rounded-md border px-2.5 py-1 text-xs font-black ${riskTone[exposure.riskLevel]}`}>
                      {exposure.riskLevel}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                      <span>추정 비중</span>
                      <strong className="text-white">{exposure.share}%</strong>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-[#c9a85c]" style={{ width: `${exposure.share}%` }} />
                    </div>
                  </div>
                </td>

                <td className="px-5 py-5 align-top">
                  <p className="font-bold leading-6 text-white">{exposure.importItems}</p>
                  <p className="mt-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-slate-300">
                    {exposure.importLine}
                  </p>
                </td>

                <td className="px-5 py-5 align-top">
                  <p className="font-semibold leading-6 text-slate-200">{exposure.role}</p>
                  <p className={`mt-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-black ${subTone[exposure.substitutability]}`}>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    대체 {exposure.substitutability}
                  </p>
                </td>

                <td className="px-5 py-5 align-top">
                  <p className="flex items-start gap-2 font-semibold leading-6 text-slate-200">
                    <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                    {exposure.incident}
                  </p>
                </td>

                <td className="px-5 py-5 align-top">
                  <p className="flex items-start gap-2 rounded-md border border-blue-300/20 bg-blue-400/10 px-3 py-2 font-semibold leading-6 text-blue-100">
                    <BarChart3 className="mt-0.5 h-4 w-4 shrink-0" />
                    {exposure.dataEvidence}
                  </p>
                </td>

                <td className="px-5 py-5 align-top">
                  <div className="grid gap-2">
                    <p className="rounded-md border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm leading-6 text-red-100">
                      <strong>위험:</strong> {exposure.riskReason}
                    </p>
                    <p className="rounded-md border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-sm leading-6 text-emerald-100">
                      <strong>안전:</strong> {exposure.safetyReason}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
