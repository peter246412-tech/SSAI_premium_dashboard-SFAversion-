import type { NewsItem } from "../types";

type NewsFeedProps = {
  newsItems: NewsItem[];
};

const severityMeta: Record<
  NewsItem["severity"],
  {
    label: string;
    className: string;
    dot: string;
  }
> = {
  Low: {
    label: "일반 모니터링",
    className: "border-slate-300/15 bg-white/[0.04] text-slate-300",
    dot: "bg-slate-400",
  },
  Medium: {
    label: "집중 관찰",
    className: "border-[#c9a85c]/35 bg-[#c9a85c]/10 text-[#f6e7bd]",
    dot: "bg-[#d7b76a]",
  },
  High: {
    label: "즉시 확인",
    className: "border-[#d96d52]/35 bg-[#d96d52]/10 text-[#ffb59f]",
    dot: "bg-[#ff7a59]",
  },
};

const riskTypeLabel: Record<NewsItem["riskType"], string> = {
  market: "시장 가격",
  production: "생산 차질",
  logistics: "물류/납기",
  regulation: "규제/통관",
};

export function NewsFeed({ newsItems }: NewsFeedProps) {
  return (
    <section className="dashboard-card overflow-hidden">
      <div className="border-b border-slate-200 p-5">
        <p className="text-sm font-semibold text-slate-500">Risk News Monitoring</p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">공급망 뉴스 위험 신호</h2>
      </div>

      <div className="divide-y divide-slate-200">
        {newsItems.map((item) => {
          const severity = severityMeta[item.severity];

          return (
          <article className="grid gap-3 p-5 sm:grid-cols-[0.9fr_1fr_auto]" key={`${item.date}-${item.title}`}>
            <div>
              <p className="text-sm font-bold text-slate-950">{item.date}</p>
              <p className="mt-1 text-sm text-slate-500">{item.supplier}</p>
            </div>
            <div>
              <p className="font-semibold leading-6 text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm text-slate-500">분류: {riskTypeLabel[item.riskType]}</p>
            </div>
            <div className="sm:text-right">
              <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-black ${severity.className}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${severity.dot}`} />
                {severity.label}
              </span>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}
