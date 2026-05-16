#!/usr/bin/env python3
"""Fetch Threads + Instagram follower counts and update bio/index.html"""

import os, re, sys, json, datetime
import urllib.request
import urllib.error
import urllib.parse

def api_get(url):
    try:
        with urllib.request.urlopen(url) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        print(f"HTTP {e.code} → {body}", file=sys.stderr)
        raise

def patch_html(html, css_class, count):
    display = f"{count / 1000:.1f}K" if count >= 1000 else str(count)
    pattern = rf'(<span class="{css_class}" data-target=")[^"]+("[^>]*>)[^<]*(</span>)'
    updated = re.sub(
        pattern,
        lambda m: f'{m.group(1)}{count}{m.group(2)}{display}{m.group(3)}',
        html,
    )
    return updated, display

# ── Threads ──────────────────────────────────────────────────────────────────

THREADS_TOKEN = os.environ.get('THREADS_ACCESS_TOKEN', '')
if not THREADS_TOKEN:
    print("Error: THREADS_ACCESS_TOKEN not set", file=sys.stderr)
    sys.exit(1)

# Refresh Threads token
try:
    params = urllib.parse.urlencode({'grant_type': 'th_refresh_token', 'access_token': THREADS_TOKEN})
    data = api_get(f"https://graph.threads.net/refresh_access_token?{params}")
    new_threads_token = data.get('access_token', THREADS_TOKEN)
    print(f"Threads token refreshed (expires_in: {data.get('expires_in')}s)", file=sys.stderr)
except Exception as e:
    print(f"Threads token refresh failed ({e})", file=sys.stderr)
    new_threads_token = THREADS_TOKEN

print(f"NEW_TOKEN={new_threads_token}")

# Fetch Threads followers via User Insights API
now   = datetime.datetime.now(datetime.timezone.utc)
since = int((now - datetime.timedelta(days=2)).timestamp())
until = int(now.timestamp())
params = urllib.parse.urlencode({
    'metric': 'followers_count', 'period': 'day',
    'since': since, 'until': until,
    'access_token': new_threads_token,
})
data = api_get(f"https://graph.threads.net/v1.0/me/threads_insights?{params}")
threads_count = int(data['data'][0]['total_value']['value'])
print(f"Threads followers: {threads_count}", file=sys.stderr)

# ── Instagram ────────────────────────────────────────────────────────────────

IG_TOKEN = os.environ.get('INSTAGRAM_ACCESS_TOKEN', '')
ig_count = None

if IG_TOKEN:
    try:
        # Refresh Instagram token (long-lived tokens can be refreshed)
        params = urllib.parse.urlencode({'grant_type': 'ig_refresh_token', 'access_token': IG_TOKEN})
        data = api_get(f"https://graph.instagram.com/refresh_access_token?{params}")
        new_ig_token = data.get('access_token', IG_TOKEN)
        print(f"Instagram token refreshed (expires_in: {data.get('expires_in')}s)", file=sys.stderr)
        print(f"NEW_IG_TOKEN={new_ig_token}")
    except Exception as e:
        print(f"Instagram token refresh failed ({e}), using existing", file=sys.stderr)
        new_ig_token = IG_TOKEN

    try:
        params = urllib.parse.urlencode({'fields': 'followers_count', 'access_token': new_ig_token})
        data = api_get(f"https://graph.instagram.com/v21.0/me?{params}")
        ig_count = int(data['followers_count'])
        print(f"Instagram followers: {ig_count}", file=sys.stderr)
    except Exception as e:
        print(f"Instagram followers fetch failed ({e})", file=sys.stderr)
else:
    print("INSTAGRAM_ACCESS_TOKEN not set — skipping IG", file=sys.stderr)

# ── Update bio/index.html ─────────────────────────────────────────────────────

html_path = os.path.join(os.path.dirname(__file__), '..', 'bio', 'index.html')
with open(html_path, encoding='utf-8') as f:
    html = f.read()

html, threads_display = patch_html(html, 'follower-count', threads_count)

if ig_count is not None:
    html, ig_display = patch_html(html, 'ig-follower-count', ig_count)
    print(f"Updated: Threads={threads_display} / IG={ig_display}", file=sys.stderr)
else:
    print(f"Updated: Threads={threads_display} / IG=skipped", file=sys.stderr)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
