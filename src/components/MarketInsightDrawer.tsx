import { X } from "lucide-react";
import type { DomainIndicatorDetail } from "../types";

type MarketInsightDrawerProps = {
  indicator: DomainIndicatorDetail | null;
  domainLabel: string;
  onClose: () => void;
};

const riskTone: Record<DomainIndicatorDetail["riskLevel"], string> = {
  안정: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
  주의: "border-yellow-300/30 bg-yellow-400/10 text-yellow-200",
  경계: "border-amber-300/30 bg-amber-400/10 text-amber-200",
  심각: "border-red-300/30 bg-red-400/10 text-red-200",
};

export function MarketInsightDrawer({ indicator, domainLabel, onClose }: MarketInsightDrawerProps) {
  if (!indicator) return null;

  return (
    <aside className="fixed inset-y-0 right-0 z-[70] w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#0b1120] p-5 text-white shadow-[-28px_0_80px_rgba(0,0,0,0.38)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-[#f6e7bd]">{domainLabel} Indicator Drawer</p>
          <h2 className="mt-1 text-2xl font-black">{indicator.title}</h2>
          <p className="mt-2 text-sm font-semibold text-slate-400">{indicator.affectedSuppliers.join(", ")}</p>
        </div>
        <button className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.06]" type="button" onClick={onClose} aria-label="닫기">
          <X className="h-4 w-4" />
        </button>
      </div>

      <section className="mt-5 grid grid-cols-2 gap-3">
        {[
          ["현재 값", indicator.currentValue],
          ["현재 점수", String(indicator.score)],
          ["7일 변화율", indicator.sevenDayChange],
          ["30일 변화율", indicator.thirtyDayChange],
          ["위험 등급", indicator.riskLevel],
          ["도메인 내 비중", `${Math.round(indicator.weightInMarket * 100)}%`],
        ].map(([label, value]) => (
          <div className="rounded-md border border-white/10 bg-white/[0.045] p-3" key={label}>
            <p className="text-xs font-bold text-slate-400">{label}</p>
            <p className="mt-1 text-lg font-black text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-4 rounded-md border border-white/10 bg-white/[0.035] p-4">
        <p className="font-black text-white">왜 중요한가</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">{indicator.whyItMatters}</p>
      </section>

      <section className="mt-4 rounded-md border border-white/10 bg-white/[0.035] p-4">
        <p className="font-black text-white">SFA Semicon 영향 경로</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">{indicator.impactPath}</p>
      </section>

      <section className="mt-4 rounded-md border border-white/10 bg-white/[0.035] p-4">
        <p className="font-black text-white">위험 판단 기준</p>
        <div className="mt-3 grid gap-2 text-sm">
          <p className="rounded-md bg-white/[0.04] px-3 py-2 text-emerald-100">{indicator.thresholds.stable}</p>
          <p className="rounded-md bg-white/[0.04] px-3 py-2 text-yellow-100">{indicator.thresholds.caution}</p>
          <p className="rounded-md bg-white/[0.04] px-3 py-2 text-amber-100">{indicator.thresholds.warning}</p>
          <p className="rounded-md bg-white/[0.04] px-3 py-2 text-red-100">{indicator.thresholds.critical}</p>
        </div>
      </section>

      <section className="mt-4 rounded-md border border-white/10 bg-white/[0.035] p-4">
        <p className="font-black text-white">구매팀장 체크리스트</p>
        <div className="mt-3 grid gap-2">
          {indicator.checklist.map((item) => (
            <label className="flex gap-2 rounded-md bg-white/[0.04] px-3 py-2 text-sm font-semibold leading-5 text-slate-300" key={item}>
              <input className="mt-0.5 h-4 w-4 accent-red-500" type="checkbox" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-md border border-red-300/20 bg-red-400/10 p-4">
        <p className="font-black text-red-100">추천 대응 액션</p>
        <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-red-100">
          {indicator.recommendedActions.map((action) => (
            <li className="rounded-md bg-black/15 px-3 py-2" key={action}>{action}</li>
          ))}
        </ul>
      </section>

      <section className={`mt-4 rounded-md border p-4 ${riskTone[indicator.riskLevel]}`}>
        <p className="font-black">보고용 문장</p>
        <p className="mt-2 text-sm font-semibold leading-6">{indicator.reportSentence}</p>
      </section>
    </aside>
  );
}
