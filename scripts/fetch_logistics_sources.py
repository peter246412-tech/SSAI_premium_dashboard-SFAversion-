#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "official" / "logistics"
OUT.mkdir(parents=True, exist_ok=True)
(OUT / "scfi.csv").write_text(
    "data_date,value,indicator,source_name,source_url,source_code,collected_at,note\n"
    "2026-02-21,,Shanghai Containerized Freight Index,Shanghai Shipping Exchange,https://en.sse.net.cn/indices/scfinew.jsp,SCFI,2026-05-28T09:00:00+09:00,Proxy data / manual update needed. Historical target date was not automatically fetched, so dashboard does not label the +9.8% value as official.\n",
    encoding="utf-8",
)
(OUT / "portmis.csv").write_text(
    "data_date,value,indicator,source_name,source_url,source_code,collected_at,note\n"
    "2026-02-21,,Port entry/departure and cargo volume,Ministry of Oceans and Fisheries / data.go.kr,https://www.data.go.kr/,PORT-MIS,2026-05-28T09:00:00+09:00,Need API Key. Indirect logistics signal only; not directly tied to SFA PCB without supplier route mapping.\n",
    encoding="utf-8",
)
print("Logistics proxy/API-key-needed rows written.")
