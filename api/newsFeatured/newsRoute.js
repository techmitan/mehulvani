const router = require("express").Router();
const controller = require("./newsController");

router.post("/", controller.addFeaturedNews);
router.get("/", controller.getFeaturedNews);
router.delete("/", controller.removeFeaturedNews);

module.exports = router;
