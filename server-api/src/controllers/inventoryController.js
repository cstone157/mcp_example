const Inventory = require('../models/Inventory');
const { inventoryValidator, inventoryUpdateValidator } = require('../utils/validators');

exports.createInventory = async (req, res, next) => {
  try {
    const { error, value } = inventoryValidator.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      });
    }

    const inventory = await Inventory.create(value);
    res.status(201).json(inventory);
  } catch (err) {
    next(err);
  }
};

exports.getInventory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findById(id);
    res.json(inventory);
  } catch (err) {
    next(err);
  }
};

exports.getAllInventory = async (req, res, next) => {
  try {
    const { limit = 100, offset = 0 } = req.query;
    const inventory = await Inventory.findAll(parseInt(limit), parseInt(offset));
    res.json(inventory);
  } catch (err) {
    next(err);
  }
};

exports.getInventoryByWarehouse = async (req, res, next) => {
  try {
    const { warehouseId } = req.params;
    const { limit = 100, offset = 0 } = req.query;
    const inventory = await Inventory.findByWarehouse(warehouseId, parseInt(limit), parseInt(offset));
    res.json(inventory);
  } catch (err) {
    next(err);
  }
};

exports.getInventoryByPart = async (req, res, next) => {
  try {
    const { partId } = req.params;
    const { limit = 100, offset = 0 } = req.query;
    const inventory = await Inventory.findByPart(partId, parseInt(limit), parseInt(offset));
    res.json(inventory);
  } catch (err) {
    next(err);
  }
};

exports.updateInventory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = inventoryUpdateValidator.validate(req.body, { 
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

    const inventory = await Inventory.update(id, value);
    res.json(inventory);
  } catch (err) {
    next(err);
  }
};

exports.deleteInventory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Inventory.delete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getLowStockItems = async (req, res, next) => {
  try {
    const lowStockItems = await Inventory.getLowStockItems();
    res.json(lowStockItems);
  } catch (err) {
    next(err);
  }
};

exports.getPartDistribution = async (req, res, next) => {
  try {
    const { partId } = req.params;
    const distribution = await Inventory.getPartDistribution(partId);
    res.json(distribution);
  } catch (err) {
    next(err);
  }
};

exports.incrementQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be a positive number' });
    }

    const inventory = await Inventory.incrementQuantity(id, quantity);
    res.json(inventory);
  } catch (err) {
    next(err);
  }
};

exports.decrementQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be a positive number' });
    }

    const inventory = await Inventory.decrementQuantity(id, quantity);
    res.json(inventory);
  } catch (err) {
    next(err);
  }
};
