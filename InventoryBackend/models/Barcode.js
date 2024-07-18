const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BarcodeSchema = new Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  barcode: { type: String, required: true, unique: true },
  generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Barcode', BarcodeSchema);
