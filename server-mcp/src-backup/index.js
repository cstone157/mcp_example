// const { Server } = require('@modelcontextprotocol/sdk/dist/cjs/server');
// const { Server, StdioServerTransport } = require('@modelcontextprotocol/sdk/server/index.js');
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// const { 
import { 
    CallToolRequestSchema, ListToolsRequestSchema, 
    ListResourcesRequestSchema, ReadResourceRequestSchema 
// } = require('@modelcontextprotocol/sdk/types.js');
} from '@modelcontextprotocol/sdk/types.js';
// const InventoryClient = require('./inventoryClient');
import { InventoryClient } from './inventoryClient.js';
// const tools = require('./inventoryTools');
import { tools } from './inventoryTools.js';


const inventoryClient = new InventoryClient();

// const server = new Server({
//   name: 'inventory-mcp-server',
//   version: '1.0.0',
// });

const server = new Server(
  {
    name: "mcp-example-server",
    version: "0.0.1",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);



// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools,
}));

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request;

    let result;

    // Parts tools
    if (name === 'create_part') {
      result = await inventoryClient.createPart(
        args.name,
        args.sku,
        args.unit_cost,
        args.description || '',
        args.supplier || ''
      );
    } else if (name === 'get_part') {
      result = await inventoryClient.getPart(args.id);
    } else if (name === 'list_parts') {
      result = await inventoryClient.getAllParts(
        args.limit || 100,
        args.offset || 0
      );
    } else if (name === 'search_parts') {
      result = await inventoryClient.searchParts(args.query);
    } else if (name === 'update_part') {
      const updates = {};
      if (args.name) updates.name = args.name;
      if (args.sku) updates.sku = args.sku;
      if (args.unit_cost) updates.unit_cost = args.unit_cost;
      if (args.description) updates.description = args.description;
      if (args.supplier) updates.supplier = args.supplier;
      result = await inventoryClient.updatePart(args.id, updates);
    } else if (name === 'delete_part') {
      result = await inventoryClient.deletePart(args.id);

      // Warehouses tools
    } else if (name === 'create_warehouse') {
      result = await inventoryClient.createWarehouse(
        args.name,
        args.location,
        args.capacity,
        args.description || ''
      );
    } else if (name === 'get_warehouse') {
      result = await inventoryClient.getWarehouse(args.id);
    } else if (name === 'list_warehouses') {
      result = await inventoryClient.getAllWarehouses(
        args.limit || 100,
        args.offset || 0
      );
    } else if (name === 'get_warehouse_capacity') {
      result = await inventoryClient.getWarehouseCapacity(args.id);
    } else if (name === 'update_warehouse') {
      const updates = {};
      if (args.name) updates.name = args.name;
      if (args.location) updates.location = args.location;
      if (args.capacity) updates.capacity = args.capacity;
      if (args.description) updates.description = args.description;
      result = await inventoryClient.updateWarehouse(args.id, updates);
    } else if (name === 'delete_warehouse') {
      result = await inventoryClient.deleteWarehouse(args.id);

      // Inventory tools
    } else if (name === 'create_inventory') {
      result = await inventoryClient.createInventory(
        args.part_id,
        args.warehouse_id,
        args.quantity,
        args.reorder_level || 0,
        args.reorder_quantity || 0
      );
    } else if (name === 'get_inventory') {
      result = await inventoryClient.getInventory(args.id);
    } else if (name === 'list_inventory') {
      result = await inventoryClient.getAllInventory(
        args.limit || 100,
        args.offset || 0
      );
    } else if (name === 'get_inventory_by_warehouse') {
      result = await inventoryClient.getInventoryByWarehouse(
        args.warehouse_id,
        args.limit || 100,
        args.offset || 0
      );
    } else if (name === 'get_inventory_by_part') {
      result = await inventoryClient.getInventoryByPart(
        args.part_id,
        args.limit || 100,
        args.offset || 0
      );
    } else if (name === 'update_inventory') {
      const updates = {};
      if (args.quantity !== undefined) updates.quantity = args.quantity;
      if (args.reorder_level !== undefined) updates.reorder_level = args.reorder_level;
      if (args.reorder_quantity !== undefined) updates.reorder_quantity = args.reorder_quantity;
      result = await inventoryClient.updateInventory(args.id, updates);
    } else if (name === 'delete_inventory') {
      result = await inventoryClient.deleteInventory(args.id);
    } else if (name === 'get_low_stock_items') {
      result = await inventoryClient.getLowStockItems();
    } else if (name === 'get_part_distribution') {
      result = await inventoryClient.getPartDistribution(args.part_id);
    } else if (name === 'increment_inventory') {
      result = await inventoryClient.incrementQuantity(args.id, args.quantity);
    } else if (name === 'decrement_inventory') {
      result = await inventoryClient.decrementQuantity(args.id, args.quantity);
    } else {
      return {
        content: [
          {
            type: 'text',
            text: `Unknown tool: ${name}`,
          },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// List resources handler
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'inventory://docs',
        name: 'Inventory System Documentation',
        description: 'Documentation and examples for using the inventory MCP server',
        mimeType: 'text/plain',
      },
    ],
  };
});

