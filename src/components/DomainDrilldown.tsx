import { useEffect, useState } from "react";
import { Activity, CheckCircle2, Database, Target, TriangleAlert } from "lucide-react";
import type { DomainDrilldownData, RiskMetricDetail } from "../types";

type DomainDrilldownProps = {
  data: DomainDrilldownData;
};

const statusTone: Record<RiskMetricDetail["status"], string> = {
  Stable: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
  Watch: "border-slate-300/20 bg-white/[0.05] text-slate-200",
  Warning: "border-amber-300/30 bg-amber-400/10 text-amber-200",
  Critical: "border-red-300/30 bg-red-400/10 text-red-200",
};

export function DomainDrilldown({ data }: DomainDrilldownProps) {
  const [activeMetricId, setActiveMetricId] = useState(data.metrics[0]?.id);

  useEffect(() => {
    setActiveMetricId(data.metrics[0]?.id);
  }, [data]);

  const activeMetric = data.metrics.find((metric) => metric.id === activeMetricId) ?? data.metrics[0];

  return (
    <section className="dashboard-card scroll-mt-5 overflow-hidden">
      <div className="border-b border-slate-200 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[#f6e7bd]">Interactive Drilldown · 선택된 도메인</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">{data.title}</h2>
            <p className="mt-2 max-w-4xl text-sm font-medium leading-6 text-slate-500">{data.summary}</p>
          </div>
          <div className="rounded-md border border-[#c9a85c]/30 bg-[#c9a85c]/10 px-4 py-3 text-right">
            <p className="text-xs font-black uppercase text-[#f6e7bd]">{data.subtitle}</p>
            <p className="mt-1 text-3xl font-black text-white">{data.score}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-0 xl:grid-cols-[360px_1fr]">
        <aside className="border-b border-slate-200 p-5 xl:border-b-0 xl:border-r">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">세부 지표 선택</p>
          <div className="mt-4 grid gap-2">
            {data.metrics.map((metric) => (
              <button
                className={`rounded-md border px-4 py-3 text-left transition hover:border-[#c9a85c]/50 ${
                  activeMetric.id === metric.id
                    ? "border-[#c9a85c]/70 bg-[#c9a85c]/10"
                    : "border-white/10 bg-white/[0.035]"
                }`}
                key={metric.id}
                type="button"
                onClick={() => setActiveMetricId(metric.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-white">{metric.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{metric.supplierScope}</p>
                  </div>
                  <span className={`rounded-md border px-2 py-1 text-xs font-black ${statusTone[metric.status]}`}>
                    {metric.score}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_0.75fr]">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-500">{activeMetric.itemLine}</p>
                  <h3 className="mt-1 text-2xl font-black text-white">{activeMetric.label}</h3>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-500">Current Value</p>
                  <p className="text-3xl font-black text-white">{activeMetric.value}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-md border border-red-300/20 bg-red-400/10 p-4">
                  <div className="flex items-center gap-2 text-red-100">
                    <TriangleAlert className="h-4 w-4" />
                    <p className="font-black">위험 해석</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-red-100">{activeMetric.riskInterpretation}</p>
                </div>

                <div className="rounded-md border border-emerald-300/20 bg-emerald-400/10 p-4">
                  <div className="flex items-center gap-2 text-emerald-100">
                    <CheckCircle2 className="h-4 w-4" />
                    <p className="font-black">안전 해석</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-emerald-100">{activeMetric.safetyInterpretation}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-[#f6e7bd]" />
                  <p className="font-black text-white">근거 데이터</p>
                </div>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300">
                  {activeMetric.dataEvidence.map((item) => (
                    <li className="rounded-md bg-white/[0.04] px-3 py-2" key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#f6e7bd]" />
                  <p className="font-black text-white">현 상황</p>
                </div>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300">
                  {activeMetric.currentSituation.map((item) => (
                    <li className="rounded-md bg-white/[0.04] px-3 py-2" key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-md border border-[#c9a85c]/30 bg-[#c9a85c]/10 p-4">
                <div className="flex items-center gap-2 text-[#f6e7bd]">
                  <Target className="h-4 w-4" />
                  <p className="font-black">SFA 권고 액션</p>
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#f6e7bd]">{activeMetric.recommendedAction}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
