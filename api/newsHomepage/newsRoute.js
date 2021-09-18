const router = require("express").Router();
const controller = require("./newsController");

router.get("/news-home", controller.getHomeNews);
