import { Info, Zap } from "lucide-react";

type SituationBoardProps = {
  incidents?: unknown[];
};

type ActionTone = "orange" | "amber" | "cyan";

type ActionRow = {
  timing: "TODAY" | "THIS WEEK" | "MONITOR";
  action: string;
  why: string;
  signal: string;
  output: string;
  tone: ActionTone;
};

type ImpactRow = {
  domain: string;
  signals: string;
  cost: number;
  delivery: number;
  quality: number;
  check: string;
};

const actionRows: ActionRow[] = [
  {
    timing: "TODAY",
    action: "원화 환산 단가 재계산",
    why: "USD/KRW 기준 해외 발주분의 원화 매입가 갱신",
    signal: "FX 84",
    output: "원가 확인",
    tone: "orange",
  },
  {
    timing: "TODAY",
    action: "구리 가격 전가 여부 확인",
    why: "동박·CCL 원가 상승분의 다음 견적 반영 가능성 확인",
    signal: "Copper 88",
    output: "견적 확인",
    tone: "orange",
  },
  {
    timing: "THIS WEEK",
    action: "기존 견적 유효기간 확인",
    why: "단가 인상 전 적용 가능한 견적·MOQ·납기 조건 확인",
    signal: "Market 82",
    output: "PO 검토",
    tone: "amber",
  },
  {
    timing: "THIS WEEK",
    action: "핵심 PCB 안전재고 +20% 검토",
    why: "FC-BGA·FC-CSP·HDI 품목의 단기 안전재고 상향 필요성 판단",
    signal: "Risk 72",
    output: "재고 점검",
    tone: "amber",
  },
  {
    timing: "MONITOR",
    action: "공급처 회신 확보",
    why: "KINSUS·Fast Print의 다음 분기 단가·납기·생산 가능 물량 확인",
    signal: "News 68 · Geo 72",
    output: "회신 요청",
    tone: "cyan",
  },
  {
    timing: "MONITOR",
    action: "물류 임계값 추적",
    why: "SCFI +30% 또는 고위험 운송 차질 뉴스 발생 시 대응 단계 상향",
    signal: "Logistics 47",
    output: "조건 추적",
    tone: "cyan",
  },
];

const impactRows: ImpactRow[] = [
  { domain: "Market", signals: "환율·구리·수입물가", cost: 5, delivery: 2, quality: 1, check: "원화 환산 단가 재계산" },
  { domain: "News", signals: "공급처 위험 기사", cost: 3, delivery: 5, quality: 3, check: "공급처 회신 확보" },
  { domain: "Geo", signals: "대만·중국·통관", cost: 3, delivery: 5, quality: 2, check: "생산지·통관 조건 확인" },
  { domain: "Logistics", signals: "SCFI·항만·리드타임", cost: 3, delivery: 5, quality: 2, check: "ETA·운송모드 확인" },
];

const toneStyle: Record<ActionTone, { timing: string; signal: string; output: string; row: string; rail: string; glow: string }> = {
  orange: {
    timing: "border-[#ff6b35]/35 bg-[#ff6b35]/12 text-[#ffd2ba]",
    signal: "border-[#ff6b35]/28 bg-[#ff6b35]/8 text-[#ffcfbb]",
    output: "border-[#ff9b63]/35 bg-[#ff7a45]/12 text-white",
    row: "bg-[linear-gradient(90deg,rgba(255,107,53,0.14),rgba(255,107,53,0.035)_42%,rgba(12,19,34,0.55))] hover:bg-[linear-gradient(90deg,rgba(255,107,53,0.18),rgba(255,107,53,0.05)_42%,rgba(12,19,34,0.65))]",
    rail: "bg-gradient-to-b from-[#ff4d2e] to-[#ff9b63]",
    glow: "shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_28px_rgba(255,107,53,0.08)]",
  },
  amber: {
    timing: "border-[#d6b45a]/35 bg-[#d6b45a]/10 text-[#f6e7bd]",
    signal: "border-[#d6b45a]/26 bg-[#d6b45a]/8 text-[#f6e7bd]",
    output: "border-[#d6b45a]/24 bg-white/[0.045] text-slate-100",
    row: "bg-[linear-gradient(90deg,rgba(214,180,90,0.10),rgba(214,180,90,0.03)_42%,rgba(12,19,34,0.55))] hover:bg-[linear-gradient(90deg,rgba(214,180,90,0.14),rgba(214,180,90,0.045)_42%,rgba(12,19,34,0.65))]",
    rail: "bg-gradient-to-b from-[#d6b45a] to-[#f2a84b]",
    glow: "shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]",
  },
  cyan: {
    timing: "border-cyan-300/28 bg-cyan-400/8 text-cyan-100",
    signal: "border-cyan-300/22 bg-cyan-400/7 text-cyan-100",
    output: "border-white/14 bg-white/[0.045] text-slate-100",
    row: "bg-[linear-gradient(90deg,rgba(34,211,238,0.075),rgba(34,211,238,0.02)_42%,rgba(12,19,34,0.55))] hover:bg-[linear-gradient(90deg,rgba(34,211,238,0.11),rgba(34,211,238,0.035)_42%,rgba(12,19,34,0.65))]",
    rail: "bg-gradient-to-b from-cyan-300 to-sky-500",
    glow: "shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
  },
};

const axisTone = {
  cost: { dot: "bg-amber-300", text: "text-amber-100" },
  delivery: { dot: "bg-cyan-300", text: "text-cyan-100" },
  quality: { dot: "bg-violet-300", text: "text-violet-100" },
};

