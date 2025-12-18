const axios = require('axios');
require('dotenv').config();

const WEBSERVICE_URL = process.env.WEBSERVICE_URL || 'http://localhost:3000';

class InventoryClient {
  constructor() {
    this.client = axios.create({
      baseURL: WEBSERVICE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Parts endpoints
  async createPart(name, sku, unitCost, description = '', supplier = '') {
    const response = await this.client.post('/api/parts', {
      name,
      sku,
      unit_cost: unitCost,
      description,
      supplier,
    });
    return response.data;
  }

  async getPart(id) {
    const response = await this.client.get(`/api/parts/${id}`);
    return response.data;
  }

  async getAllParts(limit = 100, offset = 0) {
    const response = await this.client.get('/api/parts', {
      params: { limit, offset },
    });
    return response.data;
  }

  async updatePart(id, updates) {
    const response = await this.client.put(`/api/parts/${id}`, updates);
    return response.data;
  }

  async deletePart(id) {
    await this.client.delete(`/api/parts/${id}`);
    return { success: true, message: 'Part deleted' };
  }

  async searchParts(query) {
    const response = await this.client.get('/api/parts/search', {
      params: { q: query },
    });
    return response.data;
  }

  // Warehouses endpoints
  async createWarehouse(name, location, capacity, description = '') {
    const response = await this.client.post('/api/warehouses', {
      name,
      location,
      capacity,
      description,
    });
    return response.data;
  }

  async getWarehouse(id) {
    const response = await this.client.get(`/api/warehouses/${id}`);
    return response.data;
  }

  async getAllWarehouses(limit = 100, offset = 0) {
    const response = await this.client.get('/api/warehouses', {
      params: { limit, offset },
    });
    return response.data;
  }

  async updateWarehouse(id, updates) {
    const response = await this.client.put(`/api/warehouses/${id}`, updates);
    return response.data;
  }

  async deleteWarehouse(id) {
    await this.client.delete(`/api/warehouses/${id}`);
    return { success: true, message: 'Warehouse deleted' };
  }

  async getWarehouseCapacity(id) {
    const response = await this.client.get(`/api/warehouses/${id}/capacity`);
    return response.data;
  }

  // Inventory endpoints
  async createInventory(partId, warehouseId, quantity, reorderLevel = 0, reorderQuantity = 0) {
    const response = await this.client.post('/api/inventory', {
      part_id: partId,
      warehouse_id: warehouseId,
      quantity,
      reorder_level: reorderLevel,
      reorder_quantity: reorderQuantity,
    });
    return response.data;
  }

  async getInventory(id) {
    const response = await this.client.get(`/api/inventory/${id}`);
    return response.data;
  }

  async getAllInventory(limit = 100, offset = 0) {
    const response = await this.client.get('/api/inventory', {
      params: { limit, offset },
    });
    return response.data;
  }

  async getInventoryByWarehouse(warehouseId, limit = 100, offset = 0) {
    const response = await this.client.get(`/api/inventory/warehouse/${warehouseId}`, {
      params: { limit, offset },
    });
    return response.data;
  }

  async getInventoryByPart(partId, limit = 100, offset = 0) {
    const response = await this.client.get(`/api/inventory/part/${partId}`, {
      params: { limit, offset },
    });
    return response.data;
  }

  async updateInventory(id, updates) {
    const response = await this.client.put(`/api/inventory/${id}`, updates);
    return response.data;
  }

  async deleteInventory(id) {
    await this.client.delete(`/api/inventory/${id}`);
    return { success: true, message: 'Inventory record deleted' };
  }

  async getLowStockItems() {
    const response = await this.client.get('/api/inventory/low-stock');
    return response.data;
  }

  async getPartDistribution(partId) {
    const response = await this.client.get(`/api/inventory/distribution/${partId}`);
    return response.data;
  }

  async incrementQuantity(id, quantity) {
    const response = await this.client.post(`/api/inventory/${id}/increment`, { quantity });
    return response.data;
  }

  async decrementQuantity(id, quantity) {
    const response = await this.client.post(`/api/inventory/${id}/decrement`, { quantity });
    return response.data;
  }
}

module.exports = InventoryClient;
