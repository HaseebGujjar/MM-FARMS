const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  products: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  customerName: String,
  customerEmail: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
