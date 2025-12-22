import { Tool } from "@modelcontextprotocol/sdk/types.js";

export interface QueryArgs {
  site_id: string;
  metrics: string[];
  date_range: string;
}

export const queryTool: Tool = {
  name: "plausible_query",
  description: "Query analytics data from Plausible",
  inputSchema: {
    type: "object",
    required: ["site_id", "metrics", "date_range"],
    properties: {
      site_id: {
        type: "string",
        description: "The domain of the site to query data for",
      },
      metrics: {
        type: "array",
        items: {
          type: "string",
        },
        description: "List of metrics to query (e.g., visitors, pageviews)",
      },
      date_range: {
        type: "string",
        description: "Date range for the query (e.g., '7d', '30d')",
      },
    },
  },
};

export interface PartArgs {
  name: string;
  sku: string;
  unit_cost: number;
  description: string;
  supplier: string;
}

export const create_part: Tool = {
  name: 'create_part',
  description: 'Create a new part in the inventory system',
  inputSchema: {
    type: 'object',
    required: ['name', 'sku', 'unit_cost'],
    properties: {
      name: {
        type: 'string',
        description: 'Name of the part',
      },
      sku: {
        type: 'string',
        description: 'Stock Keeping Unit (unique identifier)',
      },
      unit_cost: {
        type: 'number',
        description: 'Cost per unit',
      },
      description: {
        type: 'string',
        description: 'Part description',
      },
      supplier: {
        type: 'string',
        description: 'Supplier name',
      },
    },
  },
};