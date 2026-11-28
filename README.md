# @didyouseo/mcp

[![Sathish27/didyouseo-mcp MCP server](https://glama.ai/mcp/servers/Sathish27/didyouseo-mcp/badges/score.svg)](https://glama.ai/mcp/servers/Sathish27/didyouseo-mcp)
[![mcptry](https://mcptry.com/badge/com.didyouseo/mcp)](https://mcptry.com/servers/com.didyouseo/mcp)

Connect [DidYouSEO](https://didyouseo.com)'s SEO tools to any AI assistant that
supports the Model Context Protocol (MCP).

DidYouSEO runs a **remote MCP server** at `https://didyouseo.com/mcp`. Clients
that support remote MCP servers (Claude, ChatGPT, Cursor) can connect to that
URL directly and sign in with OAuth — no install needed. This package is a small
**stdio bridge** for clients that only support local MCP servers.

## Tools

31 tools in seven groups.

**SEO audits and your sites** (sign-in required)
- `run_seo_audit` — full SEO audit of any URL: score, issues and fixes
- `get_audit_result` — fetch a previous audit by id
- `list_sites` / `register_site` — manage the sites in your account
- `get_site_score` / `get_page_score` — latest SEO scores for a site or page

**Google Search Console** (connect Search Console in DidYouSEO)
- `get_search_console_keywords` — real queries: clicks, impressions, CTR and position
- `get_search_console_changes` — biggest click gainers and losers between two periods
- `get_search_console_cannibalization` — queries where several of your pages compete
- `get_search_console_pages` — your top pages by clicks or impressions
- `get_search_console_page_queries` — the searches one page shows up for

**Google Analytics 4** (connect GA4 in DidYouSEO)
- `get_ga4_organic_traffic` — organic sessions, engagement, key events, top landing
  pages and visits from AI assistants (ChatGPT, Perplexity, Gemini, Claude, Copilot)

**ChatGPT Ads** (add an Ads Manager API key in DidYouSEO; read-only)
- `list_chatgpt_ad_accounts` — every connected ad account with its results
- `get_chatgpt_ads_performance` — spend, impressions, clicks, CTR, CPC and conversions for one account
- `query_chatgpt_ads` — custom reports by campaign, ad group, ad, country, device, platform or product

**Keywords and backlinks** (1 DidYouSEO AI credit per call; failed lookups are refunded)
- `get_keyword_data` — search volume, difficulty, CPC and intent for up to 10 keywords
- `get_keyword_ideas` — up to 50 keyword ideas for a seed phrase, sorted by volume
- `get_backlink_summary` — domain rank, backlinks and referring domains for any domain

**Saved reports and IndexNow** (sign-in required; free, no credits)
- `save_report` / `list_reports` / `get_report` — save research as a Markdown report in your
  account, list saved reports and read one back
- `set_report_sharing` — turn a report's public link on or off
- `submit_to_indexnow` — tell Bing and other IndexNow search engines about new and changed
  pages on your site (needs a small key file on the site one time)

**Free checks for any URL**
- `run_pagespeed_insights` — Lighthouse scores, real-user Core Web Vitals and speed fixes
- `analyze_meta_tags`, `check_robots_txt`, `validate_schema` (checks Google's rich
  result requirements), `serp_preview`, `check_core_web_vitals`, `check_open_graph`,
  `check_hreflang` (validates codes and return links)

Every tool runs after you sign in with your DidYouSEO account (OAuth, on first use).
New accounts get a 7-day free trial with every tool and the full Search Console
and GA4 data; after that the tools need a paid plan. Keyword and backlink lookups
use the AI credits that plans include each month. See https://didyouseo.com/pricing.

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
