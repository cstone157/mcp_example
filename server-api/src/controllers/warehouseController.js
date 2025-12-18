const Warehouse = require('../models/Warehouse');
const { warehouseValidator } = require('../utils/validators');

exports.createWarehouse = async (req, res, next) => {
  try {
    const { error, value } = warehouseValidator.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      });
    }

    const warehouse = await Warehouse.create(value);
    res.status(201).json(warehouse);
  } catch (err) {
    next(err);
  }
};

exports.getWarehouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const warehouse = await Warehouse.findById(id);
    res.json(warehouse);
  } catch (err) {
    next(err);
  }
};

exports.getAllWarehouses = async (req, res, next) => {
  try {
    const { limit = 100, offset = 0 } = req.query;
    const warehouses = await Warehouse.findAll(parseInt(limit), parseInt(offset));
    res.json(warehouses);
  } catch (err) {
    next(err);
  }
};

exports.updateWarehouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = warehouseValidator.validate(req.body, { 
      abortEarly: false,
      presence: 'optional'
    });

    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      });
    }

    const warehouse = await Warehouse.update(id, value);
    res.json(warehouse);
  } catch (err) {
    next(err);
  }
};

exports.deleteWarehouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Warehouse.delete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getCapacityUsage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const capacityUsage = await Warehouse.getCapacityUsage(id);
    res.json(capacityUsage);
  } catch (err) {
    next(err);
  }
};
