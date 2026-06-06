import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { DomainScoreCards } from "./components/DomainScoreCards";
import { DomainInsightModal } from "./components/DomainInsightModal";
import { Header } from "./components/Header";
import { ImportExposureTable } from "./components/ImportExposureTable";
import { NewsFeed } from "./components/NewsFeed";
import { OfficialDataSourcesTable } from "./components/OfficialDataSourcesTable";
import { RiskScoreCard } from "./components/RiskScoreCard";
import { RiskTrendChart } from "./components/RiskTrendChart";
import { SituationBoard } from "./components/SituationBoard";
import {
  companyProfile,
  currentDomainScores,
  domainIndicatorDetails,
  domainDrilldowns,
  domainReportSentences,
  domainSupplierImpacts,
  incidentSignals,
  newsItems,
  riskTrend,
  supplierImportExposures,
} from "./data/mockData";
import { calculateRiskScore } from "./lib/riskScoring";
import type { DomainKey } from "./types";

function App() {
  const [activeDomain, setActiveDomain] = useState<DomainKey>("market");
  const [isInsightOpen, setIsInsightOpen] = useState(false);
  const riskResult = calculateRiskScore(currentDomainScores);
  const handleSelectDomain = (domain: DomainKey) => {
    setActiveDomain(domain);
    setIsInsightOpen(true);
  };

  return (
    <main className="min-h-screen px-5 py-6 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px] space-y-5">
        <Header profile={companyProfile} />

        <section className="grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
          <RiskScoreCard riskResult={riskResult} />
          <SituationBoard incidents={incidentSignals} />
        </section>


        <section className="grid gap-4">
          <DomainScoreCards
            activeDomain={activeDomain}
            domainScores={currentDomainScores}
            onSelectDomain={handleSelectDomain}
          />
        </section>


        <RiskTrendChart data={riskTrend} />

        <ImportExposureTable exposures={supplierImportExposures} />

        <section className="grid gap-4">
          <NewsFeed newsItems={newsItems} />
        </section>

        <OfficialDataSourcesTable />

        <div className="flex items-center gap-2 rounded-md border border-[#c9a85c]/30 bg-[#c9a85c]/10 px-4 py-3 text-sm font-semibold text-[#f6e7bd]">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>
            공개 데이터로 확인 가능한 환율·유가·구리 프록시는 실제 기준값을 반영했고, 공급처 매입 비중·PCB 유료지표·ERP 리드타임은 기업 내부 데이터 연동 시 자동 대체됩니다.
          </span>
        </div>
      </div>
      <DomainInsightModal
        data={domainDrilldowns[activeDomain]}
        indicators={domainIndicatorDetails[activeDomain]}
        open={isInsightOpen}
        onClose={() => setIsInsightOpen(false)}
        reportSentence={domainReportSentences[activeDomain]}
        supplierImpacts={domainSupplierImpacts[activeDomain]}
      />
    </main>
  );
}

export default App;
