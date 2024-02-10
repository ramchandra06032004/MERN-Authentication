require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoute = require("./routes/users");
const authRoutes = require("./routes/auth");

connection();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