function SignalChip({ value, tone }: { value: string; tone: ActionTone }) {
  return <span className={`inline-flex w-fit rounded-full border px-2 py-1 text-[12px] font-black leading-none ${toneStyle[tone].signal}`}>{value}</span>;
}

function OutputChip({ value, tone }: { value: string; tone: ActionTone }) {
  return <span className={`inline-flex w-fit rounded-full border px-2 py-1 text-[12px] font-black leading-none ${toneStyle[tone].output}`}>{value}</span>;
}

function ImpactDots({ value, tone }: { value: number; tone: keyof typeof axisTone }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span className={`h-2.5 w-2.5 rounded-full ${index < value ? axisTone[tone].dot : "bg-white/10"}`} key={index} />
        ))}
      </div>
      <span className={`min-w-7 text-right text-xs font-black ${axisTone[tone].text}`}>{value}/5</span>
    </div>
  );
}

export function SituationBoard(_props: SituationBoardProps) {
  return (
    <section className="dashboard-card overflow-hidden p-5">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-[clamp(1.35rem,2vw,1.9rem)] font-black leading-tight tracking-tight text-white">Decision Action Board</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">Risk 72 기준, 오늘의 구매 대응 우선순위입니다.</p>
        </div>
        <span className="w-fit shrink-0 rounded-md border border-[#ff7a45]/35 bg-[#ff7a45]/10 px-3 py-1.5 text-xs font-black text-[#ffd2ba]">
          Risk 72 | 61-80 위험
        </span>
      </div>

      <div className="mt-4 flex min-h-[76px] items-center gap-3 rounded-md border border-[#d6b45a]/24 bg-[#0c1322]/75 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-[#d6b45a]/25 bg-[#d6b45a]/10 text-[#f6e7bd]">
          <Zap className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#f6e7bd]">Recommended Decision</p>
          <p className="mt-1 break-keep text-sm font-semibold leading-6 text-slate-100">
            현재 단계는 즉시 발주 확정이 아니라 구매 조건 재검증입니다. 해외 공급처 견적 유효기간, 원화 환산 단가, 안전재고 여력을 우선 확인해야 합니다.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-white/10 bg-[#0c1322]/55">
        <div className="grid grid-cols-[118px_minmax(180px,1.05fr)_minmax(260px,1.45fr)_128px_108px] border-b border-white/10 px-3 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500 max-xl:hidden">
          <span>Timing</span>
          <span>Action</span>
          <span>Why it matters</span>
          <span>Signal</span>
          <span>Output</span>
        </div>

        <div className="divide-y divide-white/10">
          {actionRows.map((row) => {
            const style = toneStyle[row.tone];

            return (
              <div
                className={`relative grid min-h-[76px] grid-cols-1 gap-3 px-3 py-3 transition xl:grid-cols-[118px_minmax(180px,1.05fr)_minmax(260px,1.45fr)_128px_108px] xl:items-center ${style.row} ${style.glow}`}
                key={`${row.timing}-${row.action}`}
              >
                <span className={`absolute inset-y-3 left-0 w-1 rounded-r-full ${style.rail}`} />
                <div className="pl-3 xl:pl-0">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-black leading-none ${style.timing}`}>{row.timing}</span>
                </div>
                <p className="break-keep pl-3 text-sm font-black leading-5 text-white xl:pl-0">{row.action}</p>
                <p className="break-keep pl-3 text-sm font-semibold leading-5 text-slate-300 xl:pl-0">{row.why}</p>
                <div className="pl-3 xl:pl-0"><SignalChip tone={row.tone} value={row.signal} /></div>
                <div className="pl-3 xl:pl-0"><OutputChip tone={row.tone} value={row.output} /></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 border-t border-white/10 pt-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d6b45a]">Procurement Impact Matrix</p>
            <h3 className="mt-2 text-xl font-black text-white">Procurement Impact Matrix</h3>
            <p className="mt-2 text-sm font-semibold text-slate-400">
              리스크 신호가 구매 의사결정의 <span className="text-amber-100">원가</span>·<span className="text-cyan-100">납기</span>·<span className="text-violet-100">품질</span> 축에 미치는 영향을 비교합니다.
            </p>
          </div>
          <div className="flex max-w-md items-start gap-2 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-semibold leading-5 text-slate-400">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#f6e7bd]" />
            <span>품질은 대체 공급처·긴급 발주·검증 기간 단축 시 커지는 2차 리스크입니다.</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="overflow-x-auto rounded-md border border-white/10 bg-[#0c1322]/45">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="border-b border-white/10 text-[11px] uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-3 py-3">Domain</th>
                  <th className="px-3 py-3">Signal</th>
                  <th className="px-3 py-3 text-amber-100">Cost</th>
                  <th className="px-3 py-3 text-cyan-100">Delivery</th>
                  <th className="px-3 py-3 text-violet-100">Quality</th>
                  <th className="px-3 py-3">Primary Check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {impactRows.map((row) => (
                  <tr className="hover:bg-white/[0.035]" key={row.domain}>
                    <td className="px-3 py-3 font-black text-white">{row.domain}</td>
                    <td className="px-3 py-3 font-semibold text-slate-400">{row.signals}</td>
                    <td className="px-3 py-3"><ImpactDots tone="cost" value={row.cost} /></td>
                    <td className="px-3 py-3"><ImpactDots tone="delivery" value={row.delivery} /></td>
                    <td className="px-3 py-3"><ImpactDots tone="quality" value={row.quality} /></td>
                    <td className="px-3 py-3">
                      <span className="inline-flex rounded-full border border-[#d6b45a]/30 bg-[#d6b45a]/10 px-2.5 py-1 text-[11px] font-black text-[#f6e7bd]">
                        {row.check}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
