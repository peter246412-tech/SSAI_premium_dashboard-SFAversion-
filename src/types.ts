export type DomainScores = {
  market: number;
  news: number;
  geo: number;
  logistics: number;
};

export type RiskResult = {
  riskScore: number;
  riskLevel: "안정" | "주의" | "위험" | "고위험";
  domainScores: DomainScores;
  topCauses: string[];
  recommendedActions: string[];
};

export type Supplier = {
  name: string;
  country: string;
  type: "Domestic" | "Overseas";
  riskLevel: "Low" | "Medium" | "High";
  note: string;
};

export type NewsItem = {
  date: string;
  supplier: string;
  title: string;
  riskType: "market" | "production" | "logistics" | "regulation";
  severity: "Low" | "Medium" | "High";
};

export type TrendPoint = {
  date: string;
  score: number;
  event?: string;
};

export type DomainKey = keyof DomainScores;

export type MarketSignal = {
  label: string;
  value: string;
  change: string;
  score: number;
  weight: number;
  status: "Stable" | "Watch" | "Warning" | "Critical";
};

export type IncidentSignal = {
  title: string;
  domain: DomainKey;
  trigger: string;
  currentValue: string;
  threshold: string;
  impact: string;
  status: "감시" | "경계" | "긴급";
};

export type GeoExposure = {
  country: string;
  suppliers: string;
  dependency: number;
  riskWeight: number;
  trigger: string;
  status: "Low" | "Medium" | "High";
};

export type LogisticsSignal = {
  label: string;
  currentValue: string;
  threshold: string;
  scoreImpact: string;
};

export type SupplierImportExposure = {
  supplier: string;
  share: number;
  countryType: "Domestic" | "Overseas";
  country: string;
  importItems: string;
  importLine: string;
  role: string;
  riskLevel: "Low" | "Medium" | "High";
  substitutability: "Low" | "Medium" | "High";
  incident: string;
  dataEvidence: string;
  riskReason: string;
  safetyReason: string;
};

export type RiskMetricDetail = {
  id: string;
  label: string;
  value: string;
  score: number;
  status: "Stable" | "Watch" | "Warning" | "Critical";
  supplierScope: string;
  itemLine: string;
  dataEvidence: string[];
  currentSituation: string[];
  riskInterpretation: string;
  safetyInterpretation: string;
  recommendedAction: string;
};

export type DomainDrilldownData = {
  domain: DomainKey;
  title: string;
  subtitle: string;
  score: number;
  summary: string;
  metrics: RiskMetricDetail[];
};

export type MarketIndicatorDetail = {
  id: string;
  title: string;
  currentValue: string;
  score: number;
  sevenDayChange: string;
  thirtyDayChange: string;
  riskLevel: "안정" | "주의" | "경계" | "심각";
  weightInMarket: number;
  affectedSuppliers: string[];
  whyItMatters: string;
  impactPath: string;
  thresholds: {
    stable: string;
    caution: string;
    warning: string;
    critical: string;
  };
  checklist: string[];
  recommendedActions: string[];
  reportSentence: string;
};

export type DomainIndicatorDetail = MarketIndicatorDetail;

export type SupplierImpact = {
  supplier: string;
  country: string;
  exposureType: string;
  impactedIndicator: string;
  riskLevel: "Low" | "Medium" | "High";
  suggestedAction: string;
};

export type DataSourceStatus = {
  source: string;
  dataType: string;
  latestValue: string;
  displayValue: string;
  interpretation: string;
  sourceType: "Official data" | "Proxy data" | "Scenario estimate" | "Need internal data";
  sourceUrl?: string;
  collectionMethod: string;
  refreshCycle: string;
  status: "Live" | "Batch" | "Proxy" | "Pending";
};
