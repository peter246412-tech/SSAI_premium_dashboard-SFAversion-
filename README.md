# SSAI Dashboard

SFA Semicon의 PCB 원자재 공급망 리스크를 분석하는 SSAI(Semiconductor Supply-chain AI Index) PoC 웹앱입니다.

이 저장소는 같은 과제물을 단계적으로 발전시킨 세 저장소를 하나로 통합한 최종 저장소입니다.

## Project Summary

SSAI는 반도체 관련 기업의 구매/조달 담당자가 시장 가격, 뉴스, 지정학, 물류 데이터를 따로따로 확인하지 않고 하나의 조기경보 점수로 공급망 위험을 판단하도록 돕는 대시보드입니다.

프로젝트는 처음부터 완성형 대시보드로 시작한 것이 아니라, 아래 순서로 발전했습니다.

1. 공급망 리스크를 어떻게 점수화할지 정의했습니다.
2. HTML/CSS/JavaScript로 cheap dashboard 프로토타입을 만들었습니다.
3. SFA Semicon의 PCB 원자재 공급망 상황에 맞춘 premium React/Vite 대시보드로 확장했습니다.

## Version History

| Version | Previous repository | Role | Location |
| --- | --- | --- | --- |
| v1 | `supply-chain-risk-ai` | 공급망 리스크 AI 아이디어와 초기 프로젝트 설명 | `legacy/v1-supply-chain-risk-ai/` |
| v2 | `SSAI_dashboard_-cheap-version-` | HTML/CSS/JavaScript 기반 cheap dashboard 프로토타입 | `legacy/v2-cheap-dashboard/` |
| v3 | `SSAI_premium_dashboard-SFAversion-` | SFA Semicon 대상 premium React/Vite dashboard 최종본 | root project |

자세한 발전 과정은 `docs/version-history.md`에 순차적으로 정리되어 있습니다.

## Development Process

### 1. v1: Concept and Risk Scoring Design

초기 버전은 웹앱보다 문제 정의와 분석 구조에 집중했습니다. 공급망 위험은 갑자기 발생하는 것이 아니라 시장 가격, 뉴스, 지정학 이슈, 물류 지표에서 먼저 약한 신호로 나타난다는 가정에서 출발했습니다.

이 단계에서는 market, news, geopolitical, logistics 데이터를 나누고, 각 영역을 0-100점으로 변환한 뒤 가중합으로 최종 risk score를 만드는 구조를 설계했습니다.

### 2. v2: Cheap Dashboard Prototype

두 번째 버전에서는 아이디어를 실제 화면으로 옮겼습니다. HTML, CSS, JavaScript만 사용해 시나리오별 risk score, KPI, domain score, trend chart, news feed, supplier exposure, daily brief를 확인할 수 있는 정적 웹 대시보드를 만들었습니다.

이 단계의 목적은 "공급망 리스크 점수가 실제 사용자 화면에서 어떻게 읽히는가"를 빠르게 검증하는 것이었습니다.

### 3. v3: Premium SFA Dashboard

최종 버전에서는 SFA Semicon의 PCB 원자재 공급망 리스크라는 구체적인 기업/업무 맥락을 적용했습니다. React, TypeScript, Vite, Recharts 기반으로 구조를 재작성했고, 공식 데이터, proxy data, PoC assumption, internal data requirement를 화면에서 분리 표시하도록 개선했습니다.

또한 `2026-02-21` 분석일 기준의 조기경보 운영 대시보드처럼 구성해, 미래 사건을 직접 노출하지 않고 당시 확인 가능한 신호만으로 어떤 구매 의사결정을 할 수 있었는지 보여주도록 설계했습니다.

이 버전은 화면을 **2026-02-21 당일의 조기경보 운영 대시보드**처럼 구성합니다. 즉, 미래 사건 날짜를 화면에 노출하지 않고, 그날 확인 가능한 시장·뉴스·지정학·물류 신호만으로 구매팀이 어떤 판단을 할 수 있었는지 보여줍니다.

## 날짜 규칙

- Analysis Date: `2026-02-21`
- Market Reference Date: `2026-02-20`
- 이유: `2026-02-21`은 토요일이므로 환율, 유가 등 일별 금융/시장 데이터는 직전 거래일인 `2026-02-20` 값을 사용합니다.

## 데이터 구분 원칙

대시보드는 데이터를 아래 네 가지로 구분합니다.

- `Official data`: 공식 기관 또는 신뢰 가능한 기관 데이터
- `Proxy data`: 공식값은 아니지만 리스크 방향성을 보기 위한 대체 지표
- `PoC assumption`: 발표용 PoC를 위해 가정한 값
- `Need internal data`: SFA ERP, 구매계약, PO 리드타임처럼 회사 내부 데이터가 필요한 값

공식 출처가 없는 값은 절대 official data로 표시하지 않습니다. 수집 실패 시에도 조용히 mock 데이터로 숨기지 않고, 화면의 `Data Fetch Log`에 `Official data fetch failed / fallback used` 또는 `Need API Key`로 표시합니다.

## 공식 데이터 출처

- USD/KRW 환율: FRED `DEXKOUS`  
  https://fred.stlouisfed.org/series/DEXKOUS
- Copper Price: FRED `PCOPPUSDM`  
  https://fred.stlouisfed.org/series/PCOPPUSDM
- Brent Crude Oil: FRED `DCOILBRENTEU`  
  https://fred.stlouisfed.org/series/DCOILBRENTEU
- Import Price Index: Bank of Korea ECOS Open API, API key 및 series code 필요  
  https://ecos.bok.or.kr/api/
- SCFI: Shanghai Shipping Exchange, 과거 특정일 자동 수집은 proxy/manual update로 표시  
  https://en.sse.net.cn/indices/scfinew.jsp
- PORT-MIS: data.go.kr / 해양수산부 계열 항만 데이터, API key 필요  
  https://www.data.go.kr/
- DART: 국내 공급처 공시 데이터, API key 필요  
  https://opendart.fss.or.kr/

## 실행

의존성 설치:

```bash
npm install
```

공식/프록시 데이터 파일 생성:

```bash
npm run fetch:official
```

대시보드용 생성 데이터 확인:

```bash
npm run build:prewar
```

개발 서버 실행:

```bash
npm run dev
```

브라우저 접속:

```text
http://127.0.0.1:5173
```

## API Key

실제 key는 코드에 넣지 않습니다. 필요한 key는 `.env.example`에만 이름을 남깁니다.

```text
FRED_API_KEY=
ECOS_API_KEY=
DART_API_KEY=
DATA_GO_KR_API_KEY=
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
```

## 파일 구조

```text
data/official/
  market/
  news/
  geo/
  logistics/
  suppliers/

scripts/
  fetch_fred_market.py
  fetch_ecos_import_price.py
  fetch_news_signals.py
  fetch_gdelt_geo.py
  fetch_logistics_sources.py
  fetch_dart_suppliers.py
  build_prewar_dashboard_data.py

src/data/generated/
  prewar_signal_summary.json
  official_data_sources.json
  data_fetch_log.json

legacy/
  v1-supply-chain-risk-ai/
  v2-cheap-dashboard/

docs/
  version-history.md
```

## 발표용 핵심 문장

“본 대시보드는 미래 사건을 예언하는 모델이 아니라, 2026-02-21 기준 공개 데이터와 명시된 프록시/가정값에서 조기 위험 신호가 보였는지 확인하는 PoC입니다. 공식 데이터와 PoC 가정값을 분리 표시하여, 실제 기업 도입 시 어떤 데이터가 API 또는 ERP 연동으로 대체되어야 하는지도 함께 보여줍니다.”
