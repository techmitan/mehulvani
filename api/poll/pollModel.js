const mongoose = require("mongoose");
const schema = mongoose.Schema;

const pollSchema = new schema(
  {
    question: String,
    yes: { type: Number, default: 0 },
    yes_percentage: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    no_percentage: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Poll", pollSchema);
