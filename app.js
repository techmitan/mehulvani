const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!!!");
  })
  .catch(() => {
    console.log("Something went wrong with Database!!!");
  });

const newsRoute = require("./api/news/newsRoute");
const categoryRoute = require("./api/category/categoryRoute");
const locationRoute = require("./api/location/locationRoute");
const pollRoute = require("./api/poll/pollRoute");
const userRoute = require("./api/user/userRoute");
const featuredNewsRoute = require("./api/newsFeatured/newsRoute");
const advertRoute = require("./api/advertisements/advertRoute");
const videoRoute = require("./api/videoes/videoRoute");
const searchRoute = require("./api/search/searchRoute");
const mediaRoute = require("./api/media/mediaRoute");

app.use("/api/news", newsRoute);
app.use("/api/category", categoryRoute);
app.use("/api/location", locationRoute);
app.use("/api/poll", pollRoute);
app.use("/api/user", userRoute);
app.use("/api/featured-news", featuredNewsRoute);
app.use("/api/advertisement", advertRoute);
app.use("/api/video", videoRoute);
app.use("/api/search", searchRoute);
app.use("/api/media", mediaRoute);

//serving
app.get("/", (req, res) => {
  res.send("MehulVani Server Listening!!!");
});

app.get("*", (req, res) => {
  res.status(404).send("This page does not exist!!!");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(
    `🚀🚀🚀 news server connected and is running at this port... ${PORT}`
  );
});
