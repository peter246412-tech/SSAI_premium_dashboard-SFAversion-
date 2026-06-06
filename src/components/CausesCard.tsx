import type { DomainKey } from "../types";

type Contribution = {
  domain: DomainKey;
  label: string;
  score: number;
  weight: number;
  contribution: number;
};

type CausesCardProps = {
  causes: string[];
  contributions: Contribution[];
};

export function CausesCard({ causes, contributions }: CausesCardProps) {
  return (
    <section className="dashboard-card p-5">
      <div>
        <p className="text-sm font-semibold text-slate-500">Top Causes</p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">점수 산출 주요 원인 3개</h2>
      </div>

      <div className="mt-5 space-y-3">
        {causes.map((cause, index) => {
          const contribution = contributions[index];
          return (
            <article className="rounded-md border border-slate-200 bg-slate-50 p-4" key={cause}>
              <div className="flex items-start gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-slate-950 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold leading-6 text-slate-900">{cause}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    {contribution.label} 기여도 {contribution.contribution.toFixed(1)} =
                    {" "}점수 {contribution.score} x 가중치 {Math.round(contribution.weight * 100)}%
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
