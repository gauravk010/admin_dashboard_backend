const express = require("express");
const Orders = require("../model/Order");
const Products = require("../model/Products");
const User = require("../model/User");
const Order = require("../model/Order");
const router = express.Router();

// ROUTE 1: Get all stats using: GET "/admin/get-stats". Login required
router.get("/get-stats", async (req, res) => {
  try {
    const ProductsLength = await Products.find({});
    const OrdersLength = await Orders.find({});
    const UsersLength = await User.find({});
    res.status(200).json({
      products: ProductsLength.length,
      orders: OrdersLength.length,
      users: UsersLength.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// ROUTE 2: Get stats for piechart using: GET "/admin/get-stats". Login required
router.get("/get-product-stats", async (req, res) => {
  try {
    const Cat_One_Length = await Products.find({
      category: "Mobiles, Computers",
    });
    const Cat_Two_Length = await Products.find({
      category: "TV, Appliances, Electronics",
    });
    const Cat_three_Length = await Products.find({
      category: "Beauty, Health, Grocery",
    });
    const Cat_four_Length = await Products.find({ category: "Books" });
    const data = [
      {
        name: "Mobiles, Computers",
        products: Cat_One_Length.length,
      },
      {
        name: "TV, Appliances, Electronics",
        products: Cat_Two_Length.length,
      },
      {
        name: "Beauty, Health, Grocery",
        products: Cat_three_Length.length,
      },
      {
        name: "Books",
        products: Cat_four_Length.length,
      },
    ];
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// ROUTE 2: Get stats for barchart using: GET "/admin/get-stats". Login required
router.get("/get-order-stats", async (req, res) => {
  try {
    const Cat_One_Length = await Order.find({
      category: "Mobiles, Computers",
    });
    const Cat_Two_Length = await Order.find({
      category: "TV, Appliances, Electronics",
    });
    const Cat_three_Length = await Order.find({
      category: "Beauty, Health, Grocery",
    });
    const Cat_four_Length = await Order.find({ category: "Books" });
    const data = [
      {
        name: "Mobiles, Computers",
        orders: Cat_One_Length.length,
      },
      {
        name: "TV, Appliances, Electronics",
        orders: Cat_Two_Length.length,
      },
      {
        name: "Beauty, Health, Grocery",
        orders: Cat_three_Length.length,
      },
      {
        name: "Books",
        orders: Cat_four_Length.length,
      },
    ];
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
