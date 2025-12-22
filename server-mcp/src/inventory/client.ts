import * as dotenv from 'dotenv';
dotenv.config();

const INVENTORY_API_HOST = process.env.WEBSERVICE_HOST || "http://inventory/api/";
const INVENTORY_API_PORT = process.env.WEBSERVICE_PORT || "";
const INVENTORY_API_PATH = process.env.WEBSERVICE_PATH  || "api";
const INVENTORY_API_KEY = process.env.WEBSERVICE_API_KEY;
const INVENTORY_API_URL = `${INVENTORY_API_HOST}${INVENTORY_API_PORT ? `:${INVENTORY_API_PORT}` : ""}/${INVENTORY_API_PATH || ""}`;

if (!INVENTORY_API_KEY) {
  throw new Error("INVENTORY_API_KEY environment variable is required");
}

class InventoryClient {
  async create_part(name: string, sku: string, unit_cost: number, description?: string, supplier?: string) {
    const response = await fetch(`${INVENTORY_API_URL}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${INVENTORY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        sku: sku,
        unit_cost: unit_cost,
        description: description,
        supplier: supplier,
      }),
    });

    if (!response.ok) {
      throw new Error(`Plausible API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const inventoryClient = new InventoryClient();