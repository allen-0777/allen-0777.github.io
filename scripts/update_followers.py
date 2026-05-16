#!/usr/bin/env python3
"""Fetch Threads follower count and update bio/index.html"""

import os, re, sys, json
import urllib.request
import urllib.parse

TOKEN = os.environ.get('THREADS_ACCESS_TOKEN', '')
if not TOKEN:
    print("Error: THREADS_ACCESS_TOKEN not set", file=sys.stderr)
    sys.exit(1)

# 1. Refresh token (resets the 60-day TTL; harmless to call daily)
try:
    params = urllib.parse.urlencode({
        'grant_type': 'th_refresh_token',
        'access_token': TOKEN,
    })
    with urllib.request.urlopen(f"https://graph.threads.net/refresh_access_token?{params}") as resp:
        refresh_data = json.loads(resp.read())
    new_token = refresh_data.get('access_token', TOKEN)
    expires_in = refresh_data.get('expires_in', '?')
    print(f"Token refreshed (expires_in: {expires_in}s)", file=sys.stderr)
except Exception as e:
    print(f"Warning: token refresh failed ({e}), using existing token", file=sys.stderr)
    new_token = TOKEN

# Output new token so the workflow step can update the GitHub Secret
print(f"NEW_TOKEN={new_token}")

# 2. Fetch follower count
params = urllib.parse.urlencode({
    'fields': 'followers_count',
    'access_token': new_token,
})
with urllib.request.urlopen(f"https://graph.threads.net/v1.0/me?{params}") as resp:
    data = json.loads(resp.read())

count = int(data['followers_count'])
display = f"{count / 1000:.1f}K" if count >= 1000 else str(count)
print(f"Followers: {count} → display: {display}", file=sys.stderr)

# 3. Patch bio/index.html in place
html_path = os.path.join(os.path.dirname(__file__), '..', 'bio', 'index.html')
with open(html_path, encoding='utf-8') as f:
    html = f.read()

updated = re.sub(
    r'(<span class="follower-count" data-target=")[^"]+("[^>]*>)[^<]*(</span>)',
    lambda m: f'{m.group(1)}{count}{m.group(2)}{display}{m.group(3)}',
    html,
)

if updated == html:
    print("No change — follower count unchanged", file=sys.stderr)
else:
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(updated)
    print(f"bio/index.html updated to {display}", file=sys.stderr)
