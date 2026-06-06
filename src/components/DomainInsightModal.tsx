import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { DomainDrilldownData, DomainIndicatorDetail, RiskMetricDetail, SupplierImpact } from "../types";
import { MarketInsightDrawer } from "./MarketInsightDrawer";
import { PurchaseDecisionPanel } from "./PurchaseDecisionPanel";

type DomainInsightModalProps = {
  data: DomainDrilldownData;
  open: boolean;
  onClose: () => void;
  indicators: DomainIndicatorDetail[];
  supplierImpacts: SupplierImpact[];
  reportSentence: string;
};

const statusTone: Record<RiskMetricDetail["status"], string> = {
  Stable: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
  Watch: "border-slate-300/20 bg-white/[0.05] text-slate-200",
  Warning: "border-amber-300/30 bg-amber-400/10 text-amber-200",
  Critical: "border-red-300/30 bg-red-400/10 text-red-200",
};

function statusFromScore(score: number): RiskMetricDetail["status"] {
  if (score >= 81) return "Critical";
  if (score >= 61) return "Warning";
  if (score >= 31) return "Watch";
  return "Stable";
}

export function DomainInsightModal({
  data,
  open,
  onClose,
  indicators,
  supplierImpacts,
  reportSentence,
}: DomainInsightModalProps) {
  const [selectedIndicator, setSelectedIndicator] = useState<DomainIndicatorDetail | null>(null);

  useEffect(() => {
    if (!open) setSelectedIndicator(null);
  }, [open]);

  if (!open) return null;

  const domainLabel = data.title.replace(" Score Detail", "");

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 px-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <section className="premium-panel max-h-[92vh] w-full max-w-4xl overflow-y-auto text-white">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-sm font-bold text-[#f6e7bd]">Domain Insight</p>
            <h2 className="mt-1 text-2xl font-black">{data.title}</h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-300">{data.subtitle}</p>
          </div>
          <button
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.06] text-slate-200 transition hover:border-[#c9a85c]/50 hover:text-white"
            type="button"
            onClick={onClose}
            aria-label="닫기"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {indicators.map((indicator) => {
              const tone = statusTone[statusFromScore(indicator.score)];
              return (
                <button
                  className="cursor-pointer rounded-md border border-white/10 bg-white/[0.045] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#c9a85c]/50 hover:bg-white/[0.075]"
                  key={indicator.id}
                  type="button"
                  onClick={() => setSelectedIndicator(indicator)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-white">{indicator.title}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-400">{indicator.affectedSuppliers.join(", ")}</p>
                    </div>
                    <span className={`rounded-md border px-2 py-1 text-xs font-black ${tone}`}>{indicator.score}</span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                    <div className="rounded-md bg-white/[0.045] px-2 py-2">
                      <p className="font-bold text-slate-400">현재 값</p>
                      <p className="mt-1 font-black text-white">{indicator.currentValue}</p>
                    </div>
                    <div className="rounded-md bg-white/[0.045] px-2 py-2">
                      <p className="font-bold text-slate-400">7일</p>
                      <p className="mt-1 font-black text-white">{indicator.sevenDayChange}</p>
                    </div>
                    <div className="rounded-md bg-white/[0.045] px-2 py-2">
                      <p className="font-bold text-slate-400">30일</p>
                      <p className="mt-1 font-black text-white">{indicator.thirtyDayChange}</p>
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 text-xs font-semibold leading-5 text-slate-300">
                    {indicator.whyItMatters}
                  </p>
                </button>
              );
            })}
          </div>

          <PurchaseDecisionPanel
            domainLabel={domainLabel}
            reportSentence={reportSentence}
            score={data.score}
            supplierImpacts={supplierImpacts}
          />

          <div className="mt-4 rounded-md border border-[#c9a85c]/30 bg-[#c9a85c]/10 px-4 py-3">
            <p className="text-sm font-black text-[#f6e7bd]">SFA 판단 요약</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#f6e7bd]">{data.summary}</p>
          </div>
        </div>
      </section>
      <MarketInsightDrawer domainLabel={domainLabel} indicator={selectedIndicator} onClose={() => setSelectedIndicator(null)} />
    </div>
  );
}
