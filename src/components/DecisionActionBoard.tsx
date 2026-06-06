import { AlertTriangle, Eye, ShieldCheck } from "lucide-react";

type ActionItem = {
  title: string;
  description: string;
  data: string;
  cta: string;
};

type ActionSection = {
  label: string;
  title: string;
  description: string;
  tone: "urgent" | "watch" | "monitor";
  icon: typeof AlertTriangle;
  actions: ActionItem[];
};

const toneStyle = {
  urgent: {
    rail: "bg-gradient-to-b from-[#ff7a45] to-[#d94b35]",
    card: "border-[#ff7a45]/30 bg-[#ff7a45]/[0.075]",
    label: "border-[#ff7a45]/35 bg-[#ff7a45]/10 text-[#ffd2ba]",
    button: "border-[#ff7a45]/35 bg-[#ff7a45]/10 text-[#ffd2ba]",
    icon: "text-[#ff9a72]",
  },
  watch: {
    rail: "bg-gradient-to-b from-[#f2c94c] to-[#d6a742]",
    card: "border-[#d6b45a]/30 bg-[#d6b45a]/[0.07]",
    label: "border-[#d6b45a]/35 bg-[#d6b45a]/10 text-[#f6e7bd]",
    button: "border-[#d6b45a]/35 bg-[#d6b45a]/10 text-[#f6e7bd]",
    icon: "text-[#f6d77a]",
  },
  monitor: {
    rail: "bg-gradient-to-b from-[#38bdf8] to-[#34d399]",
    card: "border-sky-300/25 bg-sky-400/[0.055]",
    label: "border-sky-300/30 bg-sky-400/10 text-sky-100",
    button: "border-sky-300/30 bg-sky-400/10 text-sky-100",
    icon: "text-sky-200",
  },
};

const sections: ActionSection[] = [
  {
    label: "URGENT · 오늘 우선 처리",
    title: "긴급",
    description: "원가 상승이 구매 단가로 전가되기 전 즉시 확인해야 하는 항목",
    tone: "urgent",
    icon: AlertTriangle,
    actions: [
      {
        title: "PCB 단기 조달 원가 재계산",
        description: "USD/KRW 환율 ₩1,445.97, 30일 +3.4% 상승분을 반영해 KINSUS·Fast Print 발주분의 원화 환산 단가를 재계산",
        data: "MarketScore 82 / 환율 리스크 84",
        cta: "원가 영향 확인",
      },
      {
        title: "구리 가격 전가 가능성 확인",
        description: "구리 가격 $12,951/t, 30일 +7.9% 상승 기준으로 동박·CCL 기반 PCB 견적 단가 인상 가능성 점검",
        data: "Copper Proxy Risk 88",
        cta: "견적 유효기간 확인",
      },
      {
        title: "기존 견적서 유효기간 및 발주 가능 물량 확인",
        description: "단가 인상 전 적용 가능한 견적이 남아있는지, 선발주 가능한 MOQ·납기 조건을 공급처에 확인",
        data: "추천 발주 판단: 긴급 선발주 검토",
        cta: "PO 전환 검토",
      },
    ],
  },
  {
    label: "WATCH · 이번 주 검토",
    title: "주의",
    description: "리스크가 더 커질 경우 납기·공급 차질로 전환될 수 있는 항목",
    tone: "watch",
    icon: ShieldCheck,
    actions: [
      {
        title: "핵심 PCB 안전재고 +20% 상향 검토",
        description: "Risk 61~80 구간 대응으로 FC-BGA, FC-CSP, HDI 등 핵심 PCB 품목의 단기 안전재고를 상향 검토",
        data: "Weighted Score 72 / Market Contribution 36.9",
        cta: "재고 정책 점검",
      },
      {
        title: "공급처 회신 확보",
        description: "KINSUS·Fast Print 대상으로 다음 분기 단가, 납기, 생산 가능 물량, 긴급 발주 가능 여부를 회신받음",
        data: "NewsScore 68 / 공급처 위험 기사 증가",
        cta: "Supplier Reply 요청",
      },
      {
        title: "대체 공급처 후보군 사전 비교",
        description: "심텍, 대덕전자, 삼성전기 등 국내/대체 PCB 공급처의 단가·납기·품질 조건을 비교해 협상 옵션 확보",
        data: "News + Geo 리스크 반영",
        cta: "대체 가능성 확인",
      },
    ],
  },
  {
    label: "MONITOR · 지속 추적",
    title: "적정",
    description: "아직 즉시 대응 단계는 아니지만 임계값 도달 시 바로 전환해야 하는 항목",
    tone: "monitor",
    icon: Eye,
    actions: [
      {
        title: "SCFI 및 항만 지연 지표 모니터링",
        description: "현재 LogisticsScore 47로 급등 전 단계지만, SCFI +30% 이상 또는 High 운송 차질 뉴스 발생 시 LogisticsScore 80+로 전환",
        data: "LogisticsScore 47 / SCFI +9.8%",
        cta: "물류 임계값 추적",
      },
      {
        title: "대만·중국·통관 이슈 추적",
        description: "해외 PCB 공급망 노출 지역의 통관, 군사 긴장, 수출입 규제 관련 이벤트를 지속 모니터링",
        data: "GeoScore 72",
        cta: "Geo Event 추적",
      },
      {
        title: "리스크 점수 재평가 알림",
        description: "MarketScore 85 이상 또는 Weighted Score 80 이상 도달 시 구매팀에 즉시 알림을 발생시키는 구조",
        data: "현재 Weighted Score 72",
        cta: "Alert 조건 설정",
      },
    ],
  },
];

