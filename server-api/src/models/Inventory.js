const pool = require('../utils/database');

class Inventory {
  static async create(inventoryData) {
    const { part_id, warehouse_id, quantity, reorder_level, reorder_quantity } = inventoryData;
    const query = `
      INSERT INTO inventory (part_id, warehouse_id, quantity, reorder_level, reorder_quantity, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *;
    `;
    const result = await pool.query(query, [
      part_id,
      warehouse_id,
      quantity,
      reorder_level || 0,
      reorder_quantity || 0,
    ]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM inventory WHERE id = $1;';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Inventory record not found' };
    }
    return result.rows[0];
  }

  static async findByPartAndWarehouse(partId, warehouseId) {
    const query = 'SELECT * FROM inventory WHERE part_id = $1 AND warehouse_id = $2;';
    const result = await pool.query(query, [partId, warehouseId]);
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Inventory record not found' };
    }
    return result.rows[0];
  }

  static async findAll(limit = 100, offset = 0) {
    const query = `
      SELECT i.*, p.name as part_name, p.sku, w.name as warehouse_name
      FROM inventory i
      JOIN parts p ON i.part_id = p.id
      JOIN warehouses w ON i.warehouse_id = w.id
      ORDER BY i.id DESC LIMIT $1 OFFSET $2;
    `;
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  }

  static async findByWarehouse(warehouseId, limit = 100, offset = 0) {
    const query = `
      SELECT i.*, p.name as part_name, p.sku, w.name as warehouse_name
      FROM inventory i
      JOIN parts p ON i.part_id = p.id
      JOIN warehouses w ON i.warehouse_id = w.id
      WHERE i.warehouse_id = $1
      ORDER BY i.id DESC LIMIT $2 OFFSET $3;
    `;
    const result = await pool.query(query, [warehouseId, limit, offset]);
    return result.rows;
  }

  static async findByPart(partId, limit = 100, offset = 0) {
    const query = `
      SELECT i.*, p.name as part_name, p.sku, w.name as warehouse_name
      FROM inventory i
      JOIN parts p ON i.part_id = p.id
      JOIN warehouses w ON i.warehouse_id = w.id
      WHERE i.part_id = $1
      ORDER BY i.id DESC LIMIT $2 OFFSET $3;
    `;
    const result = await pool.query(query, [partId, limit, offset]);
    return result.rows;
  }

  static async update(id, inventoryData) {
    const { quantity, reorder_level, reorder_quantity } = inventoryData;
    const query = `
      UPDATE inventory
      SET quantity = COALESCE($2, quantity),
          reorder_level = COALESCE($3, reorder_level),
          reorder_quantity = COALESCE($4, reorder_quantity),
          updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [id, quantity, reorder_level, reorder_quantity]);
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Inventory record not found' };
    }
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM inventory WHERE id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Inventory record not found' };
    }
    return result.rows[0];
  }

  static async getLowStockItems() {
    const query = `
      SELECT i.*, p.name as part_name, p.sku, w.name as warehouse_name
      FROM inventory i
      JOIN parts p ON i.part_id = p.id
      JOIN warehouses w ON i.warehouse_id = w.id
      WHERE i.quantity <= i.reorder_level
      ORDER BY i.quantity ASC;
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getPartDistribution(partId) {
    const query = `
      SELECT i.*, w.name as warehouse_name, w.location
      FROM inventory i
      JOIN warehouses w ON i.warehouse_id = w.id
      WHERE i.part_id = $1
      ORDER BY i.quantity DESC;
    `;
    const result = await pool.query(query, [partId]);
    return result.rows;
  }

  static async incrementQuantity(id, quantity) {
    const query = `
      UPDATE inventory
      SET quantity = quantity + $2,
          updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [id, quantity]);
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Inventory record not found' };
    }
    return result.rows[0];
  }

  static async decrementQuantity(id, quantity) {
    const query = `
      UPDATE inventory
      SET quantity = GREATEST(0, quantity - $2),
          updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [id, quantity]);
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Inventory record not found' };
    }
    return result.rows[0];
  }
}

module.exports = Inventory;
