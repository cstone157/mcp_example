import express from 'express';
import { 
  getParts, 
  createPart, 
  updatePart, 
  deletePart 
} from '../controllers/part.controller.js';

const router = express.Router();

// Define routes
router.get('/', getParts);
router.post('/', createPart);
router.put('/:id', updatePart);
router.delete('/:id', deletePart);

export default router;