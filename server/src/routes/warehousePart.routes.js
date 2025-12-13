import express from 'express';
import { 
  getWarehousePartss, 
  createWarehouseParts, 
  updateWarehouseParts, 
  deleteWarehouseParts 
} from '../controllers/warehouseParts.controller.js';

const router = express.Router();

// Define routes
router.get('/', getWarehousePartss);
router.post('/', createWarehouseParts);
router.put('/:id', updateWarehouseParts);
router.delete('/:id', deleteWarehouseParts);

export default router;