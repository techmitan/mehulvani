const Advert = require("./advertModel");

exports.addAdvert = async (req, res) => {
  const reqBody = req.body;
  const newAd = new Advert(reqBody);

  try {
    const ad = await newAd.save();
    res.json({ success: true, ad });
  } catch (error) {
    console.log(error);
  }
};

exports.getAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find({});
    res.json({ adverts });
  } catch (error) {
    console.log(error);
  }
};

exports.getOne = async (req, res) => {
  let adId = req.params.id;
  try {
    const advert = await Advert.findById(adId);
    res.json({ advert });
  } catch (error) {
    console.log(error);
  }
};

exports.updateAd = async (req, res) => {
  let updateAd = {};
  let adId = req.params.id;
  updateAd.ad_url = req.body.ad_url;

  if (req.file) {
    updateAd.imageUrl = req.file.location;
  }

  try {
    const adverts = await Advert.findByIdAndUpdate(adId, updateAd);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
