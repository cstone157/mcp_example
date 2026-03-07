const Joi = require('joi');

const partValidator = Joi.object({
  name: Joi.string().required().min(1).max(255),
  description: Joi.string().allow('').max(500),
  sku: Joi.string().required().min(1).max(100),
  unit_cost: Joi.number().required().positive(),
  supplier: Joi.string().max(255),
});

const warehouseValidator = Joi.object({
  name: Joi.string().required().min(1).max(255),
  location: Joi.string().required().min(1).max(255),
  capacity: Joi.number().required().integer().positive(),
  description: Joi.string().allow('').max(500),
});

const inventoryValidator = Joi.object({
  part_id: Joi.number().required().integer().positive(),
  warehouse_id: Joi.number().required().integer().positive(),
  quantity: Joi.number().required().integer().min(0),
  reorder_level: Joi.number().integer().min(0),
  reorder_quantity: Joi.number().integer().positive(),
});

const inventoryUpdateValidator = Joi.object({
  quantity: Joi.number().required().integer().min(0),
  reorder_level: Joi.number().integer().min(0),
  reorder_quantity: Joi.number().integer().positive(),
});

module.exports = {
  partValidator,
  warehouseValidator,
  inventoryValidator,
  inventoryUpdateValidator,
};
