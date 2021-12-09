const router = require("express").Router();
const controller = require("./advertController");
const { uploadImage } = require("../../middleware/imageUpload");

router.route("/").post(uploadImage, controller.addAdvert).get(controller.getAdverts);

router.put("/:id", uploadImage, controller.updateAd);
router.get("/:id", controller.getOne);


module.exports = router;
