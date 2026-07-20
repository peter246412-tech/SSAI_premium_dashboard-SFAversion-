# SSAI: Semiconductor Supply-Chain Early-Warning Dashboard

> A proof-of-concept decision-support dashboard designed to help a mid-sized Korean semiconductor company notice supply-chain risk signals before disruption becomes a crisis.

SSAI stands for **Semiconductor Supply-chain AI Index**. The final prototype focuses on PCB-material procurement at SFA Semicon and combines market, news, geopolitical, logistics, and supplier signals in an explainable risk view.

![SSAI Guardian Dashboard](public/brand/guardian-dashboard.png)

## Why This Project Exists

This project began in a **Design Thinking & Business Model** course in the Social Science & AI program at Hankuk University of Foreign Studies. I was interested in economics and understood the broad importance of semiconductor supply chains, but the project did not begin from a deep technical specialization in semiconductors. It began by listening to people working in the industry.

Our team interviewed practitioners at several mid-sized semiconductor companies. One of the most informative conversations was with an SFA Semicon procurement professional who had graduated from our university. The interviews revealed a practical pain point: many mid-sized firms concentrate on responding after a disruption becomes visible, while structured early-warning capabilities remain limited. Procurement staff must interpret exchange rates, raw-material prices, logistics conditions, news, and geopolitical events scattered across different sources.

That raised the question that drove the project:

> Could fragmented external signals be translated into an explainable warning system that helps procurement teams prepare before disruption occurs?

For an import-dependent semiconductor industry facing stronger U.S.–China protectionism and unpredictable shocks, even an imperfect early signal could support preparatory decisions: reviewing alternative suppliers, increasing safety stock selectively, or monitoring exposed contracts more closely.

## My Role

This was a team project, and I effectively served as the project lead. I proposed the topic, drove the project forward, coordinated the overall direction, participated in practitioner research, defined the dashboard concept, and led the technical implementation of the prototypes.

I used AI coding tools extensively during implementation. The project concept, interview-based problem definition, source discovery, product direction, and iterative decisions came from my own research and leadership; AI assisted substantially with producing and revising code. My role included defining requirements, evaluating generated outputs, connecting technical components, checking whether data claims were supportable, and repeatedly refining the product in response to feedback.

The scoring weights were developed through an exploratory design process with AI assistance rather than learned from historical outcomes or validated by an enterprise risk team. They should therefore be read as transparent **PoC assumptions**, not as a production-grade predictive model.

## How the Project Evolved

The dashboard was not conceived as a finished product. It developed through three stages as the problem became more concrete.

### v1 — Defining the decision problem

The first version focused on structure rather than appearance. It divided supply-chain warning signals into market, news, geopolitical, and logistics domains and explored how normalized domain scores might be combined into one interpretable index.

The premise was not that wars or natural disasters could be predicted directly. It was that weak signals may appear beforehand across prices, reporting, trade policy, shipping conditions, and supplier exposure—and that a procurement team could benefit from seeing those signals together.

### v2 — Making the concept visible

I translated the model into a fast HTML/CSS/JavaScript prototype. This version tested whether a risk score, contributing causes, trend charts, news, and supplier exposure could be understood as one operational view rather than as disconnected analysis.

### v3 — Moving from a generic idea to a specific user

Feedback challenged the project to identify a concrete persona and pilot context because geopolitical and disaster risk is inherently difficult to predict. In response, I narrowed the target to PCB-material procurement at SFA Semicon and rebuilt the application with React, TypeScript, Vite, and Recharts.

The final version does more than improve the interface. It distinguishes what can be supported by public data from what remains a proxy, an explicit assumption, or a requirement for internal enterprise data.

| Stage | Primary question | Output |
| --- | --- | --- |
| v1 | What signals could represent supply-chain risk? | Domain model and scoring concept |
| v2 | Can users read those signals as one decision view? | Static dashboard prototype |
| v3 | What would this look like for a real procurement persona? | SFA Semicon-focused React dashboard |

The earlier versions remain in [`legacy/`](legacy/) because they document the development of the thinking, not because they are alternative production releases. A detailed history is available in [`docs/version-history.md`](docs/version-history.md).

## What the Dashboard Supports

The interface organizes signals around questions a procurement team might ask:

- Is overall external risk rising or falling?
- Which domain is contributing most to the current score?
- Which suppliers, materials, or countries appear most exposed?
- Which values come from official sources, and which are proxies or assumptions?
- What preparatory action could be reviewed—not automatically executed—in response?

The dashboard includes:

