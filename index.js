const express = require("express");
require("./config/config");
const cors = require("cors");
const AuthRoute = require("./routes/Auth");
const ProductRoute = require("./routes/Products");
const OrderRoute = require("./routes/Order");
const CommonRoute = require("./routes/Common");
const authenticate = require("./middleware/AuthenticateUser");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.use("/admin", AuthRoute);
app.use("/admin", authenticate, ProductRoute);
app.use("/admin", authenticate, OrderRoute);
app.use("/admin", authenticate, CommonRoute);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
