---
name: striking-distance-keywords
description: Find queries ranking in positions 8-20 in Google Search Console and plan the on-page changes most likely to move them onto page one. Use when the user asks for quick SEO wins, keywords close to page one, low-hanging fruit, or what to optimize next. Requires the DidYouSEO MCP connector with Search Console connected.
---

# Striking distance keywords

Find the queries Google already considers relevant but ranks just off the top, and say exactly how to push each one.

## Tools

- `get_search_console_keywords` (website, days=90, min_position, max_position) - queries with clicks, impressions, CTR and average position, filtered to a position range.
- `get_search_console_pages` (website, days=90, sort_by, limit) - pages with clicks, impressions, CTR and average position.
- `get_search_console_page_queries` (website, page, days=90, min_position, max_position) - the queries one page shows up for.
- `analyze_meta_tags` (url) - current title, description and headings of the ranking page.
- `serp_preview` (url) - how the snippet looks now.

## Steps

1. Call `get_search_console_keywords` with `days: 90`, `min_position: 8` and `max_position: 20`.
2. Drop any with fewer than 100 impressions in the window; they won't bring meaningful traffic even at position 3.
3. Drop branded queries (containing the site's brand name). Those rank on their own.
4. Rank the rest by impressions, highest first. Take the top 10.
5. The keyword tool doesn't say which page ranks for each query. Call `get_search_console_pages` with `sort_by: "impressions"` and `limit: 25`. Then call `get_search_console_page_queries` with `min_position: 8` and `max_position: 20` for the pages that match the top 5 queries' topics. The page that lists the query is the ranking page. If two pages list it, note the split and pick the one with the better position. Call `analyze_meta_tags` on each ranking page.
6. For each, recommend at most three changes from this list, in this order of preference:
   - put the exact query in the title, near the front
   - answer the query in the first 100 words
   - add the section that competing pages cover and this page doesn't
   - add 3-5 internal links to it with descriptive anchor text
   - refresh outdated facts, then the date
7. Never recommend creating a new page for a query an existing page already ranks for. That splits the signal.

## Output format

A table of the top 10: query, position, impressions, page. Then, for the top 5, the specific changes with a drafted title where relevant.

End with: "Re-check in 4 weeks. Compare the 4 weeks after the change with the 4 weeks before, for the same query."

## Limits

- If a tool says "The DidYouSEO trial on this account has ended", stop calling DidYouSEO tools, tell the user their DidYouSEO trial has ended, and finish with the data you have.
- Don't mention prices or upgrades. If the user asks how to get more, say plan details are on didyouseo.com.
