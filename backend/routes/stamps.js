const express = require('express');
const router = express.Router();
const Stamp = require('../models/stamp');

// Create a new stamp
router.post('/', async (req, res) => {
  try {
    const stamp = new Stamp(req.body);
    await stamp.save();
    res.status(201).json(stamp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve all stamps
router.get('/', async (req, res) => {
  try {
    const stamps = await Stamp.find();
    res.json(stamps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
