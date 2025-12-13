import * as partService from '../services/part.service.js';

export const getParts = (req, res) => {
  const parts = partService.getAllParts();
  res.status(200).json(parts);
};

export const createPart = (req, res) => {
  const { name, description } = req.body;

  // Basic Validation
  if (!name ) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newPart = partService.createPart({ name, breed, age });
  res.status(201).json(newPart);
};

export const updatePart = (req, res) => {
  const { id } = req.params;
  const updatedPart = partService.updatePart(id, req.body);

  if (!updatedPart) {
    return res.status(404).json({ message: 'Part not found' });
  }

  res.status(200).json(updatedPart);
};

export const deletePart = (req, res) => {
  const { id } = req.params;
  const success = PartService.deletePart(id);

  if (!success) {
    return res.status(404).json({ message: 'Part not found' });
  }

  // 204 means "No Content" (Successful delete, no body returned)
  res.status(204).send();
};