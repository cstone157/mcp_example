import express from 'express';
import { 
  getPeople, 
  createPerson, 
  updatePerson, 
  deletePerson 
} from '../controllers/people.controller.js';

const router = express.Router();

router.get('/', getPeople);
router.post('/', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

export default router;