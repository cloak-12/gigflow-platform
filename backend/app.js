require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://gigflow-platform.vercel.app"
  ],
  credentials: true
}));


app.use(express.json());      // ✅ THIS LINE IS REQUIRED
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/gigs", require("./routes/gigRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));

module.exports = app;
