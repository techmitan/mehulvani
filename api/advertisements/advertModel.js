const mongoose = require("mongoose");
const schema = mongoose.Schema;

const advertSchema = new schema(
  {
    imageUrl: { type: String },
    ad_type: String,
    ad_url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Advertisement", advertSchema);
