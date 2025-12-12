// src/routes/cat.routes.js
import express from 'express';
import { 
  getCats, 
  createCat, 
  updateCat, 
  deleteCat 
} from '../controllers/cat.controller.js';

const router = express.Router();

// Define routes
router.get('/', getCats);
router.post('/', createCat);
router.put('/:id', updateCat);
router.delete('/:id', deleteCat);

export default router;