const express = require('express');
const router = express.Router();
const { createOrder, updateOrder, getOrderById, getAllOrders } = require('../controllers/order.controller');
const verifyToken = require('../functions/verifyToken.middleware');

// Create a new order
router.post('/order', verifyToken, createOrder);

// Update an existing order
router.put('/order/:orderId', verifyToken, updateOrder);

// Get order by ID
router.get('/order/:orderId', verifyToken, getOrderById);

// Get all orders
router.get('/order', verifyToken, getAllOrders);

module.exports = router;
