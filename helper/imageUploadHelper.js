const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
});

const bufferToStream = (buffer) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};

exports.uploadImageCloud = async (imageFile) => {
  let imgBufferFile = imageFile.buffer;

  // image compression
  const compressedImageBuffer = await sharp(imgBufferFile)
    .webp({ quality: 60 })
    .toBuffer();


  return new Promise((resolve, reject) => {
    // cloudinary upload
    const stream = cloudinary.uploader.upload_stream((err, result) => {
      if (result) {
        resolve(result.secure_url);
      }
      if (err) {
        console.log(err);
        reject(err);
      }
    });
    bufferToStream(compressedImageBuffer).pipe(stream);
  });
};


