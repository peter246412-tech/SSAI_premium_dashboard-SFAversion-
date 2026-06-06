#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "official" / "geo"
OUT.mkdir(parents=True, exist_ok=True)
(OUT / "geo_events.csv").write_text(
    "data_date,country,event_keyword,event_count,severity,source_name,source_url,source_code,collected_at,note\n"
    "2026-02-14/2026-02-21,Iran/Hormuz,\"Iran, Strait of Hormuz, United States, Israel, sanctions, nuclear talks\",,medium,GDELT 2.1 Event API,https://www.gdeltproject.org/,Need query execution,2026-05-28T09:00:00+09:00,Official geo fetch pending. Dashboard marks this as Proxy data and explains indirect impact through oil, shipping, insurance, and FX.\n",
    encoding="utf-8",
)
print("GDELT connector placeholder written; current dashboard marks geo as proxy.")
