# Hyperbrowser MCP Server

This project is a server implementation for the Hyperbrowser using the Model Context Protocol (MCP). The server provides various tools to scrape, extract structured data, and crawl webpages. It also provides easy access to general purpose browser agents like OpenAI's CUA, Anthropic's Claude Computer Use, and Browser Use.

More information about the Hyperbrowser can be found [here](https://docs.hyperbrowser.ai/). The hyperbrowser API supports a superset of features present in the mcp server.

More information about the Model Context Protocol can be found [here](https://modelcontextprotocol.io/introduction).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tools](#tools)
- [Configuration](#configuration)
- [License](#license)

## Installation

To install the server, run:

```bash
npx hyperbrowser-mcp <YOUR-HYPERBROWSER-API-KEY>
```

## Running on Cursor
Add to `~/.cursor/mcp.json` like this:
```json
{
  "mcpServers": {
    "hyperbrowser": {
      "command": "npx",
      "args": ["-y", "hyperbrowser-mcp"],
      "env": {
        "HYPERBROWSER_API_KEY": "YOUR-API-KEY"
      }
    }
  }
}
```

## Running on Windsurf
Add to your `./codeium/windsurf/model_config.json` like this:
```json
{
  "mcpServers": {
    "hyperbrowser": {
      "command": "npx",
      "args": ["-y", "hyperbrowser-mcp"],
      "env": {
        "HYPERBROWSER_API_KEY": "YOUR-API-KEY"
      }
    }
  }
}
```

### Development

For development purposes, you can run the server directly from the source code.

1. Clone the repository:

   ```sh
   git clone git@github.com:hyperbrowserai/mcp.git hyperbrowser-mcp
   cd hyperbrowser-mcp
   ```

2. Install dependencies:

   ```sh
   npm install # or yarn install
   npm run build
   ```

3. Run the server:

   ```sh
   node dist/server.js
   ```

## Claude Desktop app
This is an example config for the Hyperbrowser MCP server for the Claude Desktop client.

```json
{
  "mcpServers": {
    "hyperbrowser": {
      "command": "npx",
      "args": ["--yes", "hyperbrowser-mcp"],
      "env": {
        "HYPERBROWSER_API_KEY": "your-api-key" // or set the param in the prompt itself
      }
    }
  }
}
```


## Tools
* `scrape_webpage` - Extract formatted (markdown, screenshot etc) content from any webpage 
* `crawl_webpages` - Navigate through multiple linked pages and extract LLM-friendly formatted content
* `extract_structured_data` - Convert messy HTML into structured JSON
* `search_with_bing` - Query the web and get results with Bing search
* `browser_use_agent` - Fast, lightweight browser automation with the Browser Use agent
* `openai_computer_use_agent` - General-purpose automation using OpenAI’s CUA model
* `claude_computer_use_agent` - Complex browser tasks using Claude computer use


## Resources

The server provides the documentation about hyperbrowser through the `resources` methods. Any client which can do discovery over resources has access to it.

## License

This project is licensed under the MIT License.
