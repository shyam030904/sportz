const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Create new order
router.post('/create', async (req, res) => {
  try {
    const { customerInfo, items, totalAmount } = req.body;
    
    const orderId = 'MSS' + Date.now();
    
    const order = new Order({
      customerInfo,
      items,
      totalAmount,
      orderId
    });
    
    await order.save();
    
    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      orderId: orderId,
      order: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error placing order',
      error: error.message
    });
  }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;