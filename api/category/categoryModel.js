const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new schema(
  {
    title: String,
    imageUrl: String,
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
