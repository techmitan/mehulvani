const mongoose = require("mongoose");
const schema = mongoose.Schema;

const videoSchema = new schema(
  {
    channelId: String,
    api_key: String,
    video: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
