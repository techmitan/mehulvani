const router = require("express").Router();
const controller = require("./categoryController");
const { uploadImage } = require("../../helper/imageUpload");

router.route("/").post(controller.addCategory).get(controller.getCategories);

router
  .route("/:id")
  .put(uploadImage.single("image"), controller.updateCategory);
router.route("/:id/status").put(controller.updateStatus);

module.exports = router;
