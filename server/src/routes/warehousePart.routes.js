import express from 'express';
import { 
  getWarehouseParts, 
  createWarehousePart, 
  updateWarehousePart, 
  deleteWarehousePart 
} from '../controllers/warehousePart.controller.js';

const router = express.Router();

// Define routes
router.get('/', getWarehouseParts);
router.post('/', createWarehousePart);
router.put('/:id', updateWarehousePart);
router.delete('/:id', deleteWarehousePart);

export default router;