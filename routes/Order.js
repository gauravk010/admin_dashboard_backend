const express = require("express");
const Orders = require("../model/Order");
const router = express.Router();

// ROUTE 1: Get all orders using: GET "/admin/get-orders". Login required
router.get("/get-orders", async (req, res) => {
  try {
    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    if (status) {
      const data = await Orders.find({ status: status })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);
      const dataLength = await Orders.find({ status: status });
      res
        .status(200)
        .json({ result: data, length: dataLength.length, sr_no: skip });
    } else {
      const data = await Orders.find({})
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);
      const dataLength = await Orders.find({});
      res
        .status(200)
        .json({ result: data, length: dataLength.length, sr_no: skip });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
