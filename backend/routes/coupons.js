// routes/coupons.js
const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const adminAuth = require('../middleware/adminAuth');

// GET all active coupons (public)
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    console.error('Get coupons error:', error);
    res.status(500).json({ message: 'Failed to fetch coupons' });
  }
});

// VALIDATE coupon (public)
router.post('/validate', async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({ valid: false, message: 'Invalid coupon code' });
    }

    if (subtotal < coupon.minSubtotal) {
      return res.status(400).json({
        valid: false,
        message: `Minimum order value is ₹${coupon.minSubtotal}`,
      });
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
    } else {
      discount = coupon.discountValue;
    }

    discount = Math.min(discount, subtotal);

    res.json({
      valid: true,
      coupon: {
        code: coupon.code,
        label: coupon.label,
        discount,
      },
    });
  } catch (error) {
    console.error('Validate coupon error:', error);
    res.status(500).json({ valid: false, message: 'Validation failed' });
  }
});

// ADMIN: Get all coupons (including inactive)
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    console.error('Get all coupons error:', error);
    res.status(500).json({ message: 'Failed to fetch coupons' });
  }
});

// ADMIN: Create coupon
router.post('/admin/create', adminAuth, async (req, res) => {
  try {
    const { code, label, discountType, discountValue, minSubtotal } = req.body;

    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }

    const coupon = new Coupon({
      code: code.toUpperCase(),
      label,
      discountType,
      discountValue,
      minSubtotal: minSubtotal || 0,
    });

    await coupon.save();
    res.json({ success: true, coupon });
  } catch (error) {
    console.error('Create coupon error:', error);
    res.status(500).json({ message: 'Failed to create coupon' });
  }
});

// ADMIN: Update coupon
router.put('/admin/:id', adminAuth, async (req, res) => {
  try {
    const { label, discountType, discountValue, minSubtotal, isActive } = req.body;

    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { label, discountType, discountValue, minSubtotal, isActive },
      { new: true }
    );

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.json({ success: true, coupon });
  } catch (error) {
    console.error('Update coupon error:', error);
    res.status(500).json({ message: 'Failed to update coupon' });
  }
});

// ADMIN: Delete coupon
router.delete('/admin/:id', adminAuth, async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete coupon error:', error);
    res.status(500).json({ message: 'Failed to delete coupon' });
  }
});

module.exports = router;
