const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
});
model.exports = mongoose.model('Product', ProductSchema);