- an explainable composite risk score;
- market, news, geopolitical, logistics, and supplier drill-downs;
- trend and radar visualizations;
- supplier exposure and impact tables;
- source and data-fetch status reporting;
- a purchase-decision panel and action board; and
- an executive summary for non-technical users.

The action layer is intentionally advisory. The product does not tell a company to place an order autonomously. It helps a human team decide whether to investigate alternatives, secure backup counterparties, adjust safety stock, or escalate monitoring.

## Data Transparency

One of the most important lessons from building the prototypes was that a polished dashboard can make uncertain numbers look authoritative. The final version therefore labels data according to its evidentiary status:

| Label | Meaning |
| --- | --- |
| **Official data** | Obtained from an official or otherwise credible published source |
| **Proxy data** | A substitute indicator used to infer direction when the desired measure is unavailable |
| **PoC assumption** | A value created explicitly for demonstration or product-design purposes |
| **Need internal data** | A field that would require ERP, contract, purchase-order, lead-time, or other company data |

Failed collection is not silently replaced and presented as official. The interface records states such as `Official data fetch failed / fallback used` or `Need API key` in the data-fetch log.

### Sources represented in the pipeline

- [FRED](https://fred.stlouisfed.org/) — USD/KRW, copper, and Brent crude series
- [Bank of Korea ECOS](https://ecos.bok.or.kr/api/) — import-price indicators
- [Shanghai Shipping Exchange](https://en.sse.net.cn/indices/scfinew.jsp) — SCFI reference
- [Korean public data portal](https://www.data.go.kr/) — port and logistics sources
- [Open DART](https://opendart.fss.or.kr/) — public company disclosures

## Analysis-Date Design

The demonstration is anchored to an analysis date of **February 21, 2026**. Because that date was a Saturday, daily financial and market series use the preceding trading day, February 20, as their reference where appropriate.

The intention is not to expose a later event and then imply that the model predicted it. The dashboard asks a narrower retrospective question: based only on signals that could have been available at the analysis date, what concerns might a procurement team reasonably have chosen to investigate?

## Risk-Scoring Status

The current composite score is a product-design hypothesis. Its transformations, thresholds, and weights are inspectable in [`src/lib/riskScoring.ts`](src/lib/riskScoring.ts), but they have not been calibrated against labeled disruption outcomes or validated inside SFA Semicon.

A production version would require:

1. a clearly defined outcome such as late delivery, price shock, or production interruption;
2. historical internal procurement and supplier data;
3. backtesting and sensitivity analysis;
4. weight calibration or an appropriate statistical/ML model;
5. alert thresholds evaluated with procurement users; and
6. governance for false positives, overrides, and data quality.

This limitation is central to the portfolio: I learned that responsible decision support requires making uncertainty visible rather than using the language of AI to hide assumptions.

## Technology

- React and TypeScript
- Vite
- Recharts
- Python data-collection and transformation scripts
- FRED, ECOS, DART, public logistics, and news-data interfaces
- HTML/CSS/JavaScript for the v2 prototype

## Run Locally

```bash
npm install
cp .env.example .env
npm run fetch:official
npm run build:prewar
npm run dev
```

The application can also be built with:

```bash
npm run build
```

API credentials are optional for reviewing the interface but required for the corresponding live data collectors. Never commit `.env` or real keys.

## Repository Map

```text
src/                    React application and risk-scoring logic
scripts/                Public-data collection and transformation scripts
data/official/          Versioned public/reference data used by the PoC
public/brand/           Product identity and dashboard preview
docs/version-history.md Detailed evolution from v1 to v3
legacy/                 Preserved concept and static prototype
```

## Feedback, Limitations, and Next Steps

Course feedback identified uncertainty in the revenue model. That remains a genuine business limitation: the existence of a procurement pain point does not by itself prove willingness to pay, the correct buyer, or a viable integration model.

The strongest next step would therefore not be another visual redesign. It would be a small pilot with procurement users to test:

- which alerts change an actual preparation decision;
- which internal data is essential rather than merely desirable;
- how early a warning must arrive to be useful;
- what false-positive rate users will tolerate; and
- whether the product should be sold as software, analysis, or an integration service.

## What I Learned

This project changed my understanding of both AI and product development. A broad technological idea became more credible only after interviews exposed a real workflow, feedback forced a specific persona, and the interface began distinguishing evidence from assumptions. Leading that evolution taught me that building a useful system means owning the uncomfortable questions—who needs it, what decision it changes, what the data can support, and where the product is still only a hypothesis.
