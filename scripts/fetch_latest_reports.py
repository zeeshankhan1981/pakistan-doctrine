import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

# Example: Fetch latest Amnesty International Pakistan news headlines
AMNESTY_URL = "https://www.amnesty.org/en/location/asia-and-the-pacific/south-asia/pakistan/"


def fetch_amnesty_headlines():
    resp = requests.get(AMNESTY_URL, timeout=10)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, 'html.parser')
    articles = []
    for article in soup.select('article'):
        title_tag = article.find('a')
        date_tag = article.find('time')
        if not title_tag or not date_tag:
            continue
        title = title_tag.text.strip()
        url = title_tag['href']
        date_str = date_tag.get('datetime', '')
        try:
            date = datetime.fromisoformat(date_str[:10]).strftime('%Y-%m-%d')
        except Exception:
            date = date_str[:10]
        articles.append({
            'title': title,
            'url': url if url.startswith('http') else f'https://www.amnesty.org{url}',
            'date': date
        })
    return articles


def main():
    headlines = fetch_amnesty_headlines()
    print(f"Fetched {len(headlines)} latest Amnesty International Pakistan headlines:")
    for article in headlines[:10]:
        print(f"- {article['date']}: {article['title']} ({article['url']})")
    # Optionally, save to a file for further review
    with open('latest_amnesty_headlines.json', 'w', encoding='utf-8') as f:
        json.dump(headlines, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
