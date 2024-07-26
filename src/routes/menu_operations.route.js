const express = require('express');
const router = express.Router();
const verifyToken = require('../functions/verifyToken.middleware');
const uploadImages = require('../functions/fileupload.middleware');
const menuOperationsController = require('../controllers/menu_operations.controller');

// Get all dishes
router.get('/dishes', menuOperationsController.getDishes);

// Get dish by ID
router.get('/dishes/:id', menuOperationsController.getDishById);

// Create a new dish
router.post('/dishes', verifyToken, menuOperationsController.createDish);

// Update a dish
router.put('/dishes/:id', verifyToken, menuOperationsController.updateDish);

// Update dish image
router.put('/dishes/:id/image', verifyToken, uploadImages, menuOperationsController.updateDishImage);

// Get all categories
router.get('/categories', menuOperationsController.getAllCategory);

// Get category by ID
router.get('/categories/:id', menuOperationsController.getCategoryById);

// Create a new category
router.post('/categories', verifyToken, menuOperationsController.createCategory);

// Update a category
router.put('/categories/:id', verifyToken, menuOperationsController.updateCategory);

// Delete a dish or category
router.delete('/items/:type/:id', verifyToken, menuOperationsController.deleteDishOrCategory);

module.exports = router;
