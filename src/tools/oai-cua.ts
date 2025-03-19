import { config } from "dotenv";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { getClient } from "../utils";
import { browserUseToolParamSchemaType } from "./tool-types";

export async function oaiCuaTool({
  task,
  sessionOptions,
  returnStepInfo,
  maxSteps,
}: browserUseToolParamSchemaType): Promise<CallToolResult> {
  try {
    const client = await getClient();

    const result = await client.agents.cua.startAndWait({
      task,
      sessionOptions,
      maxSteps,
    });

    if (result.error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: result.error,
          },
        ],
      };
    }

    const response: CallToolResult = {
      content: [],
      isError: false,
    };

    if (result.data) {
      let taskData = result.data;

      if (!returnStepInfo) {
        taskData.steps = [];
      }

      const toolResultText = `Final Result: ${
        taskData.finalResult
      }\n\nSteps: ${JSON.stringify(taskData.steps, null, 2)}`;

      response.content.push({
        type: "text",
        text: toolResultText,
      });
    } else {
      response.content.push({
        type: "text",
        text: "Task result data is empty/missing",
        isError: true,
      });
    }

    return response;
  } catch (error) {
    return {
      content: [{ type: "text", text: `${error}` }],
      isError: true,
    };
  }
}

export const oaiCuaToolName = "openai_computer_use_agent";
export const oaiCuaToolDescription = `
This tool uses OpenAI's Computer Use Agent (CUA) to autonomously perform complex browser-based tasks using a cloud browser.
It can navigate websites, fill forms, extract information, and interact with web applications with human-like behavior.

This tool is ideal for tasks that require multi-step browser interactions that cannot be accomplished with simpler tools \
like scraping, screenshots, or web extraction. For optimal results:
1. Provide a detailed, step-by-step description of the task
2. Include all relevant context (credentials, form data, specific instructions)
3. Specify the expected outcome or information to retrieve

Example use cases:
- Completing multi-step registration processes
- Navigating complex web applications
- Performing research across multiple pages
- Extracting data that requires interaction

The tool will return the final result upon completion or an error message if it encounters issues.`.trim();
