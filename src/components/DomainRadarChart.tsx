import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import type { DomainScores } from "../types";
import { DOMAIN_LABELS } from "../lib/riskScoring";

type DomainRadarChartProps = {
  domainScores: DomainScores;
};

export function DomainRadarChart({ domainScores }: DomainRadarChartProps) {
  const data = [
    { domain: DOMAIN_LABELS.market, score: domainScores.market },
    { domain: DOMAIN_LABELS.news, score: domainScores.news },
    { domain: DOMAIN_LABELS.geo, score: domainScores.geo },
    { domain: DOMAIN_LABELS.logistics, score: domainScores.logistics },
  ];

  return (
    <section className="dashboard-card p-5">
      <div>
        <p className="text-sm font-semibold text-slate-500">Domain Radar Chart</p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">4개 도메인 리스크 균형</h2>
      </div>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#cbd5e1" />
            <PolarAngleAxis dataKey="domain" tick={{ fill: "#334155", fontSize: 12, fontWeight: 700 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 11 }} />
            <Radar dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.22} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
