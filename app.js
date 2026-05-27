const COLORS = {
  green: "#2fe6a1",
  yellow: "#ffd166",
  orange: "#ff8a3d",
  red: "#ff516d",
  blue: "#63a7ff",
  teal: "#35e2e2",
  violet: "#9b7cff",
  ink: "#172026",
  muted: "#8ea0b5",
  line: "rgba(166, 211, 255, 0.16)",
};

const scenarios = {
  baseline: {
    score: 58,
    level: "주의",
    levelText: "일부 지표 이상, 주의 필요",
    headline: "원자재 비용 압박은 완만하지만 뉴스 신호가 증가하고 있습니다.",
    narrative:
      "구리 가격과 환율 변동성이 평시 대비 높고, 대만 및 중국 관련 공급망 뉴스가 증가했습니다. 주요 부품 리드타임을 재확인하세요.",
    metrics: { leadTime: "+4일", cost: "+2.1%", confidence: "78%" },
    kpis: { alerts: 7, alertsDelta: "+1 vs yesterday", suppliers: 2, sla: "12h", slaDelta: "Monitor daily" },
    domains: { market: 62, news: 58, geopolitical: 54, logistics: 49 },
    trend: [39, 41, 40, 44, 47, 45, 48, 49, 51, 50, 52, 54, 53, 57, 55, 56, 58, 59, 57, 58, 60, 57, 56, 58, 59, 58, 57, 56, 58, 58],
    causes: [
      ["구리 7일 변화율 +3.8%", "market", 64, "조달 비용 상승 가능성이 확인되어 단기 구매 단가 재산정이 필요합니다."],
      ["대만 생산 리스크 뉴스 증가", "geopolitical", 57, "파운드리 집중도와 관련된 기사량이 전주 대비 증가했습니다."],
      ["SCFI 운임지수 30일 평균 상회", "logistics", 48, "중국발 운송 비용이 평시 대비 높아지고 있습니다."],
    ],
  },
  chinaControl: {
    score: 84,
    level: "고위험",
    levelText: "복합 위험 동시 발현, 즉각 대응 필요",
    headline: "중국 수출통제 신호가 부품 조달과 물류 경로에 동시에 영향을 주고 있습니다.",
    narrative:
      "규제 뉴스 강도와 중국 의존 엔티티 밀도가 급등했습니다. 중국 의존 소재 리스트와 대체 공급처 가용성을 즉시 확인하세요.",
    metrics: { leadTime: "+14일", cost: "+6.2%", confidence: "91%" },
    kpis: { alerts: 18, alertsDelta: "+7 vs yesterday", suppliers: 6, sla: "2h", slaDelta: "Immediate escalation" },
    domains: { market: 72, news: 91, geopolitical: 88, logistics: 77 },
    trend: [46, 47, 49, 52, 51, 54, 56, 58, 61, 63, 64, 62, 65, 68, 69, 71, 74, 78, 81, 83, 80, 82, 85, 84, 86, 84, 83, 85, 84, 84],
    causes: [
      ["중국 규제/수출통제 기사 집중", "regulation", 94, "최근 7일간 중국, 규제, 수출통제 조합의 고위험 기사가 집중 발생했습니다."],
      ["중국 의존 공급처 3곳 고위험", "geopolitical", 88, "Tier 1-2 공급처 중 중국 노출도가 높은 업체의 납기 위험이 상승했습니다."],
      ["상하이항 처리량 전월 대비 -12.3%", "logistics", 78, "대체 항만 및 운송 경로 검토가 필요한 수준입니다."],
      ["원달러 환율 7일 변화율 +3.4%", "market", 70, "단기 조달 비용과 결제 조건 재협상 압박이 커졌습니다."],
    ],
  },
  heliumShock: {
    score: 78,
    level: "위험",
    levelText: "복수 지표 이상, 대응 시작 권고",
    headline: "헬륨 공급 압박과 중국 규제 신호가 동시에 상승 중입니다.",
    narrative:
      "최근 7일간 뉴스 위험 강도와 원자재 비용 압박이 함께 증가했습니다. 공정용 가스 재고와 중국 의존 부품을 우선 점검하세요.",
    metrics: { leadTime: "+9일", cost: "+4.8%", confidence: "87%" },
    kpis: { alerts: 12, alertsDelta: "+3 vs yesterday", suppliers: 4, sla: "4h", slaDelta: "P1 response window" },
    domains: { market: 65, news: 82, geopolitical: 74, logistics: 71 },
    trend: [42, 43, 45, 47, 46, 48, 50, 52, 55, 54, 57, 59, 61, 62, 64, 65, 67, 66, 69, 72, 74, 73, 75, 77, 76, 79, 78, 77, 78, 78],
    causes: [
      ["헬륨 부족 관련 뉴스 23건 급증", "production", 91, "공정용 가스 수급 불확실성이 높아져 비상 재고 점검이 필요합니다."],
      ["구리 가격 30일 평균 이탈", "market", 66, "원자재 비용 압박이 중간 이상으로 상승했습니다."],
      ["대만 지정학 기사 강도 상승", "geopolitical", 73, "생산 집중 지역의 이벤트 강도가 높아지고 있습니다."],
      ["BDI 30일 평균 대비 +11.8%", "logistics", 68, "운임 상승으로 납기와 조달비가 동시에 압박받을 수 있습니다."],
    ],
  },
  logisticsDelay: {
    score: 71,
    level: "위험",
    levelText: "복수 지표 이상, 대응 시작 권고",
    headline: "항만 병목과 운임 상승이 납기 리스크를 빠르게 키우고 있습니다.",
    narrative:
      "부산, 상하이, 대만 항만 지표에서 처리량 감소와 운임 상승이 감지됐습니다. 핵심 품목의 리드타임을 재계산하세요.",
    metrics: { leadTime: "+11일", cost: "+3.7%", confidence: "83%" },
    kpis: { alerts: 10, alertsDelta: "+4 vs yesterday", suppliers: 3, sla: "6h", slaDelta: "Route review needed" },
    domains: { market: 56, news: 69, geopolitical: 61, logistics: 88 },
    trend: [38, 40, 42, 41, 43, 45, 46, 48, 52, 54, 56, 55, 57, 59, 61, 62, 65, 67, 68, 70, 72, 73, 71, 70, 72, 71, 73, 72, 71, 71],
    causes: [
      ["상하이항 물동량 전월 대비 -15.1%", "logistics", 90, "중국발 부품과 소재의 예상 도착일 재계산이 필요합니다."],
      ["SCFI 주간 상승률 +9.4%", "logistics", 82, "해상 운임 상승이 단기 구매 원가에 반영될 가능성이 큽니다."],
      ["항만 지연 뉴스 증가", "news", 69, "물류 병목 관련 기사량이 전주 대비 뚜렷하게 늘었습니다."],
    ],
  },
};

