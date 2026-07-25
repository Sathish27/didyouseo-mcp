#!/usr/bin/env node
/**
 * @didyouseo/mcp — stdio bridge to the DidYouSEO remote MCP server.
 *
 * MCP clients that only speak local stdio (e.g. Claude Desktop) use this to
 * reach the remote server at https://didyouseo.com/mcp. It delegates to
 * `mcp-remote`, which performs the OAuth 2.1 browser sign-in and proxies the
 * Streamable HTTP transport over stdio.
 *
 * Usage (in an MCP client config):
 *   command: "npx"
 *   args: ["-y", "@didyouseo/mcp"]
 *
 * Override the endpoint for local development:
 *   DIDYOUSEO_MCP_URL=http://localhost:3000/mcp npx @didyouseo/mcp
 */
import { spawn } from "node:child_process";

const url = process.env.DIDYOUSEO_MCP_URL || "https://didyouseo.com/mcp";
const passthrough = process.argv.slice(2);

const child = spawn(
  "npx",
  ["-y", "mcp-remote@latest", url, ...passthrough],
  { stdio: "inherit", shell: process.platform === "win32" }
);

child.on("error", (err) => {
  console.error(`[didyouseo-mcp] failed to start bridge: ${err.message}`);
  process.exit(1);
});
child.on("exit", (code) => process.exit(code ?? 0));
