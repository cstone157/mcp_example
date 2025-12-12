// src/controllers/warehouse.controller.js
import * as warehouseService from '../services/warehouse.service.js';

export const getWarehouses = (req, res) => {
  const warehouses = warehouseService.getAllWarehouses();
  res.status(200).json(warehouses);
};

export const createWarehouse = (req, res) => {
  const { name, street, city, state, zip } = req.body;

  // Basic Validation
  if (!name || !state) {
    return res.status(400).json({ message: 'Name and state are required' });
  }

  const newWarehouse = warehouseService.createWarehouse({ name, breed, age });
  res.status(201).json(newWarehouse);
};

export const updateWarehouse = (req, res) => {
  const { id } = req.params;
  const updatedWarehouse = warehouseService.updateWarehouse(id, req.body);

  if (!updatedWarehouse) {
    return res.status(404).json({ message: 'Warehouse not found' });
  }

  res.status(200).json(updatedWarehouse);
};

export const deleteWarehouse = (req, res) => {
  const { id } = req.params;
  const success = warehouseService.deleteWarehouse(id);

  if (!success) {
    return res.status(404).json({ message: 'Warehouse not found' });
  }

  // 204 means "No Content" (Successful delete, no body returned)
  res.status(204).send();
};