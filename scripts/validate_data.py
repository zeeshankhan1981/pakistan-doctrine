import json
import os
from glob import glob
from datetime import datetime

DATA_DIR = os.path.join(os.path.dirname(__file__), '../data')
REQUIRED_FIELDS = ['date', 'title', 'category', 'sources']


def validate_json_file(filepath):
    errors = []
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Violations: nested structure
    if 'regions' in data:
        seen = set()
        for region, region_data in data['regions'].items():
            for case in region_data.get('cases', []):
                # Check required fields
                for field in REQUIRED_FIELDS:
                    if field not in case:
                        errors.append(f"Missing '{field}' in {filepath} (region: {region}, title: {case.get('title', 'N/A')})")
                # Check date format
                try:
                    datetime.strptime(case.get('date', ''), '%Y-%m-%d')
                except Exception:
                    errors.append(f"Invalid date in {filepath} (region: {region}, title: {case.get('title', 'N/A')}): {case.get('date', '')}")
                # Check sources is non-empty list
                if not case.get('sources') or not isinstance(case['sources'], list):
                    errors.append(f"Missing or invalid sources in {filepath} (region: {region}, title: {case.get('title', 'N/A')})")
                # Duplicate detection
                key = (case.get('date', ''), case.get('title', ''))
                if key in seen:
                    errors.append(f"Duplicate event in {filepath} (region: {region}, title: {case.get('title', 'N/A')}, date: {case.get('date', '')})")
                seen.add(key)
    else:
        # Flat structure (e.g., protests, terrorism, etc.)
        for key, value in data.items():
            if isinstance(value, list) and key != 'sources':
                if len(value) != len(data['years']):
                    errors.append(f"Length mismatch in {filepath}: {key} vs years")
        # Check sources
        if not data.get('sources') or not isinstance(data['sources'], list):
            errors.append(f"Missing or invalid sources in {filepath}")

    return errors


def main():
    json_files = glob(os.path.join(DATA_DIR, '*.json'))
    all_errors = []
    for jf in json_files:
        errs = validate_json_file(jf)
        if errs:
            all_errors.extend(errs)
    if all_errors:
        print("Validation errors found:")
        for err in all_errors:
            print("-", err)
    else:
        print("All data files passed validation.")

if __name__ == "__main__":
    main()
