# SSAI Project Version History

이 문서는 SSAI 공급망 리스크 대시보드 과제가 어떻게 발전했는지 순차적으로 정리합니다.

## 0. Project Goal

SSAI는 `Semiconductor Supply-chain AI Index`의 약자로, 반도체 관련 기업의 공급망 위험을 하나의 설명 가능한 점수와 대시보드로 보여주는 과제입니다.

처음 문제의식은 다음과 같았습니다.

- 공급망 위험은 뉴스, 환율, 원자재 가격, 물류, 지정학 이슈에 흩어져 나타납니다.
- 중견/중소 반도체 관련 기업은 별도 리스크 분석팀이 없는 경우가 많아, 구매 담당자가 여러 정보를 직접 확인해야 합니다.
- 단순히 데이터를 모으는 것보다 "지금 위험이 커지고 있는가", "무엇이 원인인가", "어떤 조치를 해야 하는가"를 빠르게 알려주는 화면이 필요합니다.

따라서 이 프로젝트는 아래 질문에 답하는 방향으로 발전했습니다.

```text
흩어진 공급망 신호를 어떻게 하나의 조기경보 대시보드로 만들 수 있을까?
```

## 1. Overall Development Flow

```text
v1 supply-chain-risk-ai
  문제 정의, 데이터 구조, 리스크 점수화 방식 설계

        ↓

v2 SSAI_dashboard_-cheap-version-
  HTML/CSS/JavaScript 기반 대시보드 프로토타입 구현

        ↓

v3 Korea-SSAI-Semiconductor-Supply-Chain-Risk-Dashboard
  SFA Semicon 맥락을 적용한 React/Vite premium dashboard 완성
```

## 2. v1: supply-chain-risk-ai

### Repository

- Original repository: `peter246412-tech/supply-chain-risk-ai`
- Current location: `legacy/v1-supply-chain-risk-ai/`
- Integrated branch: `v1-supply-chain-risk-ai`
- Tag: `v1-supply-chain-risk-ai`

### Purpose

v1은 실제 화면 구현보다 공급망 리스크를 어떻게 정의하고 계산할지 설계한 단계입니다. 이 버전에서는 반도체 관련 기업의 구매/조달 담당자를 주요 사용자로 설정하고, 공급망 위험을 조기에 파악하기 위한 데이터 구조와 scoring logic을 정리했습니다.

### Main Contents

v1에서 정의한 핵심 데이터 영역은 네 가지입니다.

| Domain | Meaning | Example data |
| --- | --- | --- |
| Market | 수입 비용, 원자재 가격, 환율 압박 | USD/KRW, copper, oil, import price index |
| News | 조기 위험 신호와 사건 흐름 | shortage, export control, regulation, delay |
| Geopolitical | 국가별 구조적 의존도와 규제 위험 | China, Taiwan, USA, Japan |
| Logistics | 실제 물류 흐름의 불안정성 | port volume, container volume, BDI, SCFI |

각 영역은 0-100점의 partial risk score로 변환하고, 최종 점수는 아래 구조로 계산하도록 설계했습니다.

```text
Risk Score = 0.30 * Market Score
           + 0.30 * News Score
           + 0.20 * Geopolitical Score
           + 0.20 * Logistics Score
```

### Development Meaning

이 단계의 의미는 "대시보드에 무엇을 보여줄 것인가"를 정한 것입니다. 단순한 예쁜 화면이 아니라, 시장/뉴스/지정학/물류 신호가 왜 공급망 리스크 점수로 이어지는지 설명할 수 있는 분석 구조를 먼저 만들었습니다.

### Limitations

- 실제 웹 화면은 아직 구현되지 않았습니다.
- 데이터 수집 자동화와 시각화는 설계 수준에 머물렀습니다.
- 특정 기업 사례가 아니라 일반적인 반도체 공급망 리스크 문제로 정의되어 있었습니다.

## 3. v2: SSAI_dashboard_-cheap-version-

### Repository

- Original repository: `peter246412-tech/SSAI_dashboard_-cheap-version-`
- Current location: `legacy/v2-cheap-dashboard/`
- Integrated branch: `v2-cheap-version`
- Tag: `v2-cheap-version`

### Purpose

v2는 v1의 리스크 점수화 아이디어를 실제 웹 화면으로 구현한 첫 번째 프로토타입입니다. HTML, CSS, JavaScript만 사용해 빠르게 실행 가능한 cheap dashboard를 만들었습니다.

### Main Features

v2에서 구현한 주요 기능은 다음과 같습니다.

- 시나리오별 종합 risk score와 KPI 표시
- domain별 위험 점수 표시
- 30일 risk trend chart
- radar chart 기반 signal balance
- 주요 원인 top causes
- risk news feed
- supplier exposure table
- daily brief 복사 기능

### Development Meaning

이 단계에서는 "리스크 점수가 사용자에게 어떻게 읽히는가"를 검증했습니다. v1이 분석 구조였다면, v2는 구매 담당자가 실제로 볼 수 있는 command center 형태의 첫 화면입니다.

특히 시나리오 선택, 위험 점수, 원인, 뉴스, 공급사 노출도를 한 화면에 묶으면서 SSAI가 단순 계산 모델이 아니라 의사결정 보조 도구가 될 수 있다는 방향을 확인했습니다.

### Limitations

- 정적 HTML/CSS/JavaScript 구조라 컴포넌트 재사용과 확장이 어렵습니다.
- 데이터 출처와 PoC 가정값의 구분이 충분히 명확하지 않습니다.
- 특정 기업의 실제 업무 맥락이 약합니다.
- 발표용으로는 좋지만, premium dashboard처럼 세밀한 UI/데이터 구조를 유지하기 어렵습니다.

