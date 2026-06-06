import { ArrowUpRight, ShieldAlert, Target, WalletCards } from "lucide-react";
import type { RiskResult } from "../types";

type SummaryCardsProps = {
  riskResult: RiskResult;
  mainDriver: string;
};

const levelClass: Record<RiskResult["riskLevel"], string> = {
  안정: "text-emerald-200 bg-emerald-400/10 border-emerald-300/30 shadow-[0_0_24px_rgba(52,211,153,0.12)]",
  주의: "text-yellow-200 bg-yellow-400/10 border-yellow-300/30 shadow-[0_0_24px_rgba(250,204,21,0.12)]",
  위험: "text-red-100 bg-red-500/15 border-red-400/50 shadow-[0_0_32px_rgba(239,68,68,0.28)]",
  고위험: "text-red-200 bg-red-400/10 border-red-300/30 shadow-[0_0_24px_rgba(248,113,113,0.16)]",
};

export function SummaryCards({ riskResult, mainDriver }: SummaryCardsProps) {
  const cards = [
    {
      title: "오늘 Risk Score",
      value: `${riskResult.riskScore}`,
      helper: "0~100 SSAI index",
      icon: ArrowUpRight,
    },
    {
      title: "현재 등급",
      value: riskResult.riskLevel,
      helper: "61~80 구간은 위험",
      icon: ShieldAlert,
      valueClass: levelClass[riskResult.riskLevel],
    },
    {
      title: "최대 기여 도메인",
      value: mainDriver,
      helper: "기여도 기준 자동 산출",
      icon: WalletCards,
    },
    {
      title: "즉시 권고 액션",
      value: "조달비 재산정",
      helper: riskResult.recommendedActions[0],
      icon: Target,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article className="dashboard-card relative overflow-hidden p-5" key={card.title}>
            {card.title === "현재 등급" ? (
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-red-400/80 to-transparent" />
            ) : null}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-500">{card.title}</p>
                <p
                  className={`mt-3 inline-flex min-h-10 items-center rounded-md text-3xl font-black tracking-tight ${
                    card.valueClass ? `border px-4 py-1.5 text-3xl ${card.valueClass}` : "text-slate-950"
                  }`}
                >
                  {card.value}
                </p>
              </div>
              <div
                className={`grid h-10 w-10 place-items-center rounded-md border ${
                  card.title === "현재 등급"
                    ? "border-red-400/40 bg-red-500/15 text-red-100 shadow-[0_0_24px_rgba(239,68,68,0.18)]"
                    : "border-[#c9a85c]/30 bg-[#c9a85c]/10 text-[#f6e7bd]"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 line-clamp-2 text-sm font-bold leading-5 text-slate-500">{card.helper}</p>
          </article>
        );
      })}
    </section>
  );
}
