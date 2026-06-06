#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
required = [
    ROOT / "src" / "data" / "generated" / "prewar_signal_summary.json",
    ROOT / "src" / "data" / "generated" / "official_data_sources.json",
    ROOT / "src" / "data" / "generated" / "data_fetch_log.json",
]
missing = [str(path) for path in required if not path.exists()]
if missing:
    raise SystemExit("Missing generated dashboard files: " + ", ".join(missing))
print("Generated dashboard JSON files are present.")
