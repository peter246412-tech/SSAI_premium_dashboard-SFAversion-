import type { DomainKey, DomainScores, RiskResult } from "../types";

export const DOMAIN_WEIGHTS: Record<DomainKey, number> = {
  market: 0.45,
  news: 0.25,
  geo: 0.15,
  logistics: 0.15,
};

export const DOMAIN_LABELS: Record<DomainKey, string> = {
  market: "Market",
  news: "News",
  geo: "Geo",
  logistics: "Logistics",
};

const CAUSE_MESSAGES: Record<DomainKey, string> = {
  market: "환율·구리 가격·수입물가 등 시장 변수의 상승 압력이 가장 크게 작용했습니다.",
  news: "PCB 공급처 및 반도체 공급망 관련 위험 뉴스가 증가했습니다.",
  geo: "대만·일본 등 해외 PCB 공급처 노출로 지정학적 리스크가 반영되었습니다.",
  logistics: "항만 물동량 및 해상운임 변동으로 물류 리스크가 반영되었습니다.",
};

const ACTION_MESSAGES: Record<DomainKey, string[]> = {
  market: [
    "PCB 단기 조달 비용, 환율 민감도, 구리 가격 상승분의 원가 전가 가능성을 재산정하세요.",
    "Risk 61~80 구간 대응으로 핵심 PCB 안전재고를 +20% 상향 검토하세요.",
  ],
  news: ["심텍, 대덕전자, 삼성전기, KINSUS, Fast Print 관련 공급 차질 뉴스를 확인하세요."],
  geo: ["대만·일본 등 해외 공급처 의존도를 점검하고 대체 공급처를 검토하세요."],
  logistics: ["해상운임과 항만 적체 가능성을 반영해 리드타임을 재계산하세요."],
};

export function getRiskLevel(score: number): RiskResult["riskLevel"] {
  if (score <= 30) return "안정";
  if (score <= 60) return "주의";
  if (score <= 80) return "위험";
  return "고위험";
}

export function getDomainContributions(domainScores: DomainScores) {
  return (Object.keys(domainScores) as DomainKey[])
    .map((domain) => ({
      domain,
      label: DOMAIN_LABELS[domain],
      score: domainScores[domain],
      weight: DOMAIN_WEIGHTS[domain],
      contribution: domainScores[domain] * DOMAIN_WEIGHTS[domain],
    }))
    .sort((a, b) => b.contribution - a.contribution);
}

export function calculateRiskScore(domainScores: DomainScores): RiskResult {
  const riskScore = Math.round(
    domainScores.market * DOMAIN_WEIGHTS.market +
      domainScores.news * DOMAIN_WEIGHTS.news +
      domainScores.geo * DOMAIN_WEIGHTS.geo +
      domainScores.logistics * DOMAIN_WEIGHTS.logistics,
  );

  const contributions = getDomainContributions(domainScores);
  const topCauses = contributions.slice(0, 3).map(({ domain }) => CAUSE_MESSAGES[domain]);
  const recommendedActions = contributions
    .flatMap(({ domain }) => ACTION_MESSAGES[domain])
    .slice(0, 3);

  return {
    riskScore,
    riskLevel: getRiskLevel(riskScore),
    domainScores,
    topCauses,
    recommendedActions,
  };
}
