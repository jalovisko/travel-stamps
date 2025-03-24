const mongoose = require('mongoose');

const StampSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  entryDate: Date,
  exitDate: Date,
  purpose: String,
  icon: { type: String, required: true },  // URL or file path for the icon
  color: { type: String, required: true }
});

module.exports = mongoose.model('Stamp', StampSchema);
