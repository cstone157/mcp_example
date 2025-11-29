// src/controllers/cat.controller.js
import * as catService from '../services/cat.service.js';

export const getCats = (req, res) => {
  const cats = catService.getAllCats();
  res.status(200).json(cats);
};

export const createCat = (req, res) => {
  const { name, breed, age } = req.body;

  // Basic Validation
  if (!name || !breed) {
    return res.status(400).json({ message: 'Name and breed are required' });
  }

  const newCat = catService.createCat({ name, breed, age });
  res.status(201).json(newCat);
};

export const updateCat = (req, res) => {
  const { id } = req.params;
  const updatedCat = catService.updateCat(id, req.body);

  if (!updatedCat) {
    return res.status(404).json({ message: 'Cat not found' });
  }

  res.status(200).json(updatedCat);
};

export const deleteCat = (req, res) => {
  const { id } = req.params;
  const success = catService.deleteCat(id);

  if (!success) {
    return res.status(404).json({ message: 'Cat not found' });
  }

  // 204 means "No Content" (Successful delete, no body returned)
  res.status(204).send();
};