const suppliers = [
  ["Simmtech", "기판 소재", "중국/일본", 82],
  ["Hana Micron", "후공정", "대만/중국", 74],
  ["Wonik Materials", "특수가스", "미국/일본", 68],
  ["ISC", "테스트 소켓", "대만", 61],
  ["Soulbrain", "화학소재", "일본/중국", 58],
];

const newsItems = [
  ["미국, 반도체 장비 대중 수출통제 강화 예고", "regulation", "high", "Reuters", "08:12"],
  ["헬륨 공급 부족 우려, 아시아 공정용 가스 가격 상승", "production", "high", "Korea Economic", "07:48"],
  ["상하이항 컨테이너 처리량 감소, 운임지수 상승", "logistics", "medium", "Port News", "06:40"],
  ["대만 전력 수급 불안에 파운드리 운영 리스크 재부각", "production", "medium", "Nikkei Asia", "Yesterday"],
  ["구리 가격 4주 고점, 전장 부품 원가 부담 확대", "market", "medium", "MarketWatch", "Yesterday"],
];

const actionsByType = {
  regulation: ["중국 의존 부품 및 소재 리스트 점검", "대체 공급처 후보 2곳 이상 RFQ 발송"],
  geopolitical: ["대만 및 중국 노출 품목별 안전재고 기준 재산정", "핵심 공급처의 생산지와 우회 가능 경로 확인"],
  logistics: ["대체 항만 및 복합 운송 경로 검토", "납기 지연 가능 품목의 고객 커뮤니케이션 일정 수립"],
  market: ["단기 조달 비용 재산정", "환율 및 원자재 가격 변동분 반영 계약 조건 검토"],
  production: ["공정용 가스 재고 현황 즉시 점검", "헬륨/네온 비상 재고 확보 계획 수립"],
  news: ["고위험 기사 원문 확인 및 내부 공유", "유사 키워드 모니터링 조건 강화"],
};

