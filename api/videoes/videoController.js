const Video = require("./videoModel");

exports.addVideo = async (req, res) => {
  const reqBody = req.body;
  const newVideo = new Video(reqBody);

  try {
    const video = await newVideo.save();
    res.json({ success: true, video });
  } catch (error) {
    console.log(error);
  }
};

exports.updateVideo = async (req, res) => {
  const reqBody = req.body;
  const id = req.params.id;

  try {
    const updatedChannel = await Video.findByIdAndUpdate(id, reqBody, {
      new: true,
    });
    res.json({ success: true, video: updatedChannel });
  } catch (error) {
    console.log(error);
  }
};

exports.getVideo = async (req, res) => {
  try {
    const updatedChannel = await Video.find({});
    res.json({ success: true, video: updatedChannel[0] });
  } catch (error) {
    console.log(error);
  }
};
