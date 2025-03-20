import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  oaiCuaTool,
  oaiCuaToolDescription,
  oaiCuaToolName,
} from "../tools/oai-cua";
import {
  browserUseTool,
  browserUseToolDescription,
  browserUseToolName,
} from "../tools/browser-use";
import {
  crawlWebpagesTool,
  crawlWebpagesToolDescription,
  crawlWebpagesToolName,
} from "../tools/crawl-webpages";
import {
  extractStructuredDataTool,
  extractStructuredDataToolDescription,
  extractStructuredDataToolName,
} from "../tools/extract-structured";
import {
  scrapeWebpageTool,
  scrapeWebpageToolDescription,
  scrapeWebpageToolName,
} from "../tools/scrape-webpage";
import {
  bingSearchToolParamSchemaRaw,
  browserUseToolParamSchemaRaw,
  claudeComputerUseToolParamSchemaRaw,
  crawlWebpagesToolParamSchemaRaw,
  extractStructuredDataToolParamSchemaRaw,
  oaiCuaToolParamSchemaRaw,
  scrapeWebpageToolParamSchemaRaw,
} from "../tools/tool-types";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  listAllResources,
  getResource,
} from "../resources/static/get_resources";
import {
  claudeComputerUseTool,
  claudeComputerUseToolDescription,
  claudeComputerUseToolName,
} from "../tools/claude-computer-use";
import {
  bingSearchTool,
  bingSearchToolDescription,
  bingSearchToolName,
} from "../tools/bing-search";

function setupServer(server: McpServer) {
  server.tool(
    scrapeWebpageToolName,
    scrapeWebpageToolDescription,
    scrapeWebpageToolParamSchemaRaw,
    scrapeWebpageTool
  );
  server.tool(
    crawlWebpagesToolName,
    crawlWebpagesToolDescription,
    crawlWebpagesToolParamSchemaRaw,
    crawlWebpagesTool
  );
  server.tool(
    extractStructuredDataToolName,
    extractStructuredDataToolDescription,
    extractStructuredDataToolParamSchemaRaw,
    extractStructuredDataTool
  );
  server.tool(
    browserUseToolName,
    browserUseToolDescription,
    browserUseToolParamSchemaRaw,
    browserUseTool
  );
  server.tool(
    oaiCuaToolName,
    oaiCuaToolDescription,
    oaiCuaToolParamSchemaRaw,
    oaiCuaTool
  );

  server.tool(
    claudeComputerUseToolName,
    claudeComputerUseToolDescription,
    claudeComputerUseToolParamSchemaRaw,
    claudeComputerUseTool
  );

  server.tool(
    bingSearchToolName,
    bingSearchToolDescription,
    bingSearchToolParamSchemaRaw,
    bingSearchTool
  );

  server.server.setRequestHandler(ListResourcesRequestSchema, listAllResources);
  server.server.setRequestHandler(ReadResourceRequestSchema, getResource);
}

export default setupServer;
