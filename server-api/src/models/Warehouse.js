const pool = require('../utils/database');

class Warehouse {
  static async create(warehouseData) {
    const { name, location, capacity, description } = warehouseData;
    const query = `
      INSERT INTO warehouses (name, location, capacity, description, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING *;
    `;
    const result = await pool.query(query, [name, location, capacity, description || '']);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM warehouses WHERE id = $1;';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Warehouse not found' };
    }
    return result.rows[0];
  }

  static async findAll(limit = 100, offset = 0) {
    const query = 'SELECT * FROM warehouses ORDER BY id DESC LIMIT $1 OFFSET $2;';
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  }

  static async update(id, warehouseData) {
    const { name, location, capacity, description } = warehouseData;
    const query = `
      UPDATE warehouses
      SET name = COALESCE($2, name),
          location = COALESCE($3, location),
          capacity = COALESCE($4, capacity),
          description = COALESCE($5, description),
          updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [id, name, location, capacity, description]);
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Warehouse not found' };
    }
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM warehouses WHERE id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Warehouse not found' };
    }
    return result.rows[0];
  }

  static async getCapacityUsage(warehouseId) {
    const query = `
      SELECT 
        w.id,
        w.name,
        w.capacity,
        COALESCE(SUM(i.quantity), 0) as used_capacity,
        w.capacity - COALESCE(SUM(i.quantity), 0) as available_capacity
      FROM warehouses w
      LEFT JOIN inventory i ON w.id = i.warehouse_id
      WHERE w.id = $1
      GROUP BY w.id, w.name, w.capacity;
    `;
    const result = await pool.query(query, [warehouseId]);
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Warehouse not found' };
    }
    return result.rows[0];
  }
}

module.exports = Warehouse;