const domainMeta = {
  market: ["Market", COLORS.blue],
  news: ["News", COLORS.red],
  geopolitical: ["Geopolitical", COLORS.violet],
  logistics: ["Logistics", COLORS.teal],
};

let state = {
  scenario: "heliumShock",
  range: 30,
  filter: "all",
  causesDescending: true,
};

const $ = (id) => document.getElementById(id);

function getLevelColor(score) {
  if (score >= 81) return COLORS.red;
  if (score >= 61) return COLORS.orange;
  if (score >= 31) return COLORS.yellow;
  return COLORS.green;
}

function mixHex(start, end, ratio) {
  const parse = (hex) => hex.match(/\w\w/g).map((value) => parseInt(value, 16));
  const [sr, sg, sb] = parse(start);
  const [er, eg, eb] = parse(end);
  const mixed = [sr, sg, sb].map((value, index) => {
    const target = [er, eg, eb][index];
    return Math.round(value + (target - value) * ratio)
      .toString(16)
      .padStart(2, "0");
  });
  return `#${mixed.join("")}`;
}

function getGaugeColor(score) {
  if (score <= 35) return mixHex(COLORS.blue, COLORS.green, score / 35);
  if (score <= 70) return mixHex(COLORS.green, COLORS.yellow, (score - 35) / 35);
  return mixHex(COLORS.yellow, COLORS.red, (score - 70) / 30);
}

