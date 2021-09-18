const router = require("express").Router();
const controller = require("./advertController");
const { uploadImage } = require("../../helper/imageUpload");

router.route("/").post(controller.addAdvert).get(controller.getAdverts);

router.put("/:id", uploadImage.single("image"), controller.updateAd);
router.get("/:id", controller.getOne);


module.exports = router;
