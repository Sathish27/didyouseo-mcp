---
name: seo-audit-fix-plan
description: Audit a page or site with DidYouSEO and turn the results into a ranked fix plan with exact changes. Use when the user asks to audit a URL, find SEO problems, check why a page isn't ranking technically, or wants a prioritized SEO to-do list. Requires the DidYouSEO MCP connector.
---

# SEO audit to fix plan

Turn a DidYouSEO audit into a short, ordered list of fixes the user can act on today.

## Tools

- `run_seo_audit` (url) - runs a 40+ point audit and returns score, issues and how to fix each one.
- `list_sites`, `get_site_score` - when the user means a whole site already in their account.
- `analyze_meta_tags`, `validate_schema` - to draft exact replacement tags or markup.

## Steps

1. Work out the target. A single URL means `run_seo_audit`. A site name ("my site", a domain) means `list_sites` first, then `get_site_score` for the latest crawl. If the site isn't in the account, audit its homepage with `run_seo_audit` and say so.
2. Group issues by severity: critical first, then warnings. Ignore passed checks.
3. Rank inside each group by effort and impact:
   - Indexing blockers first (noindex, robots blocks, broken canonicals, 4xx/5xx).
   - Then anything shown in search results (title, meta description, structured data).
   - Then speed and Core Web Vitals.
   - Then accessibility and best-practice items.
4. For every fix, give the exact change. Draft the new title or description, the corrected JSON-LD, or the header to add. Use `analyze_meta_tags` or `validate_schema` if you need the current values.
5. Do not invent issues the tools didn't report. If something looks wrong but wasn't flagged, say "worth checking" and keep it separate.

## Output format

```
Score: <n>/100 for <url>

Fix first (critical)
1. <issue> - why it matters in one line
   Change: <exact change>

Fix next (warnings)
...

Already fine: <one line naming the main areas that passed>
```

Keep it under 15 items. If there are more, show the top 15 and say how many were left out.

## Save the plan

After you show the fix plan, offer to save it with `save_report` (title like "SEO fix plan: <page or site>", the plan as Markdown, and the `site_id` if the site is registered), so the user can tick items off later from the dashboard. When the fixes are live, offer to call `submit_to_indexnow` with the changed URLs. Skip this if the tools aren't available.

## Limits

- If a tool says "The DidYouSEO trial on this account has ended", stop calling DidYouSEO tools, tell the user their DidYouSEO trial has ended, and finish with the data you have.
- Don't mention prices or upgrades. If the user asks how to get more, say plan details are on didyouseo.com.