export function DecisionActionBoard() {
  return (
    <section className="dashboard-card overflow-hidden p-5">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">Decision Action Board</p>
          <h2 className="mt-1 text-2xl font-black text-white">의사결정 대응 보드</h2>
          <p className="mt-2 text-sm font-semibold text-slate-400">현재 Risk 72 기준, 구매 담당자가 우선 확인해야 할 실행 순서</p>
        </div>
        <span className="w-fit rounded-md border border-[#ff7a45]/35 bg-[#ff7a45]/10 px-3 py-1.5 text-sm font-black text-[#ffd2ba]">
          Risk 72 | 61-80 위험 구간
        </span>
      </div>

      <div className="mt-5 rounded-md border border-[#d6b45a]/30 bg-[#d6b45a]/10 p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6e7bd]">Recommended Decision</p>
        <p className="mt-2 text-base font-black leading-7 text-white">
          현재는 무조건 발주 단계가 아니라, 기존 견적 유효기간·공급처 회신·원화 환산 단가를 확인한 뒤 긴급 선발주 여부를 판단하는 단계입니다.
        </p>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {sections.map((section) => {
          const style = toneStyle[section.tone];
          const Icon = section.icon;

          return (
            <article className={`overflow-hidden rounded-md border ${style.card}`} key={section.label}>
              <div className="flex items-start gap-3 border-b border-white/10 p-4">
                <span className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-md border ${style.label}`}>
                  <Icon className={`h-4 w-4 ${style.icon}`} />
                </span>
                <div>
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-black ${style.label}`}>{section.label}</span>
                  <h3 className="mt-3 text-lg font-black text-white">{section.title}</h3>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-400">{section.description}</p>
                </div>
              </div>

              <div className="divide-y divide-white/10">
                {section.actions.map((action, index) => (
                  <div className="relative p-4" key={action.title}>
                    <span className={`absolute inset-y-4 left-0 w-1 rounded-r-full ${style.rail}`} />
                    <div className="pl-3">
                      <div className="flex items-start gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-black/35 text-xs font-black text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="font-black leading-6 text-white">{action.title}</p>
                          <p className="mt-1 text-sm font-semibold leading-6 text-slate-400">{action.description}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 pl-10">
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-black text-slate-300">{action.data}</span>
                        <span className={`rounded-full border px-2.5 py-1 text-[11px] font-black ${style.button}`}>{action.cta}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
