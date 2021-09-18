const router = require("express").Router();
const controller = require("./videoController");

router.route("/").post(controller.addVideo);

router.get("/", controller.getVideo);
router.put("/:id", controller.updateVideo);

module.exports = router;
