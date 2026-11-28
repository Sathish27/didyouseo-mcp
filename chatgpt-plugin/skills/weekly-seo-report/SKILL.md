---
name: weekly-seo-report
description: Write a weekly SEO status report for one site from DidYouSEO audit scores and Google Search Console data. Use when the user asks how their site did this week, wants a weekly or monthly SEO update, or asks what changed in search traffic. Requires the DidYouSEO MCP connector with Search Console connected.
---

# Weekly SEO report

Produce a one-screen report a founder or client can read in two minutes.

## Tools

- `list_sites` - find the site and its id.
- `get_site_score` - latest technical score and top issues.
- `get_search_console_changes` (website, days=7) - clicks and position changes against the previous 7 days.
- `get_search_console_keywords` (website, days=28) - top queries for context.
- `get_ga4_organic_traffic` (website, days=7) - organic sessions, conversions and AI-assistant visits, if Google Analytics is connected.

## Steps

1. Call `list_sites`. If the user has several sites and didn't name one, ask which.
2. Call `get_site_score`, `get_search_console_changes` with `days: 7`, and `get_search_console_keywords` with `days: 28`. Also call `get_ga4_organic_traffic` with `days: 7`; if it says Google Analytics isn't connected, skip that part.
3. If Search Console isn't connected, write the technical half only and tell the user to connect it under Integrations in DidYouSEO.
4. Explain every number in plain language. Don't report a change without saying what probably caused it or what to do about it. If you don't know the cause, say so.
5. Search Console data runs about three days behind. Mention it once at the bottom.

## Output format

```
<site> - week of <date>

Headline: <one sentence: better, worse or flat, and the main reason>

Search
- Clicks: <n> (<+/- vs last week>)
- Organic visits and conversions (GA4, if connected): <n> visits, <n> key events (<change>)
- Visits from AI assistants (GA4, if connected): <n> (<change>)
- Biggest gain: <query or page> (<change>)
- Biggest drop: <query or page> (<change>) - <likely cause>

Technical health: <score>/100
- <top 1-3 issues still open>

Next week
1. <one concrete action>
2. <one concrete action>
```

No tables wider than three columns. No jargon without a short explanation.

## Save the report

After you show the report, offer to save it in the user's DidYouSEO account with `save_report` (title like "Weekly SEO report: <site>, <date>", the report as Markdown, and the `site_id`). Saved reports are private and show under Reports in the DidYouSEO dashboard. Next week, call `list_reports` and `get_report` to read last week's report and say what changed since then. Skip this if the tools aren't available.

## Limits

- If a tool says "The DidYouSEO trial on this account has ended", stop calling DidYouSEO tools, tell the user their DidYouSEO trial has ended, and finish with the data you have.
- Don't mention prices or upgrades. If the user asks how to get more, say plan details are on didyouseo.com.
