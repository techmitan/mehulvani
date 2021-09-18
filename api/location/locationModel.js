const mongoose = require("mongoose");
const schema = mongoose.Schema;

const locationSchema = new schema(
  {
    title: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
