#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "official" / "suppliers"
OUT.mkdir(parents=True, exist_ok=True)
(OUT / "dart_financials.csv").write_text(
    "data_date,value,indicator,source_name,source_url,source_code,collected_at,note\n"
    "2026-02-21,,Korean supplier disclosures,DART Open API,https://opendart.fss.or.kr/,Need API Key,2026-05-28T09:00:00+09:00,Need DART_API_KEY. Not fetched in current PoC.\n",
    encoding="utf-8",
)
print("DART requires DART_API_KEY and supplier code mapping.")
