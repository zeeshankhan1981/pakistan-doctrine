import requests
import json

# World Bank API for net migration (indicator: SM.POP.NETM)
API_URL = "http://api.worldbank.org/v2/country/PK/indicator/SM.POP.NETM?format=json&per_page=100"


def fetch_worldbank_migration():
    resp = requests.get(API_URL, timeout=10)
    resp.raise_for_status()
    data = resp.json()
    if len(data) < 2:
        print("No data returned.")
        return []
    records = []
    for entry in data[1]:
        year = entry.get('date')
        value = entry.get('value')
        if value is not None:
            records.append({'year': year, 'net_migration': value})
    return records


def main():
    migration_data = fetch_worldbank_migration()
    print(f"Fetched {len(migration_data)} migration records from World Bank:")
    for item in migration_data[:10]:
        print(f"Year: {item['year']} | Net Migration: {item['net_migration']}")
    with open('latest_worldbank_migration.json', 'w', encoding='utf-8') as f:
        json.dump(migration_data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
