const router = require("express").Router();
const controller = require("./newsController");

const { uploadImage } = require("../../middleware/imageUpload");

router.route("/:id").get(controller.getNews);

router
  .route("/")
  .get(controller.getAllNews)
  .post(uploadImage, controller.addNews)

  .delete(controller.deleteAllNews);

router.put("/:id", uploadImage, controller.updateNews);

router.get("/home/get", controller.getHomeNews);

module.exports = router;

