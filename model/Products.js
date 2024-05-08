const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    img: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
