const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Transaction = require('../models/Transaction');
const Barcode = require('../models/Barcode');
const bwipjs = require('bwip-js');

// Add a new batch of items
router.post('/add-batch', async (req, res) => {
  try {
    const { name, description, category, quantity, price, supplier } = req.body;

    // Generate barcode
    const batchId = new Date().getTime().toString();  // Simple unique ID for the batch
    const barcodeData = `${name}-${batchId}-${quantity}`;
    const barcode = await new Promise((resolve, reject) => {
      bwipjs.toBuffer({
        bcid: 'code128',       // Barcode type
        text: barcodeData,     // Text to encode
        scale: 3,              // 3x scaling factor
        height: 10,            // Bar height, in millimeters
        includetext: true,     // Show human-readable text
        textxalign: 'center',  // Center-align the text
      }, (err, png) => {
        if (err) {
          reject(err);
        } else {
          resolve(png);
        }
      });
    });

    // Save barcode to the database
    const barcodeDoc = new Barcode({
      itemId: batchId,
      barcode: barcodeData,
      generatedAt: new Date(),
    });
    await barcodeDoc.save();

    // Add items to the inventory
    const item = new Item({
      name,
      description,
      category,
      quantity,
      price,
      supplier,
      barcode: barcodeData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await item.save();

    res.status(201).send({ message: 'Batch added successfully', barcode: barcodeData });
  } catch (error) {
    res.status(500).send({ error: 'Failed to add batch' });
  }
});

// TODO: Add other CRUD routes (get items, update item, delete item, etc.)

module.exports = router;
