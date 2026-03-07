const pool = require('../utils/database');

class Part {
  static async create(partData) {
    const { name, description, sku, unit_cost, supplier } = partData;
    const query = `
      INSERT INTO parts (name, description, sku, unit_cost, supplier, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *;
    `;
    const result = await pool.query(query, [name, description || '', sku, unit_cost, supplier || '']);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM parts WHERE id = $1;';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Part not found' };
    }
    return result.rows[0];
  }

  static async findAll(limit = 100, offset = 0) {
    const query = 'SELECT * FROM parts ORDER BY id DESC LIMIT $1 OFFSET $2;';
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  }

  static async update(id, partData) {
    const { name, description, sku, unit_cost, supplier } = partData;
    const query = `
      UPDATE parts
      SET name = COALESCE($2, name),
          description = COALESCE($3, description),
          sku = COALESCE($4, sku),
          unit_cost = COALESCE($5, unit_cost),
          supplier = COALESCE($6, supplier),
          updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [id, name, description, sku, unit_cost, supplier]);
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Part not found' };
    }
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM parts WHERE id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      throw { status: 404, message: 'Part not found' };
    }
    return result.rows[0];
  }

  static async search(query) {
    const sql = `
      SELECT * FROM parts
      WHERE name ILIKE $1 OR sku ILIKE $1 OR description ILIKE $1
      ORDER BY id DESC;
    `;
    const result = await pool.query(sql, [`%${query}%`]);
    return result.rows;
  }
}

module.exports = Part;
