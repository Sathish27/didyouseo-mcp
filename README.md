# @didyouseo/mcp

Connect [DidYouSEO](https://didyouseo.com)'s SEO tools to any AI assistant that
supports the Model Context Protocol (MCP).

DidYouSEO runs a **remote MCP server** at `https://didyouseo.com/mcp`. Clients
that support remote MCP servers (Claude, ChatGPT, Cursor) can connect to that
URL directly and sign in with OAuth — no install needed. This package is a small
**stdio bridge** for clients that only support local MCP servers.

## Tools

21 tools in five groups.

**SEO audits and your sites** (sign-in required)
- `run_seo_audit` — full SEO audit of any URL: score, issues and fixes
- `get_audit_result` — fetch a previous audit by id
- `list_sites` / `register_site` — manage the sites in your account
- `get_site_score` / `get_page_score` — latest SEO scores for a site or page

**Google Search Console** (connect Search Console in DidYouSEO)
- `get_search_console_keywords` — real queries: clicks, impressions, CTR and position
- `get_search_console_changes` — biggest click gainers and losers between two periods
- `get_search_console_cannibalization` — queries where several of your pages compete

**Google Analytics 4** (connect GA4 in DidYouSEO)
- `get_ga4_organic_traffic` — organic sessions, engagement, key events, top landing
  pages and visits from AI assistants (ChatGPT, Perplexity, Gemini, Claude, Copilot)

**Keywords and backlinks** (1 DidYouSEO AI credit per call; failed lookups are refunded)
- `get_keyword_data` — search volume, difficulty, CPC and intent for up to 10 keywords
- `get_keyword_ideas` — up to 50 keyword ideas for a seed phrase, sorted by volume
- `get_backlink_summary` — domain rank, backlinks and referring domains for any domain

**Free checks for any URL**
- `run_pagespeed_insights` — Lighthouse scores, real-user Core Web Vitals and speed fixes
- `analyze_meta_tags`, `check_robots_txt`, `validate_schema` (checks Google's rich
  result requirements), `serp_preview`, `check_core_web_vitals`, `check_open_graph`,
  `check_hreflang` (validates codes and return links)

Every tool runs after you sign in with your DidYouSEO account (OAuth, on first use).
A free account can use every tool: Search Console and GA4 results are a short
preview on the free plan, and keyword and backlink lookups use the AI credits that
paid plans include each month. See https://didyouseo.com/pricing.

## Use a remote connector (recommended)

If your client supports remote MCP servers, just add the URL:

```
https://didyouseo.com/mcp
```

You'll be prompted to sign in with DidYouSEO the first time.

## Use the stdio bridge

For clients that only support local (stdio) servers, add this to the client's
MCP config:

```json
{
  "mcpServers": {
    "didyouseo": {
      "command": "npx",
      "args": ["-y", "@didyouseo/mcp"]
    }
  }
}
```

A browser window opens for sign-in on first run.

### Local development

Point the bridge at a local DidYouSEO instance:

```bash
DIDYOUSEO_MCP_URL=http://localhost:3000/mcp npx @didyouseo/mcp
```

## License

MIT
