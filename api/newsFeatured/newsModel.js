const mongoose = require("mongoose");
const schema = mongoose.Schema;

const featuredNewsSchema = new schema(
  {
    news: [{ type: schema.Types.ObjectId, ref: "News" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeaturedNews", featuredNewsSchema);
