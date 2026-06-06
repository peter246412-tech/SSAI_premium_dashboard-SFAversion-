# SSAI Project Version History

이 문서는 SSAI 공급망 리스크 대시보드 과제가 어떻게 발전했는지 정리합니다.

## Overall Flow

```text
v1 supply-chain-risk-ai
  -> v2 SSAI_dashboard_-cheap-version-
  -> v3 SSAI_premium_dashboard-SFAversion-
```

## v1: supply-chain-risk-ai

- Original repository: `peter246412-tech/supply-chain-risk-ai`
- Current location: `legacy/v1-supply-chain-risk-ai/`
- Purpose: AI-based supply chain risk prediction project concept.
- Role in the assignment: 초기 아이디어, 문제 정의, 공급망 리스크 예측 방향성 정리.

## v2: SSAI_dashboard_-cheap-version-

- Original repository: `peter246412-tech/SSAI_dashboard_-cheap-version-`
- Current location: `legacy/v2-cheap-dashboard/`
- Purpose: Static HTML/CSS/JavaScript dashboard prototype.
- Role in the assignment: 공급망 리스크를 화면으로 보여주는 첫 웹 대시보드 버전.

## v3: SSAI_premium_dashboard-SFAversion-

- Original repository: `peter246412-tech/SSAI_premium_dashboard-SFAversion-`
- Current location: repository root.
- Purpose: React/Vite premium dashboard for SFA Semicon PCB material supply-chain risk.
- Role in the assignment: 발표 및 최종 제출용 버전. 공식 데이터, proxy data, PoC assumption, internal data requirement를 분리해 조기경보 운영 대시보드 형태로 구성.

## Repository Organization

```text
.
├── legacy/
│   ├── v1-supply-chain-risk-ai/
│   └── v2-cheap-dashboard/
├── docs/
│   └── version-history.md
├── src/
├── scripts/
├── data/
└── README.md
```

## Git Branches

The integrated repository also keeps branch pointers for each stage:

- `v1-supply-chain-risk-ai`
- `v2-cheap-version`
- `v3-premium-sfa`
- `main`

`main` is the final premium SFA dashboard.
