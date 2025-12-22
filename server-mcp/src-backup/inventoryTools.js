//import { Tool } from "@modelcontextprotocol/sdk/types.js";
const { Tool } = require("@modelcontextprotocol/sdk/types.js");

const create_part = {
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
    // name: 'create_part',
    // description: 'Create a new part in the inventory system',
    // inputSchema: {
    //     type: 'object',
    //     required: ['name', 'sku', 'unit_cost'],
    //     properties: {
    //         name: {
    //             type: 'string',
    //             description: 'Name of the part',
    //         },
    //         sku: {
    //             type: 'string',
    //             description: 'Stock Keeping Unit (unique identifier)',
    //         },
    //         unit_cost: {
    //             type: 'number',
    //             description: 'Cost per unit',
    //         },
    //         description: {
    //             type: 'string',
    //             description: 'Part description',
    //         },
    //         supplier: {
    //             type: 'string',
    //             description: 'Supplier name',
    //         },
    //     },
    // },
};
  // {
  //   name: 'get_part',
  //   description: 'Get details of a specific part',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'number',
  //         description: 'Part ID',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'list_parts',
  //   description: 'List all parts',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       limit: {
  //         type: 'number',
  //         description: 'Number of results to return (default: 100)',
  //       },
  //       offset: {
  //         type: 'number',
  //         description: 'Number of results to skip (default: 0)',
  //       },
  //     },
  //   },
  // },
  // {
  //   name: 'search_parts',
  //   description: 'Search for parts by name, SKU, or description',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       query: {
  //         type: 'string',
  //         description: 'Search query',
  //       },
  //     },
  //     required: ['query'],
  //   },
  // },
  // {
  //   name: 'update_part',
  //   description: 'Update part details',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'number',
  //         description: 'Part ID',
  //       },
  //       name: {
  //         type: 'string',
  //         description: 'Part name',
  //       },
  //       sku: {
  //         type: 'string',
  //         description: 'Stock Keeping Unit',
  //       },
  //       unit_cost: {
  //         type: 'number',
  //         description: 'Cost per unit',
  //       },
  //       description: {
  //         type: 'string',
  //         description: 'Part description',
  //       },
  //       supplier: {
  //         type: 'string',
  //         description: 'Supplier name',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'delete_part',
  //   description: 'Delete a part',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'number',
  //         description: 'Part ID',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'create_warehouse',
  //   description: 'Create a new warehouse',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       name: {
  //         type: 'string',
  //         description: 'Warehouse name',
  //       },
  //       location: {
  //         type: 'string',
  //         description: 'Physical location',
  //       },
  //       capacity: {
  //         type: 'number',
  //         description: 'Maximum items capacity',
  //       },
  //       description: {
  //         type: 'string',
  //         description: 'Warehouse description',
  //       },
  //     },
  //     required: ['name', 'location', 'capacity'],
  //   },
  // },
  // {
  //   name: 'get_warehouse',
  //   description: 'Get details of a specific warehouse',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'number',
  //         description: 'Warehouse ID',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'list_warehouses',
  //   description: 'List all warehouses',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       limit: {
  //         type: 'number',
  //         description: 'Number of results to return (default: 100)',
  //       },
  //       offset: {
  //         type: 'number',
  //         description: 'Number of results to skip (default: 0)',
  //       },
  //     },
  //   },
  // },
  // {
  //   name: 'get_warehouse_capacity',
  //   description: 'Get capacity usage of a warehouse',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'number',
  //         description: 'Warehouse ID',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'update_warehouse',
  //   description: 'Update warehouse details',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'number',
  //         description: 'Warehouse ID',
  //       },
  //       name: {
  //         type: 'string',
  //         description: 'Warehouse name',
  //       },
  //       location: {
  //         type: 'string',
  //         description: 'Physical location',
  //       },
  //       capacity: {
  //         type: 'number',
  //         description: 'Maximum items capacity',
  //       },
  //       description: {
  //         type: 'string',
  //         description: 'Warehouse description',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'delete_warehouse',
  //   description: 'Delete a warehouse',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'number',
  //         description: 'Warehouse ID',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'create_inventory',
  //   description: 'Create an inventory record for a part in a warehouse',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       part_id: {
  //         type: 'number',
  //         description: 'Part ID',
  //       },
  //       warehouse_id: {
  //         type: 'number',
  //         description: 'Warehouse ID',
  //       },
  //       quantity: {
  //         type: 'number',
  //         description: 'Current quantity',
  //       },
  //       reorder_level: {
  //         type: 'number',
  //         description: 'Minimum quantity before reorder',
  //       },
  //       reorder_quantity: {
  //         type: 'number',
  //         description: 'Quantity to order when below reorder level',
  //       },
  //     },
  //     required: ['part_id', 'warehouse_id', 'quantity'],
  //   },
  // },
  // {
  //   name: 'get_inventory',
  //   description: 'Get inventory record by ID',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'number',
  //         description: 'Inventory record ID',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'list_inventory',
  //   description: 'List all inventory records',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       limit: {
  //         type: 'number',
  //         description: 'Number of results to return (default: 100)',
  //       },
  //       offset: {
  //         type: 'number',
  //         description: 'Number of results to skip (default: 0)',
  //       },
  //     },
  //   },
  // },
  // {
  //   name: 'get_inventory_by_warehouse',
  //   description: 'Get all inventory in a specific warehouse',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       warehouse_id: {
  //         type: 'number',
  //         description: 'Warehouse ID',
  //       },
  //       limit: {
  //         type: 'number',
  //         description: 'Number of results to return (default: 100)',
  //       },
  //       offset: {
  //         type: 'number',
  //         description: 'Number of results to skip (default: 0)',
  //       },
  //     },
  //     required: ['warehouse_id'],
  //   },
  // },
  // {
  //   name: 'get_inventory_by_part',
  //   description: 'Get inventory of a specific part across all warehouses',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       part_id: {
  //         type: 'number',
  //         description: 'Part ID',
  //       },
  //       limit: {
  //         type: 'number',
  //         description: 'Number of results to return (default: 100)',
  //       },
  //       offset: {
  //         type: 'number',
  //         description: 'Number of results to skip (default: 0)',
  //       },
  //     },
  //     required: ['part_id'],
  //   },
  // },
  // {
  //   name: 'update_inventory',
  //   description: 'Update inventory record',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'number',
  //         description: 'Inventory record ID',
  //       },
  //       quantity: {
  //         type: 'number',
  //         description: 'New quantity',
  //       },
  //       reorder_level: {
  //         type: 'number',
  //         description: 'Reorder level',
  //       },
  //       reorder_quantity: {
  //         type: 'number',
  //         description: 'Reorder quantity',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'delete_inventory',
  //   description: 'Delete an inventory record',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'number',
  //         description: 'Inventory record ID',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'get_low_stock_items',
  //   description: 'Get all items below their reorder level',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {},
  //   },
  // },
  // {
  //   name: 'get_part_distribution',
  //   description: 'Get distribution of a part across all warehouses',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       part_id: {
  //         type: 'number',
  //         description: 'Part ID',
  //       },
  //     },
  //     required: ['part_id'],
  //   },
  // },
  // {
  //   name: 'increment_inventory',
  //   description: 'Increase inventory quantity',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'number',
  //         description: 'Inventory record ID',
  //       },
  //       quantity: {
  //         type: 'number',
  //         description: 'Amount to increase',
  //       },
  //     },
  //     required: ['id', 'quantity'],
  //   },
  // },
  // {
  //   name: 'decrement_inventory',
  //   description: 'Decrease inventory quantity',
  //   inputSchema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'number',
  //         description: 'Inventory record ID',
  //       },
  //       quantity: {
  //         type: 'number',
  //         description: 'Amount to decrease',
  //       },
  //     },
  //     required: ['id', 'quantity'],
  //   },
  // },

const tools = [ 
  create_part 
];
module.exports = tools;