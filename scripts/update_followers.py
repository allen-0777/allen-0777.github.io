#!/usr/bin/env python3
"""Fetch Threads follower count and update bio/index.html"""

import os, re, sys, json
import urllib.request
import urllib.error
import urllib.parse

def api_get(url):
    """GET url, return parsed JSON. Prints full error body on failure."""
    try:
        with urllib.request.urlopen(url) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        print(f"HTTP {e.code} from {url}\n{body}", file=sys.stderr)
        raise
    except urllib.error.URLError as e:
        print(f"URL error: {e.reason}", file=sys.stderr)
        raise

TOKEN = os.environ.get('THREADS_ACCESS_TOKEN', '')
if not TOKEN:
    print("Error: THREADS_ACCESS_TOKEN not set", file=sys.stderr)
    sys.exit(1)

# 1. Refresh token (resets the 60-day TTL)
try:
    params = urllib.parse.urlencode({
        'grant_type': 'th_refresh_token',
        'access_token': TOKEN,
    })
    data = api_get(f"https://graph.threads.net/refresh_access_token?{params}")
    new_token = data.get('access_token', TOKEN)
    print(f"Token refreshed (expires_in: {data.get('expires_in', '?')}s)", file=sys.stderr)
except Exception as e:
    print(f"Token refresh failed ({e}), using existing token", file=sys.stderr)
    new_token = TOKEN

# Output new token for the workflow secret-update step
print(f"NEW_TOKEN={new_token}")

# 2. Fetch follower count
params = urllib.parse.urlencode({
    'fields': 'followers_count',
    'access_token': new_token,
})
data = api_get(f"https://graph.threads.net/v1.0/me?{params}")

count = int(data['followers_count'])
display = f"{count / 1000:.1f}K" if count >= 1000 else str(count)
print(f"Followers: {count} ({display})", file=sys.stderr)

# 3. Patch bio/index.html
html_path = os.path.join(os.path.dirname(__file__), '..', 'bio', 'index.html')
with open(html_path, encoding='utf-8') as f:
    html = f.read()

updated = re.sub(
    r'(<span class="follower-count" data-target=")[^"]+("[^>]*>)[^<]*(</span>)',
    lambda m: f'{m.group(1)}{count}{m.group(2)}{display}{m.group(3)}',
    html,
)

if updated == html:
    print("No change — count unchanged", file=sys.stderr)
else:
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(updated)
    print(f"bio/index.html updated → {display}", file=sys.stderr)
