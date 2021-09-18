const router = require("express").Router();
const controller = require("./newsController");

const { uploadImage } = require("../../helper/imageUpload");

router.route("/:id").get(controller.getNews);

router
  .route("/")
  .get(controller.getAllNews)
  .post(uploadImage.single("image"), controller.addNews)

  .delete(controller.deleteAllNews);

router.put("/:id", uploadImage.single("image"), controller.updateNews);

router.get("/home/get", controller.getHomeNews);

module.exports = router;
