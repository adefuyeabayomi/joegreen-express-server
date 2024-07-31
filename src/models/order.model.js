const mongoose = require('mongoose');
const { Schema } = mongoose;

const addonSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const cartItemSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: 'Dish' },
  name: String,
  addons: [addonSchema],
  description: String,
  price: Number,
  published: Boolean,
  category: String,
  image: String,
  message: String,
  quantity: Number,
})

const orderSchema = new Schema({
  cartItems: [cartItemSchema],
  phoneNumber: { type: String, required: true },
  deliveryInfo: { type: String, required: true },
  narration: String,
  transactionRef: { type: String, unique: true },
  paymentRef: { type: String, unique: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  cancelled: { type: Boolean, default: false },
  fulfilled: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);