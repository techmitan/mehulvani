const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

exports.uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: "cg24x7news",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  }),
});
