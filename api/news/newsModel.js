const mongoose = require("mongoose");
const schema = mongoose.Schema;

const newsSchema = new schema(
  {
    title: String,
    category: { type: schema.Types.ObjectId, ref: "Category" },
    location: { type: String },
    published_date: Date,
    imageUrl: String,
    content: String,
    author: { type: schema.Types.ObjectId, ref: "User" },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