## 4. v3: Korea-SSAI-Semiconductor-Supply-Chain-Risk-Dashboard

### Repository

- Original repository: `peter246412-tech/Korea-SSAI-Semiconductor-Supply-Chain-Risk-Dashboard`
- Current location: repository root
- Integrated branch: `v3-premium-sfa`
- Tag: `v3-premium-sfa`

### Purpose

v3는 최종 제출용 premium version입니다. SFA Semicon의 PCB 원자재 공급망 리스크를 분석하는 상황으로 범위를 구체화했고, React, TypeScript, Vite, Recharts 기반으로 대시보드를 재구성했습니다.

### Main Improvements from v2

| Area | v2 cheap version | v3 premium SFA version |
| --- | --- | --- |
| Technology | HTML/CSS/JavaScript | React, TypeScript, Vite |
| Structure | single-page static files | component-based dashboard |
| Data handling | scenario/mock 중심 | official/proxy/PoC/internal data 구분 |
| Business context | general semiconductor supply chain | SFA Semicon PCB material supply chain |
| Visualization | basic dashboard charts | domain cards, trend, radar, impact map, decision board |
| Credibility | presentation prototype | 출처, 수집 로그, API key 필요 여부 표시 |

### Main Features

최종 버전에는 다음 기능이 포함되어 있습니다.

- SFA Semicon PCB 원자재 공급망 기준 risk score
- market, news, geopolitical, logistics, supplier domain별 분석
- 공식 데이터 출처와 수집 로그 표시
- proxy data와 PoC assumption 분리 표시
- 구매 의사결정 패널
- supplier impact table
- market insight drawer
- domain drilldown modal
- report sentence box
- 발표용 executive narrative

### Data Transparency

v3에서 가장 중요한 개선점은 데이터 투명성입니다. 대시보드는 모든 값을 같은 신뢰도로 보여주지 않고, 아래 네 가지로 나눕니다.

| Data type | Meaning |
| --- | --- |
| Official data | 공식 기관 또는 신뢰 가능한 기관에서 확인 가능한 데이터 |
| Proxy data | 직접 공식값은 아니지만 위험 방향성을 보기 위한 대체 지표 |
| PoC assumption | 발표용 PoC를 위해 명시적으로 가정한 값 |
| Need internal data | ERP, 구매계약, PO lead time 등 기업 내부 연동이 필요한 값 |

이 구분을 통해 발표자가 "어떤 데이터가 실제로 수집된 값이고, 어떤 값이 PoC 가정인지"를 솔직하게 설명할 수 있습니다.

### Analysis Date Design

최종 대시보드는 `2026-02-21`을 analysis date로 설정했습니다. 이 날짜는 토요일이므로 환율, 유가 등 시장 데이터는 직전 거래일인 `2026-02-20` 값을 reference date로 사용합니다.

이 설계의 목적은 미래 사건을 직접 예언하는 화면이 아니라, 특정 시점에서 공개 데이터와 proxy signal만으로 조기 위험 신호를 볼 수 있었는지 보여주는 것입니다.

## 5. Current Repository Structure

```text
.
├── README.md
├── docs/
│   └── version-history.md
├── legacy/
│   ├── README.md
│   ├── v1-supply-chain-risk-ai/
│   └── v2-cheap-dashboard/
├── data/
│   └── official/
├── scripts/
├── src/
│   ├── components/
│   ├── data/
│   ├── lib/
│   └── main.tsx
├── public/
├── package.json
└── vite.config.ts
```

## 6. How to Read This Repository

과제 발전 과정을 보고 싶다면 아래 순서로 보면 됩니다.

1. `legacy/v1-supply-chain-risk-ai/README.md`
   - 문제 정의, 데이터 구조, scoring logic 확인
2. `legacy/v2-cheap-dashboard/`
   - cheap dashboard prototype 확인
3. `README.md`
   - 최종 premium dashboard 개요 확인
4. `src/`
   - React/TypeScript 기반 최종 구현 확인
5. `data/official/` and `src/data/generated/`
   - 대시보드에 연결된 데이터 구조 확인

## 7. Presentation Narrative

발표에서는 다음 흐름으로 설명할 수 있습니다.

```text
처음에는 반도체 공급망 리스크를 시장, 뉴스, 지정학, 물류 데이터로 나누어
하나의 점수로 계산하는 구조를 설계했습니다.

그 다음 이 구조가 실제 사용자 화면에서 어떻게 보일 수 있는지 확인하기 위해
HTML/CSS/JavaScript 기반 cheap dashboard를 만들었습니다.

마지막으로 SFA Semicon의 PCB 원자재 공급망이라는 구체적인 기업 맥락을 적용하고,
React/TypeScript 기반 premium dashboard로 확장했습니다.

최종 버전은 공식 데이터, proxy data, PoC assumption, 내부 데이터 필요 항목을 구분해
발표용 PoC이면서도 실제 기업 도입 시 어떤 데이터 연동이 필요한지 보여줍니다.
```

## 8. Git Branches and Tags

The integrated repository keeps branch and tag pointers for each stage.

| Name | Meaning |
| --- | --- |
| `v1-supply-chain-risk-ai` | 초기 문제 정의 및 risk scoring 설계 |
| `v2-cheap-version` | HTML/CSS/JavaScript dashboard prototype |
| `v3-premium-sfa` | 최종 premium SFA dashboard |
| `main` | 통합 최종본 |

`main` is the final integrated repository.
