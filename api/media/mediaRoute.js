const router = require("express").Router();
const { uploadImage } = require("../../helper/imageUpload");

router.post("/", uploadImage.single("image"), (req, res) => {
  const imageUrl = req.file.location;
  res.json({ success: true, url: imageUrl });
});

module.exports = router;
