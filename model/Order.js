const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    order_no: {
      type: String,
      required: true,
    },
    order_items: {
      type: String,
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_email: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    payment: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", OrderSchema);
