#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "official" / "news"
OUT.mkdir(parents=True, exist_ok=True)

raw = OUT / "news_raw.csv"
raw.write_text(
    "data_date,supplier,query,title,source_name,source_url,published_at,risk_type,severity,relevance_score,note\n"
    "2026-02-21,Fast Print,Fast Print China PCB customs shipping Iran,PoC scenario: Middle East tension requires China/overseas PCB route monitoring,PoC news scenario data,,2026-02-21,regulation,high,0.78,Official data fetch failed / fallback used.\n"
    "2026-02-20,KINSUS,KINSUS Taiwan PCB USD KRW,PoC scenario: USD/KRW 1445.97 increases overseas IC substrate cost pressure,PoC news scenario data,,2026-02-20,market,high,0.82,Official data fetch failed / fallback used.\n",
    encoding="utf-8",
)
analyzed = OUT / "news_analyzed.csv"
analyzed.write_text(
    "data_date,supplier,query,title,source_name,source_url,published_at,risk_type,severity,relevance_score,note\n"
    "2026-02-21,All suppliers,7-day supplier and Middle East risk news,High 1 / Medium 6 / Low 5 converted into 30pt risk event score,PoC news scenario data,,2026-02-21,mixed,medium,0.75,PoC assumption. Use GDELT/Naver/Google News RSS connector before calling this official.\n",
    encoding="utf-8",
)
print("Official news connector not configured; PoC scenario rows were written and visibly labeled.")
