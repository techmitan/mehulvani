const router = require("express").Router();
const controller = require("./searchController");

router.get("/", controller.searchNews);

module.exports = router;
