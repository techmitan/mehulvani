const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    full_name: String,
    email: String,
    password: String,
    profileImageUrl: String,
    reset_password_token: String,
    role: { type: String, default: "User" },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
