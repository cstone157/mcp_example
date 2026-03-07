const express = require('express');
const router = express.Router();
const partController = require('../controllers/partController');

router.post('/', partController.createPart);
router.get('/search', partController.searchParts);
router.get('/', partController.getAllParts);
router.get('/:id', partController.getPart);
router.put('/:id', partController.updatePart);
router.delete('/:id', partController.deletePart);

module.exports = router;
