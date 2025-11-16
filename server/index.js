const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config();

const authRoutes = require("./routes/auth")
const uploadRoutes= require("./routes/upload")
const paymentRoutes = require("./routes/Payment")


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api",uploadRoutes);
app.use("/api", paymentRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(8000, () => {
      console.log(" Server is running on port 8000");
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });
