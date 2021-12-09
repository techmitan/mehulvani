const router = require("express").Router();
const { uploadImage } = require("../../middleware/imageUpload");
const { uploadImageCloud } = require("../../helper/imageUploadHelper");

router.post("/", uploadImage, async (req, res) => {

  let imageUrl = "";
  if (req.file) {
    imageUrl = await uploadImageCloud(req.file);
    console.log("done");
  }
  res.json({ success: true, url: imageUrl });
});

module.exports = router;
