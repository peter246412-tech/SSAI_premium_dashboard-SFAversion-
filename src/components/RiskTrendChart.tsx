import { CartesianGrid, Line, LineChart, ReferenceDot, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TrendPoint } from "../types";

type RiskTrendChartProps = {
  data: TrendPoint[];
};

export function RiskTrendChart({ data }: RiskTrendChartProps) {
  return (
    <section className="dashboard-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">30-Day Risk Score Line Chart</p>
          <h2 className="mt-1 text-2xl font-black text-white">최근 30일 SSAI 점수 추이</h2>
        </div>
        <p className="rounded-md border border-[#d6b45a]/30 bg-[#d6b45a]/10 px-3 py-1.5 text-sm font-black text-[#f6e7bd]">
          환율·뉴스·물류 이벤트 반영
        </p>
      </div>

      <div className="mt-5 h-[390px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 16, right: 28, left: 4, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(226,232,240,0.22)" />
            <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }} interval={4} />
            <YAxis domain={[30, 90]} tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }} />
            <ReferenceLine y={60} stroke="rgba(250,204,21,0.38)" strokeDasharray="4 4" label={{ value: "주의 60", fill: "#f6e7bd", fontSize: 11, position: "insideRight" }} />
            <ReferenceLine y={75} stroke="rgba(249,115,22,0.38)" strokeDasharray="4 4" label={{ value: "위험 75", fill: "#ffd2ba", fontSize: 11, position: "insideRight" }} />
            <ReferenceLine y={80} stroke="rgba(239,68,68,0.38)" strokeDasharray="4 4" label={{ value: "고위험 80", fill: "#fecaca", fontSize: 11, position: "insideRight" }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, borderColor: "rgba(214,180,90,0.35)", background: "#111827", color: "#f8fafc" }}
              formatter={(value) => [`${value}점`, "Risk Score"]}
              labelFormatter={(label) => `날짜: ${label}`}
            />
            <Line type="monotone" dataKey="score" stroke="#2f6df6" strokeWidth={3.5} dot={false} activeDot={{ r: 6, fill: "#ff7a45", stroke: "#fff" }} />
            {data
              .filter((point) => point.event)
              .map((point) => (
                <ReferenceDot key={`${point.date}-${point.event}`} x={point.date} y={point.score} r={6} fill="#f97316" stroke="#fff" strokeWidth={2} />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold leading-6 text-slate-300">
        최근 30일 동안 환율 상승, 구리 가격 상승, 공급처 위험 뉴스 증가가 누적되며 SSAI Score가 60대에서 70대 위험 구간으로 진입했습니다.
      </p>
    </section>
  );
}
