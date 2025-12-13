import * as warehousePartService from '../services/warehousePart.service.js';

export const getwarehouseParts = (req, res) => {
  const warehouseParts = warehousePartService.getAllwarehouseParts();
  res.status(200).json(warehouseParts);
};

export const createwarehousePart = (req, res) => {
  const { name, description } = req.body;

  // Basic Validation
  if (!name ) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newWarehousePart = warehousePartService.createWarehousePart({ partId, warehouseId, number, row, shelf });
  res.status(201).json(newWarehousePart);
};

export const updateWarehousePart = (req, res) => {
  const { id } = req.params;
  const updatedWarehousePart = warehousePartService.updateWarehousePart(id, req.body);

  if (!updatedWarehousePart) {
    return res.status(404).json({ message: 'WarehousePart not found' });
  }

  res.status(200).json(updatedWarehousePart);
};

export const deleteWarehousePart = (req, res) => {
  const { id } = req.params;
  const success = warehousePartService.deleteWarehousePart(id);

  if (!success) {
    return res.status(404).json({ message: 'WarehousePart not found' });
  }

  // 204 means "No Content" (Successful delete, no body returned)
  res.status(204).send();
};