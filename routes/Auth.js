const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/AuthenticateUser");
const secret = "gaurav";
const router = express.Router();

// route 1: Create a User using: POST "/register".
router.post("/register", async (req, res) => {
  let success = false;

  // check to find if user already exist or not
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send({ success, error: "Email Id already exists" });
  }

  //  converting password into hash
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);

  // creating a new user
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: secPass,
  });

  let result = await user.save();

  const data = {
    user: {
      id: user._id.toString(),
      username: user.username,
    },
  };

  success = true;
  const token = jwt.sign(data, secret);
  res.send({ success, token });
});

// route 2: Authenticate a User using: POST "/login".
router.post("/login", async (req, res) => {
  let success = false;

  // check to find if user already exist or not
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(400)
      .send({ message: "Please try to login with correct credentials" });
  }

  // check to find if password is correct or not
  const comparePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!comparePassword) {
    return res
      .status(400)
      .send({ message: "Please try to login with correct credentials" });
  }

  const data = {
    user: {
      id: user._id.toString(),
      username: user.username,
    },
  };

  success = true;
  const token = jwt.sign(data, secret);
  res.send({ success, token });
});

// route 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.get("/getuser", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// route 4: Get all User Details using: POST "/api/auth/getuser". Login required
router.get("/getusers", authenticate, async (req, res) => {
  try {
    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    if (status) {
      const user = await User.find({ status: status })
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);
      const dataLength = await User.find({ status: status });
      res
        .status(200)
        .json({ result: user, length: dataLength.length, sr_no: skip });
    } else {
      const user = await User.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      const dataLength = await User.find({});
      res
        .status(200)
        .json({ result: user, length: dataLength.length, sr_no: skip });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// route 5: Add User from dashboard using: POST "/api/add-user". Login required
router.post("/add-user", async (req, res) => {
  try {
    // check to find if user already exist or not
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .send({ success, error: "Email Id already exists" });
    }

    //  converting password into hash
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    let userData = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: secPass,
      contact: req.body.contact,
      role: req.body.role,
      status: req.body.status,
    });
    const response = await userData.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// router 6: Get all User Details using: POST "/api/auth/getuser". Login required
router.get("/get-user/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// router 7: Update User Details using: POST "/api/auth/edit-user/:id". Login required
router.put("/edit-user/:id", async (req, res) => {
  try {
    const UpdatedUser = {};
    if (req.body.fullname) {
      UpdatedUser.fullname = req.body.fullname;
    }
    if (req.body.description) {
      UpdatedUser.description = req.body.description;
    }
    if (req.body.username) {
      UpdatedUser.username = req.body.username;
    }
    if (req.body.email) {
      UpdatedUser.email = req.body.email;
    }
    if (req.body.contact) {
      UpdatedUser.contact = req.body.contact;
    }
    if (req.body.role) {
      UpdatedUser.role = req.body.role;
    }
    if (req.body.status) {
      UpdatedUser.status = req.body.status;
    }

    const response = await User.findByIdAndUpdate(req.params.id, UpdatedUser);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// ROUTE 8: Delete user by ID using: GET "/admin/delete-user/:id". Login required
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
