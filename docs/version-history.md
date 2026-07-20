# SSAI Project Evolution: From a Broad Idea to a Procurement PoC

This document records how the SSAI supply-chain dashboard developed across three iterations. Earlier versions are retained because they show how interview feedback and prototyping changed both the product and the underlying question.

## The Starting Question

Supply-chain warning signs appear across exchange rates, raw-material prices, news, trade policy, geopolitical events, and logistics data. Mid-sized semiconductor companies may not have a dedicated risk-analysis function, leaving procurement staff to interpret those sources separately.

The project therefore began with a simple product question:

> How might fragmented supply-chain signals become one explainable early-warning view?

## Evolution Overview

| Version | Focus | Technology | Main lesson |
| --- | --- | --- | --- |
| v1 | Problem definition and scoring concept | Documentation and data design | Define what the score represents before designing the screen |
| v2 | First usable visual prototype | HTML, CSS, JavaScript | Test whether causes, trends, and exposure can be read together |
| v3 | SFA Semicon PCB procurement PoC | React, TypeScript, Vite, Python | A credible product needs a specific user, transparent data status, and a defined decision |

## v1: Concept and Scoring Structure

The first version defined four external-signal domains:

| Domain | Intended meaning | Example indicators |
| --- | --- | --- |
| Market | Import-cost and raw-material pressure | USD/KRW, copper, oil, import-price index |
| News | Emerging disruption and policy signals | Shortages, export controls, regulation, delay |
| Geopolitical | Country dependence and policy exposure | China, Taiwan, United States, Japan |
| Logistics | Instability in physical movement | Port volume, container volume, BDI, SCFI |

An initial weighted score was proposed:

```text
Risk Score = 0.30 × Market
           + 0.30 × News
           + 0.20 × Geopolitical
           + 0.20 × Logistics
```

These weights were exploratory PoC assumptions developed with AI assistance. They were not estimated from historical disruptions or validated by a procurement organization. Their value at this stage was to make the product hypothesis explicit and debatable.

The first version did not yet include an application, automated collection, or a specific company persona.

## v2: Static Dashboard Prototype

The second version translated the concept into a lightweight browser interface using HTML, CSS, and JavaScript. It introduced scenario selection, a composite score, domain indicators, a 30-day trend, a radar chart, top causes, a news feed, supplier exposure, and a copyable daily brief.

This iteration tested whether the model could operate as a decision view rather than a collection of charts. It also exposed important weaknesses: the static architecture was difficult to extend, the business user remained too generic, and mock values could look more authoritative than their evidence justified.

The prototype is preserved in [`legacy/v2-cheap-dashboard/`](../legacy/v2-cheap-dashboard/).

## v3: SFA Semicon Procurement Context

Practitioner interviews and course feedback pushed the team to identify a concrete pilot. The final version focuses on PCB-material procurement at SFA Semicon and was rebuilt with React, TypeScript, Vite, Recharts, and Python-based data scripts.

The most important change was not visual polish. It was the separation of data into four evidentiary categories:

| Category | Meaning |
| --- | --- |
| Official data | A value available from an official or credible published source |
| Proxy data | A substitute indicator used when the desired measure is unavailable |
| PoC assumption | A demonstration value or design hypothesis |
| Need internal data | A value requiring ERP, contract, purchase-order, lead-time, or other company data |

The dashboard is anchored to February 21, 2026 and uses the previous trading day for relevant daily market values. It asks what could have been investigated with information available at that point; it does not claim to predict a later event.

## Repository History

| Reference | Meaning |
| --- | --- |
| `legacy/v1-supply-chain-risk-ai/` | Initial problem definition and scoring concept |
| `legacy/v2-cheap-dashboard/` | Static dashboard prototype |
| repository root | Final React/TypeScript procurement PoC |
| `v1-supply-chain-risk-ai` tag/branch | Integrated v1 history |
| `v2-cheap-version` tag/branch | Integrated v2 history |
| `v3-premium-sfa` tag/branch | Final-project milestone |
| `main` | Current portfolio version |

## How to Review the Project

1. Read the root [`README.md`](../README.md) for the problem, personal role, limitations, and current product.
2. Review the v1 documentation to see the initial scoring hypothesis.
3. Open the v2 static prototype to see the first interface experiment.
4. Inspect `src/` and `scripts/` for the final implementation and data workflow.
5. Review the data labels and fetch log to distinguish evidence from assumptions.

The sequence is the central portfolio story: a broad “AI for supply-chain risk” idea became more grounded as real users, concrete decisions, technical constraints, and data credibility were taken seriously.
