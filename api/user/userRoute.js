const router = require("express").Router();
const controller = require("./userController");
const { uploadImage } = require("../../helper/imageUpload");

router.post("/register", controller.registerUser);
router.post("/sign-in", controller.signInUser);
router.get("/refresh-auth", controller.refreshAuth);

router.get("/get-all", controller.getAllUsers);
router.put("/:id/approve", controller.updateStatus);
router.put(
  "/:id/update-profile",
  uploadImage.single("image"),
  controller.updateUser
);


module.exports = router;
