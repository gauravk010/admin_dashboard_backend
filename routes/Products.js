const express = require("express");
const Products = require("../model/Products");
const router = express.Router();

// ROUTE 1: Get all products using: GET "/admin/get-products". Login required
router.get("/get-products", async (req, res) => {
  try {
    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    if (status) {
      const data = await Products.find({ status: status })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      const dataLength = await Products.find({ status: status });
      res.status(200).json({ result: data, length: dataLength.length, sr_no: skip});
    } else {
      const data = await Products.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      const dataLength = await Products.find({});
      res.status(200).json({ result: data, length: dataLength.length, sr_no: skip });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// ROUTE 2: Add product  using: POST "/admin/add-product". Login required
router.post("/add-product", async (req, res) => {
  try {
    let product = new Products({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      status: req.body.status,
      size: req.body.size,
    });
    const response = await product.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// ROUTE 3: Get product by ID using: GET "/admin/get-products". Login required
router.get("/get-product/:id", async (req, res) => {
  try {
    const response = await Products.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// ROUTE 4: Update product by ID using: GET "/admin/edit-product/:id". Login required
router.put("/edit-product/:id", async (req, res) => {
  try {
    const UpdatedProduct = {};
    if (req.body.name) {
      UpdatedProduct.name = req.body.name;
    }
    if (req.body.category) {
      UpdatedProduct.category = req.body.category;
    }
    if (req.body.description) {
      UpdatedProduct.description = req.body.description;
    }
    if (req.body.price) {
      UpdatedProduct.price = req.body.price;
    }
    if (req.body.quantity) {
      UpdatedProduct.quantity = req.body.quantity;
    }
    if (req.body.status) {
      UpdatedProduct.status = req.body.status;
    }
    if (req.body.size) {
      UpdatedProduct.size = req.body.size;
    }

    const response = await Products.findByIdAndUpdate(
      req.params.id,
      UpdatedProduct
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// ROUTE 5: Delete product by ID using: GET "/admin/delete-product/:id". Login required
router.delete("/delete-product/:id", async (req, res) => {
  try {
    const response = await Products.findByIdAndDelete(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
