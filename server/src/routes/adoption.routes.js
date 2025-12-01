import express from 'express';
import { createAdoption, deleteAdoption } from '../controllers/adoption.controller.js';

const router = express.Router();

// POST /api/adoptions -> Link a cat to a person
router.post('/', createAdoption);

// DELETE /api/adoptions/:catId -> Remove the link (surrender cat)
router.delete('/:catId', deleteAdoption);

export default router;