// Read resource handler
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.uri === 'inventory://docs') {
    return {
      contents: [
        {
          uri: request.uri,
          mimeType: 'text/plain',
          text: `Inventory Management System MCP Server

OVERVIEW:
This MCP server provides access to an inventory tracking system that manages:
- Parts (SKU, cost, supplier information)
- Warehouses (locations, capacity)
- Inventory (parts stocked in warehouses)

PARTS MANAGEMENT:
- create_part: Create a new part with SKU, name, cost
- get_part: Retrieve specific part details
- list_parts: List all parts with pagination
- search_parts: Search parts by name, SKU, or description
- update_part: Modify part information
- delete_part: Remove a part

WAREHOUSE MANAGEMENT:
- create_warehouse: Create a new warehouse location
- get_warehouse: Retrieve warehouse details
- list_warehouses: List all warehouses
- get_warehouse_capacity: Check capacity usage (used/available)
- update_warehouse: Modify warehouse information
- delete_warehouse: Remove a warehouse

INVENTORY MANAGEMENT:
- create_inventory: Add a part to a warehouse with initial quantity
- get_inventory: Get specific inventory record
- list_inventory: List all inventory records
- get_inventory_by_warehouse: See all parts in a warehouse
- get_inventory_by_part: See where a part is stocked
- update_inventory: Change quantity or reorder levels
- delete_inventory: Remove an inventory record
- increment_inventory: Add quantity to stock
- decrement_inventory: Remove quantity from stock

REPORTING:
- get_low_stock_items: Find items below reorder level
- get_part_distribution: See how a part is distributed across warehouses

EXAMPLES:

1. Create a part:
   Tool: create_part
   Arguments: {
     "name": "Aluminum Widget",
     "sku": "WID-ALU-001",
     "unit_cost": 12.50,
     "description": "High-quality aluminum widget",
     "supplier": "Premium Parts Inc"
   }

2. Create a warehouse:
   Tool: create_warehouse
   Arguments: {
     "name": "Main Warehouse",
     "location": "New York, NY",
     "capacity": 50000,
     "description": "Primary distribution center"
   }

3. Add inventory:
   Tool: create_inventory
   Arguments: {
     "part_id": 1,
     "warehouse_id": 1,
     "quantity": 1000,
     "reorder_level": 200,
     "reorder_quantity": 500
   }

4. Check low stock:
   Tool: get_low_stock_items
   (Returns all items below their reorder level)

5. Move inventory:
   Tool: decrement_inventory
   Arguments: {"id": 1, "quantity": 50}
   
   Then use increment_inventory on another warehouse

ERROR HANDLING:
- All errors are returned with descriptive messages
- Invalid IDs return 404 errors
- Validation errors provide field-specific feedback
- SKU uniqueness is enforced at database level`,
        },
      ],
    };
  }

  return {
    contents: [
      {
        uri: request.uri,
        mimeType: 'text/plain',
        text: `Resource not found: ${request.uri}`,
      },
    ],
  };
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Inventory MCP Server running on stdio');
}

main().catch(console.error);
