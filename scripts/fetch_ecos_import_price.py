#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "official" / "market" / "import_price_index.csv"

OUT.write_text(
    "data_date,value,variable_name,unit,source_name,source_url,source_code,collected_at,note\n"
    "2026-02,,Electronic/electrical import price index,index,Bank of Korea ECOS Open API,https://ecos.bok.or.kr/api/,Need series code,2026-05-28T09:00:00+09:00,Need API Key / Need series code. Not displayed as official data; dashboard uses PoC assumption until ECOS code is confirmed.\n",
    encoding="utf-8",
)
print("ECOS import price index requires ECOS_API_KEY and series code.")
