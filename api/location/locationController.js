const Location = require("./locationModel");

exports.addLocation = async (req, res) => {
  const reqBody = req.body;
  const newLocation = new Location(reqBody);

  try {
    const addedLocation = await newLocation.save();
    res.json({ success: true, addedLocation });
  } catch (error) {
    console.log(error);
  }
};

exports.updateLocation = async (req, res) => {
  const reqBody = req.body;
  const newLocation = new Location(reqBody);
  const locationId = req.param.id;

  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      newLocation,
      { new: true }
    );
    res.json({ success: true, updatedLocation });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteLocation = async (req, res) => {
  const locationId = req.param.id;

  try {
    const addedLocation = await Location.findByIdAndDelete(locationId);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json({ success: true, locations });
  } catch (error) {
    console.log(error);
  }
};
