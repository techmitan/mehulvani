const router = require("express").Router();
const controller = require("./categoryController");
const { uploadImage } = require("../../middleware/imageUpload");

router.route("/").post(uploadImage, controller.addCategory).get(controller.getCategories);

router
  .route("/:id")
  .put(uploadImage, controller.updateCategory);

router.route("/:id/status").put(controller.updateStatus);

module.exports = router;
