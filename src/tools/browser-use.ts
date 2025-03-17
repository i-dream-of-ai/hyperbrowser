import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { getClient } from "../utils";
import { browserUseToolParamSchemaType } from "./tool-types";

export async function browserUseTool({
  task,
  sessionOptions,
  returnStepInfo,
  maxSteps,
}: browserUseToolParamSchemaType): Promise<CallToolResult> {
  try {
    const client = await getClient();

    const result = await client.beta.agents.browserUse.startAndWait({
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

      response.content.push({
        type: "text",
        text: JSON.stringify(taskData),
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

export const browserUseToolName = "browser_use";
export const browserUseToolDescription =
  "Perform a certain task inside a browser session. Will perform the entirety of the task inside the browser, and return the results.";
