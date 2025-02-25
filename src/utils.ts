import { Hyperbrowser } from "@hyperbrowser/sdk";

export const getClient = async (apiKey: string) => {
  return new Hyperbrowser({ apiKey });
};

export const logWithTimestamp = ({
  level = "info",
  name = "hyperbrowser",
  data,
}: {
  level?: "info" | "warning" | "error";
  name?: string;
  data?: any;
}) => {
  const timestamp = new Date().toISOString();

  const consoleData = [`${timestamp} [${name}] [${level}]`];
  if (Array.isArray(data)) {
    consoleData.push(...data);
  } else {
    consoleData.push(data);
  }

  console.error(...consoleData);
};
