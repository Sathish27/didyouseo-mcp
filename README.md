# @didyouseo/mcp

Connect [DidYouSEO](https://didyouseo.com)'s SEO tools to any AI assistant that
supports the Model Context Protocol (MCP).

DidYouSEO runs a **remote MCP server** at `https://didyouseo.com/mcp`. Clients
that support remote MCP servers (Claude, ChatGPT, Cursor) can connect to that
URL directly and sign in with OAuth — no install needed. This package is a small
**stdio bridge** for clients that only support local MCP servers.

## Tools

- `run_seo_audit` — full 30+ point SEO audit of any URL (score, issues, fixes)
- `get_audit_result` — fetch a previous audit by id
- `list_sites` / `register_site` — manage the sites in your account
- `get_site_score` / `get_page_score` — latest SEO scores
- `analyze_meta_tags`, `check_robots_txt`, `validate_schema`, `serp_preview`,
  `check_core_web_vitals`, `check_open_graph`, `check_hreflang` — free SEO tools

Account-scoped tools require signing in with your DidYouSEO account (handled via
OAuth on first use). The free tools work for any URL.

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
