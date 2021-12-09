const User = require("./userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { uploadImageCloud } = require("../../helper/imageUploadHelper");

exports.registerUser = async (req, res) => {
  const newUser = new User({
    full_name: req.body.full_name,
    email: req.body.email,
    location: req.body.location,
    role: "newUser",
  });

  // first check if email is already registered

  const plainPassword = req.body.password;

  try {
    const getUser = await User.findOne({ email: req.body.email });
    if (getUser) {
      res.json({
        success: false,
        message: "The email is already registered!!!",
      });
    } else {
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

      newUser.password = hashedPassword;
      const addedUser = await newUser.save();
      res.json({ success: true, addedUser });
    }
  } catch (error) {
    console.log(error);
  }
};

const getToken = async (userId) => {
  const token = await jwt.sign(
    {
      userId: userId,
    },
    "ILoveChuja",
    { expiresIn: "7d" }
  );
  return token;
};

exports.signInUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var token = "";

  // only reporters and admin can login, not newUser
  try {
    const getUser = await User.findOne({ email: email });
    if (getUser && getUser.isApproved) {
      await bcrypt.compare(password, getUser.password).then((result) => {
        if (result) {
          // json web token

          getToken(getUser._id).then((token) => {
            token = token;

            res.json({ success: true, token, user: getUser });
          });
        } else {
          res.json({ success: false, message: "Incorrect password!!!!" });
        }
      });
    } else {
      res.status(403).json({
        success: false,
        message: "This email is not registered with us",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const verifyToken = async (token) => {
  const decoded = await jwt.verify(token, "ILoveChuja");
  return decoded.userId;
};

exports.refreshAuth = async (req, res) => {
  const authHeader = req.headers.authorization;

  const token = authHeader.split(" ")[1];
  verifyToken(token).then((userId) => {
    User.findById(userId).exec((err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ user: user, token: token, success: true });
      }
    });
  });
};

exports.updateUser = async (req, res) => {
  const full_name = req.body.full_name;
  const email = req.body.email;
  const userId = req.params.id;

  let userData = { full_name, email };

  if (req.file) {
    userData.profileImageUrl = await uploadImageCloud(req.file);
  }

  try {
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, userData);
    res.json({ success: true, updatedUser });
  } catch (error) {
    console.log(error);
  }
};

exports.verifyUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const getUser = await User.findOne({ email: email });
    if (getUser) {
      await bcrypt.compare(password, getUser.password).then((result) => {
        if (result) {
          // json web token
          res.json({ success: true, message: "Logged in" });
        } else {
          res.json({ success: false, message: "Incorrect password!!!!" });
        }
      });
    } else {
      res.status(402).json({
        success: false,
        message: "This email is not registered with us",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// get all users

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (err) {
    console.log(err);
  }
};

exports.updateStatus = async (req, res) => {
  const reqBody = req.body;
  const newStatus = reqBody;

  const userId = req.params.id;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      newStatus,
      { new: true }
    );
    res.json({ success: true, updatedUser });
  } catch (error) {
    console.log(error);
  }
};
