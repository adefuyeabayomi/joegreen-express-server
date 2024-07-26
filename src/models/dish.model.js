const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  addons: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: '', // Assuming an empty string for no image
  },
});

module.exports = mongoose.model('Dish', dishSchema);