function getBriefStatus(score) {
  if (score >= 81) return "복합 위험 신호 감지";
  if (score >= 61) return "일부 지표 이상 감지";
  if (score >= 31) return "주의 신호 모니터링";
  return "공급망 안정권 유지";
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

function renderBriefHeadline(text) {
  const keywords = ["중국 규제 신호", "헬륨", "증가"];
  let safe = escapeHTML(text);
  keywords.forEach((keyword) => {
    safe = safe.replaceAll(keyword, `<span class="headline-accent">${keyword}</span>`);
  });
  $("mainHeadline").innerHTML = safe;
}

function renderBriefNarrative(text) {
  const sentences = text
    .split(/(?<=\.)\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  $("mainNarrative").innerHTML = sentences
    .map((sentence) => `<span class="lead-sentence">${escapeHTML(sentence).replaceAll("증가", `<span class="headline-accent">증가</span>`)}</span>`)
    .join("");
}

function render() {
  const data = scenarios[state.scenario];
  const color = getGaugeColor(data.score);
  const currentTime = new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
  $("riskScore").textContent = data.score;
  $("riskLevel").textContent = data.level;
  $("riskLevel").style.color = color;
  $("riskLevel").style.borderColor = "rgba(255, 255, 255, 0.72)";
  $("riskLevel").style.background = `${color}24`;
  $("riskLevel").style.boxShadow = `0 0 22px ${color}33`;
  $("statusText").textContent = getBriefStatus(data.score);
  $("statusDot").style.background = color;
  renderBriefHeadline(data.headline);
  renderBriefNarrative(data.narrative);
  $("leadTimeImpact").textContent = data.metrics.leadTime;
  $("costImpact").textContent = data.metrics.cost;
  $("confidence").textContent = data.metrics.confidence;
  $("openAlerts").textContent = data.kpis.alerts;
  $("openAlertsDelta").textContent = data.kpis.alertsDelta;
  $("criticalSuppliers").textContent = data.kpis.suppliers;
  $("criticalSuppliersDelta").textContent = data.kpis.suppliers >= 5 ? "High China exposure" : "Tier 1-2 exposure";
  $("avgLeadTime").textContent = data.metrics.leadTime;
  $("decisionSla").textContent = data.kpis.sla;
  $("decisionSlaDelta").textContent = data.kpis.slaDelta;
  $("briefUpdated").textContent = `Updated ${currentTime} KST`;
  $("briefConfidence").textContent = `Signal Confidence ${data.metrics.confidence}`;
  $("briefSources").textContent = "Source: Market · News · Logistics";
  $("briefTime").textContent = currentTime;
  $("sidebarSync").textContent = `Last sync ${$("briefTime").textContent} KST`;

  renderGauge(data.score, color);
  renderDomainBars(data.domains);
  renderActions(data.causes);
  renderTrend(data.trend.slice(-state.range));
  renderRadar(data.domains);
  renderCauses(data.causes);
  renderNews();
  renderSuppliers();
  renderBrief(data);
}

function renderGauge(score, color) {
  const canvas = $("riskGauge");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.38;
  const start = -Math.PI / 2;
  const end = start + Math.PI * 2;

  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 28;
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 24;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.lineWidth = 18;
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(255,255,255,0.095)";
  ctx.beginPath();
  ctx.arc(cx, cy, radius, start, end);
  ctx.stroke();

  const grad = ctx.createConicGradient(start, cx, cy);
  grad.addColorStop(0, COLORS.blue);
  grad.addColorStop(0.35, COLORS.green);
  grad.addColorStop(0.7, COLORS.yellow);
  grad.addColorStop(1, COLORS.red);

  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 22;
  ctx.strokeStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, start, start + (score / 100) * Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  for (let i = 0; i < 72; i += 1) {
    const angle = start + (i / 72) * Math.PI * 2;
    const inner = radius - 33;
    const outer = radius - 26;
    ctx.strokeStyle = i / 72 <= score / 100 ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.055)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
    ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
    ctx.stroke();
  }

  const angle = start + (score / 100) * Math.PI * 2;
  const nx = cx + Math.cos(angle) * radius;
  const ny = cy + Math.sin(angle) * radius;
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(nx, ny, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

function renderDomainBars(domains) {
  const entries = Object.entries(domains);
  const avg = entries.reduce((sum, [, value]) => sum + value, 0) / entries.length;
  $("domainAverage").textContent = avg.toFixed(1);
  $("strongestSignal").textContent = domainMeta[entries.sort((a, b) => b[1] - a[1])[0][0]][0];

  $("domainBars").innerHTML = Object.entries(domains)
    .map(([key, value]) => {
      const [label, color] = domainMeta[key];
      return `
        <div class="domain-row">
          <div class="domain-meta"><span>${label}</span><strong>${value}</strong></div>
          <div class="bar-track"><div class="bar-fill" style="width:${value}%;background:${color}"></div></div>
        </div>
      `;
    })
    .join("");
}

function renderActions(causes) {
  const actions = [...new Set(causes.flatMap((cause) => actionsByType[cause[1]] || []))].slice(0, 6);
  $("actionCount").textContent = actions.length;
  $("actionList").innerHTML = actions
    .map(
      (action, index) => `
      <label class="action-item">
        <input type="checkbox" ${index === 0 ? "checked" : ""} />
        <span>${action}<small>${index < 2 ? "Today" : "This week"}</small></span>
      </label>
    `,
    )
    .join("");
}

function renderTrend(values) {
  const canvas = $("trendChart");
  fitCanvas(canvas);
  const ctx = canvas.getContext("2d");
  const { width: w, height: h } = canvas;
  ctx.clearRect(0, 0, w, h);
  const pad = { left: 42, right: 18, top: 20, bottom: 36 };
  const min = Math.max(0, Math.min(...values) - 10);
  const max = Math.min(100, Math.max(...values) + 10);
  const xStep = (w - pad.left - pad.right) / (values.length - 1);
  const y = (value) => h - pad.bottom - ((value - min) / (max - min || 1)) * (h - pad.top - pad.bottom);

  ctx.strokeStyle = COLORS.line;
  ctx.lineWidth = 1;
  ctx.font = "12px Inter, sans-serif";
  ctx.fillStyle = COLORS.muted;
  [30, 60, 80].forEach((tick) => {
    const ty = y(tick);
    ctx.beginPath();
    ctx.moveTo(pad.left, ty);
    ctx.lineTo(w - pad.right, ty);
    ctx.stroke();
    ctx.fillText(String(tick), 10, ty + 4);
  });

  ctx.beginPath();
  values.forEach((value, index) => {
    const x = pad.left + xStep * index;
    const py = y(value);
    if (index === 0) ctx.moveTo(x, py);
    else ctx.lineTo(x, py);
  });
  ctx.strokeStyle = COLORS.blue;
  ctx.lineWidth = 3;
  ctx.stroke();

  const gradient = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
  gradient.addColorStop(0, "rgba(37,104,168,0.22)");
  gradient.addColorStop(1, "rgba(37,104,168,0)");
  ctx.lineTo(w - pad.right, h - pad.bottom);
  ctx.lineTo(pad.left, h - pad.bottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  values.forEach((value, index) => {
    if (index % Math.ceil(values.length / 6) !== 0 && index !== values.length - 1) return;
    const x = pad.left + xStep * index;
    ctx.fillStyle = value >= 81 ? COLORS.red : value >= 61 ? COLORS.orange : value >= 31 ? COLORS.yellow : COLORS.green;
    ctx.beginPath();
    ctx.arc(x, y(value), 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function renderRadar(domains) {
  const canvas = $("radarChart");
  fitCanvas(canvas);
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2 + 8;
  const radius = Math.min(w, h) * 0.32;
  const keys = Object.keys(domains);

  ctx.strokeStyle = COLORS.line;
  ctx.fillStyle = COLORS.muted;
  ctx.font = "12px Inter, sans-serif";
  [0.25, 0.5, 0.75, 1].forEach((scale) => {
    ctx.beginPath();
    keys.forEach((key, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / keys.length;
      const x = cx + Math.cos(angle) * radius * scale;
      const y = cy + Math.sin(angle) * radius * scale;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();
  });

  keys.forEach((key, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / keys.length;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    ctx.stroke();
    const label = domainMeta[key][0];
    const lx = cx + Math.cos(angle) * (radius + 36);
    const ly = cy + Math.sin(angle) * (radius + 26);
    ctx.textAlign = lx < cx - 10 ? "right" : lx > cx + 10 ? "left" : "center";
    ctx.fillText(label, lx, ly);
  });

  ctx.beginPath();
  keys.forEach((key, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / keys.length;
    const dist = radius * (domains[key] / 100);
    const x = cx + Math.cos(angle) * dist;
    const y = cy + Math.sin(angle) * dist;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(42, 140, 140, 0.22)";
  ctx.strokeStyle = COLORS.teal;
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();
}

function renderCauses(causes) {
  const sorted = [...causes].sort((a, b) => (state.causesDescending ? b[2] - a[2] : a[2] - b[2]));
  $("causeList").innerHTML = sorted
    .map(([title, type, impact, detail]) => {
      const color = type === "regulation" ? COLORS.red : domainMeta[type]?.[1] || COLORS.orange;
      const label = type === "production" ? "Production" : type === "regulation" ? "Regulation" : domainMeta[type]?.[0] || "News";
      return `
        <div class="cause-card">
          <div class="cause-top">
            <strong>${title}</strong>
            <span class="badge" style="background:${color}">${label}</span>
          </div>
          <p>${detail}</p>
          <div class="impact-meter"><span style="width:${impact}%;background:${color}"></span></div>
        </div>
      `;
    })
    .join("");
}

function renderNews() {
  const filtered = newsItems.filter((item) => {
    if (state.filter === "all") return true;
    if (state.filter === "high") return item[2] === "high";
    return item[1] === state.filter;
  });

  $("newsList").innerHTML = filtered
    .map(([title, type, severity, source, time]) => {
      const color = severity === "high" ? COLORS.red : COLORS.orange;
      return `
        <div class="news-item">
          <div>
            <strong>${title}</strong>
            <div class="news-meta"><span>${source}</span><span>${time}</span><span>${type}</span></div>
          </div>
          <span class="severity" style="background:${color}">${severity.toUpperCase()}</span>
        </div>
      `;
    })
    .join("");
}

function renderSuppliers() {
  $("supplierTable").innerHTML = `
    <div class="supplier-row header"><span>Company</span><span>Category</span><span>Exposure</span><span>Risk</span></div>
    ${suppliers
      .map(([name, category, exposure, risk]) => {
        const color = getLevelColor(risk);
        return `
          <div class="supplier-row">
            <strong>${name}</strong>
            <span>${category}</span>
            <span>${exposure}</span>
            <span class="risk-pill" style="background:${color}">${risk}</span>
          </div>
        `;
      })
      .join("")}
  `;
}

function renderBrief(data) {
  const topCause = [...data.causes].sort((a, b) => b[2] - a[2])[0];
  $("briefText").value = [
    `[SSAI Daily Risk Brief]`,
    `현재 종합 Risk Score는 ${data.score}점(${data.level})입니다.`,
    ``,
    `핵심 판단: ${data.headline}`,
    `최대 기여 요인: ${topCause[0]}`,
    ``,
    `도메인 점수`,
    `- 시장: ${data.domains.market}`,
    `- 뉴스: ${data.domains.news}`,
    `- 지정학: ${data.domains.geopolitical}`,
    `- 물류: ${data.domains.logistics}`,
    ``,
    `권장 대응: ${Object.values(actionsByType)
      .flat()
      .slice(0, 3)
      .join(" / ")}`,
  ].join("\n");
}

function fitCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(320, Math.floor(rect.width || canvas.clientWidth || 420));
  const height = Math.max(240, Math.floor(Number(canvas.getAttribute("height")) || rect.height || 260));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  canvas.getContext("2d").setTransform(1, 0, 0, 1, 0, 0);
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function setActiveNav(targetId) {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.target === targetId);
  });
}

function goToSection(targetId) {
  const target = $(targetId);
  if (!target) return;
  setActiveNav(targetId);
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function wireNavigation() {
  document.querySelectorAll("[data-target]").forEach((button) => {
    button.addEventListener("click", () => goToSection(button.dataset.target));
  });

  const sections = ["commandCenter", "riskSignals", "supplierMap", "reports"]
    .map((id) => $(id))
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveNav(visible.target.id);
    },
    { root: null, threshold: [0.25, 0.45, 0.65], rootMargin: "-8% 0px -55% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}

function wireEvents() {
  wireNavigation();

  $("scenarioSelect").value = state.scenario;
  $("scenarioSelect").addEventListener("change", (event) => {
    state.scenario = event.target.value;
    render();
    showToast("Scenario applied");
  });

  $("refreshBtn").addEventListener("click", () => {
    render();
    showToast("Signals refreshed");
  });

  $("exportBtn").addEventListener("click", async () => {
    const text = $("briefText").value;
    try {
      await navigator.clipboard.writeText(text);
      showToast("Daily brief copied");
    } catch {
      showToast("Daily brief is ready");
    }
  });

  document.querySelectorAll(".segment").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".segment").forEach((el) => el.classList.remove("active"));
      button.classList.add("active");
      state.range = Number(button.dataset.range);
      render();
    });
  });

  document.querySelectorAll(".filter-chip").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach((el) => el.classList.remove("active"));
      button.classList.add("active");
      state.filter = button.dataset.filter;
      renderNews();
    });
  });

  $("sortCausesBtn").addEventListener("click", () => {
    state.causesDescending = !state.causesDescending;
    renderCauses(scenarios[state.scenario].causes);
  });

  window.addEventListener("resize", () => render());
}

wireEvents();
render();
