const mongoose = require('mongoose');

const addonSchema = new mongoose.Schema({
   name: String,
   price: Number,
});

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  addons: {
    type: [addonSchema],
    default: [],
  },
  price: {
    type: Number,
    default: 0,
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DishCategory', // Ensure this matches your DishCategory model name
  },
  image: {
    type: String,
    default: '', // Assuming an empty string for no image
  },
});

module.exports = mongoose.model('Dish', dishSchema);
