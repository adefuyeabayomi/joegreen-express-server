const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  published: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const DishCategory = mongoose.model('DishCategory', dishCategorySchema);
module.exports = DishCategory;
