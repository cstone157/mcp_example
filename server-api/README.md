# Inventory Tracking Service

A REST API service for tracking parts, warehouses, and warehouse inventory.

## Features

- **Parts Management**: Create, read, update, delete parts with SKU tracking
- **Warehouse Management**: Manage warehouse locations and capacity
- **Inventory Tracking**: Track inventory levels across warehouses
- **Low Stock Alerts**: Identify parts below reorder levels
- **Part Distribution**: View how parts are distributed across warehouses
- **Quantity Management**: Increment/decrement inventory quantities

## Prerequisites

- Node.js 14+
- PostgreSQL 12+

## Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Configure your database connection in `.env`

4. Run database migrations:
```bash
npm run migrate
```

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Parts
- `POST /api/parts` - Create a new part
- `GET /api/parts` - List all parts
- `GET /api/parts/:id` - Get part by ID
- `PUT /api/parts/:id` - Update a part
- `DELETE /api/parts/:id` - Delete a part
- `GET /api/parts/search?q=keyword` - Search parts

### Warehouses
- `POST /api/warehouses` - Create a new warehouse
- `GET /api/warehouses` - List all warehouses
- `GET /api/warehouses/:id` - Get warehouse by ID
- `GET /api/warehouses/:id/capacity` - Get warehouse capacity usage
- `PUT /api/warehouses/:id` - Update a warehouse
- `DELETE /api/warehouses/:id` - Delete a warehouse

### Inventory
- `POST /api/inventory` - Create inventory record
- `GET /api/inventory` - List all inventory
- `GET /api/inventory/:id` - Get inventory record by ID
- `GET /api/inventory/warehouse/:warehouseId` - Get inventory by warehouse
- `GET /api/inventory/part/:partId` - Get inventory by part
- `GET /api/inventory/low-stock` - Get items below reorder level
- `GET /api/inventory/distribution/:partId` - Get part distribution across warehouses
- `PUT /api/inventory/:id` - Update inventory record
- `DELETE /api/inventory/:id` - Delete inventory record
- `POST /api/inventory/:id/increment` - Increase quantity
- `POST /api/inventory/:id/decrement` - Decrease quantity

## Example Requests

### Create a Part
```bash
curl -X POST http://localhost:3000/api/parts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Widget A",
    "sku": "WID-001",
    "description": "High quality widget",
    "unit_cost": 15.99,
    "supplier": "Acme Corp"
  }'
```

### Create a Warehouse
```bash
curl -X POST http://localhost:3000/api/warehouses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Main Warehouse",
    "location": "New York, NY",
    "capacity": 10000,
    "description": "Primary distribution center"
  }'
```

### Create Inventory Record
```bash
curl -X POST http://localhost:3000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "part_id": 1,
    "warehouse_id": 1,
    "quantity": 500,
    "reorder_level": 100,
    "reorder_quantity": 250
  }'
```

### Increment Quantity
```bash
curl -X POST http://localhost:3000/api/inventory/1/increment \
  -H "Content-Type: application/json" \
  -d '{"quantity": 50}'
```

## Database Schema

### Parts
- `id` - Unique identifier
- `name` - Part name
- `description` - Part description
- `sku` - Unique stock keeping unit
- `unit_cost` - Cost per unit
- `supplier` - Supplier name
- `created_at`, `updated_at` - Timestamps

### Warehouses
- `id` - Unique identifier
- `name` - Warehouse name
- `location` - Physical location
- `capacity` - Maximum items
- `description` - Warehouse description
- `created_at`, `updated_at` - Timestamps

### Inventory
- `id` - Unique identifier
- `part_id` - Reference to parts table
- `warehouse_id` - Reference to warehouses table
- `quantity` - Current stock level
- `reorder_level` - Minimum quantity before reorder
- `reorder_quantity` - Quantity to order when below reorder level
- `created_at`, `updated_at` - Timestamps

## Error Handling

The API returns structured error responses:
```json
{
  "error": "Validation Error",
  "details": [
    {
      "field": "name",
      "message": "name is required"
    }
  ]
}
```

## Testing

Run tests with:
```bash
npm test
```

## Project Structure

```
src/
├── server.js                 # Express app and server setup
├── controllers/              # Request handlers
│   ├── partController.js
│   ├── warehouseController.js
│   └── inventoryController.js
├── models/                   # Data models and database queries
│   ├── Part.js
│   ├── Warehouse.js
│   └── Inventory.js
├── routes/                   # API route definitions
│   ├── parts.js
│   ├── warehouses.js
│   └── inventory.js
├── middleware/               # Express middleware
│   └── errorHandler.js
├── utils/                    # Utility functions
│   ├── database.js           # Database connection
│   └── validators.js         # Input validation schemas
└── scripts/                  # Maintenance scripts
    └── migrate.js            # Database migration
```

## License

MIT
