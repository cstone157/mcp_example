const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/', inventoryController.createInventory);
router.get('/low-stock', inventoryController.getLowStockItems);
router.get('/', inventoryController.getAllInventory);
router.get('/distribution/:partId', inventoryController.getPartDistribution);
router.get('/:id', inventoryController.getInventory);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);
router.post('/:id/increment', inventoryController.incrementQuantity);
router.post('/:id/decrement', inventoryController.decrementQuantity);

// Nested routes for warehouse and part specific inventory
router.get('/warehouse/:warehouseId', inventoryController.getInventoryByWarehouse);
router.get('/part/:partId', inventoryController.getInventoryByPart);

module.exports = router;
