#!/usr/bin/env node
/**
 * @didyouseo/mcp — stdio bridge to the DidYouSEO remote MCP server.
 *
 * MCP clients that only speak local stdio (e.g. Claude Desktop) use this to
 * reach the remote server at https://didyouseo.com/mcp. It runs the pinned
 * `mcp-remote` dependency, which performs the OAuth 2.1 browser sign-in and
 * proxies the Streamable HTTP transport over stdio.
 *
 * Usage (in an MCP client config):
 *   command: "npx"
 *   args: ["-y", "@didyouseo/mcp"]
 *
 * Override the endpoint for local development:
 *   DIDYOUSEO_MCP_URL=http://localhost:3000/mcp npx @didyouseo/mcp
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const url = process.env.DIDYOUSEO_MCP_URL || "https://didyouseo.com/mcp";
const passthrough = process.argv.slice(2);

// Run the mcp-remote version pinned in package.json rather than fetching
// @latest on every start: faster, and an upstream release can't break us.
const require = createRequire(import.meta.url);
const pkgPath = require.resolve("mcp-remote/package.json");
const proxy = join(dirname(pkgPath), require(pkgPath).bin["mcp-remote"]);

const child = spawn(process.execPath, [proxy, url, ...passthrough], {
  stdio: "inherit",
});

child.on("error", (err) => {
  console.error(`[didyouseo-mcp] failed to start bridge: ${err.message}`);
  process.exit(1);
});
child.on("exit", (code) => process.exit(code ?? 0));
