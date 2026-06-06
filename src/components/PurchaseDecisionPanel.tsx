import { useState } from "react";
import { ClipboardList, FileText, Table2 } from "lucide-react";
import type { SupplierImpact } from "../types";
import { ReportSentenceBox } from "./ReportSentenceBox";
import { SupplierImpactTable } from "./SupplierImpactTable";

type PurchaseDecisionPanelProps = {
  score: number;
  domainLabel: string;
  supplierImpacts: SupplierImpact[];
  reportSentence: string;
};

type PanelMode = "decision" | "supplier" | "report";

function getDecision(score: number) {
  if (score >= 81) return "긴급 선발주 검토";
  if (score >= 61) return "안전재고 확보 검토";
  if (score >= 31) return "견적 재확인 후 발주";
  return "정상 발주 유지";
}

export function PurchaseDecisionPanel({ score, domainLabel, supplierImpacts, reportSentence }: PurchaseDecisionPanelProps) {
  const [mode, setMode] = useState<PanelMode>("decision");
  const decision = getDecision(score);

  return (
    <section className="mt-5 rounded-md border border-white/10 bg-white/[0.035] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-[#f6e7bd]">구매 의사결정 패널</p>
          <p className="mt-1 text-sm font-semibold text-slate-400">{domainLabel} Score {score} 기준 구매팀장 판단 보조</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-black text-white transition hover:border-[#c9a85c]/50" type="button" onClick={() => setMode("decision")}>
            <ClipboardList className="mr-1 inline h-3.5 w-3.5" /> 발주 판단 보기
          </button>
          <button className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-black text-white transition hover:border-[#c9a85c]/50" type="button" onClick={() => setMode("supplier")}>
            <Table2 className="mr-1 inline h-3.5 w-3.5" /> 공급처 영향 보기
          </button>
          <button className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-black text-white transition hover:border-[#c9a85c]/50" type="button" onClick={() => setMode("report")}>
            <FileText className="mr-1 inline h-3.5 w-3.5" /> 보고 문장 생성
          </button>
        </div>
      </div>

      <div className="mt-4">
        {mode === "decision" ? (
          <div className="rounded-md border border-red-300/20 bg-red-400/10 p-4">
            <p className="text-sm font-black text-red-100">추천 발주 판단</p>
            <p className="mt-2 text-3xl font-black text-white">{decision}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-red-100">
              현재 {domainLabel} 리스크 기준으로 신규 발주는 공급처 영향, 납기/견적 조건, 대체 가능성을 확인한 뒤 진행하는 것이 적절합니다.
            </p>
          </div>
        ) : null}

        {mode === "supplier" ? <SupplierImpactTable impacts={supplierImpacts} /> : null}
        {mode === "report" ? <ReportSentenceBox sentence={reportSentence} /> : null}
      </div>
    </section>
  );
}
