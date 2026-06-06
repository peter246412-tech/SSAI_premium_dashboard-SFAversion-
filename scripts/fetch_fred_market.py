#!/usr/bin/env python3
from __future__ import annotations

import csv
import datetime as dt
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "official" / "market"
COLLECTED_AT = dt.datetime.now(dt.timezone(dt.timedelta(hours=9))).isoformat(timespec="seconds")


def fetch_fred_value(series_id: str, target_date: str) -> str:
    url = f"https://fred.stlouisfed.org/graph/fredgraph.csv?id={series_id}"
    with urllib.request.urlopen(url, timeout=20) as response:
      rows = response.read().decode("utf-8").splitlines()
    reader = csv.DictReader(rows)
    for row in reader:
        if row["observation_date"] == target_date and row[series_id] not in {"", "."}:
            return row[series_id]
    raise RuntimeError(f"No FRED value for {series_id} on {target_date}")


def write_market_csv(filename: str, row: dict[str, str]) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / filename
    with path.open("w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(
            file,
            fieldnames=[
                "data_date",
                "value",
                "variable_name",
                "unit",
                "source_name",
                "source_url",
                "source_code",
                "collected_at",
                "note",
            ],
        )
        writer.writeheader()
        writer.writerow(row)


def main() -> None:
    rows = [
        (
            "usdkrw.csv",
            "DEXKOUS",
            "2026-02-20",
            "USD/KRW spot exchange rate",
            "KRW per 1 USD",
            "FRED - Federal Reserve Bank of St. Louis",
            "https://fred.stlouisfed.org/series/DEXKOUS",
            "Official data. 2026-02-21 was Saturday, so previous trading day 2026-02-20 is used.",
        ),
        (
            "copper.csv",
            "PCOPPUSDM",
            "2026-02-01",
            "Global price of copper",
            "USD per metric ton",
            "FRED - Federal Reserve Bank of St. Louis / IMF Primary Commodity Prices",
            "https://fred.stlouisfed.org/series/PCOPPUSDM",
            "Official data. Monthly series, so 2026-02 value is used.",
        ),
        (
            "brent.csv",
            "DCOILBRENTEU",
            "2026-02-20",
            "Brent crude oil spot price",
            "USD per barrel",
            "FRED - Federal Reserve Bank of St. Louis / U.S. Energy Information Administration",
            "https://fred.stlouisfed.org/series/DCOILBRENTEU",
            "Official data. Used as auxiliary logistics and freight cost pressure signal.",
        ),
    ]

    for filename, code, data_date, variable, unit, source, url, note in rows:
        value = fetch_fred_value(code, data_date)
        display_date = "2026-02" if code == "PCOPPUSDM" else data_date
        write_market_csv(
            filename,
            {
                "data_date": display_date,
                "value": value,
                "variable_name": variable,
                "unit": unit,
                "source_name": source,
                "source_url": url,
                "source_code": code,
                "collected_at": COLLECTED_AT,
                "note": note,
            },
        )


if __name__ == "__main__":
    main()
