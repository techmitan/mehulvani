const multer = require("multer");

module.exports = {
    uploadImage: multer().single("image"),
};
