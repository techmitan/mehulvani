const News = require("../news/newsModel");

exports.searchNews = async (req, res) => {
  const queryNews = req.query.title;
  const regex = new RegExp(queryNews, "i");

  try {
    const news = await News.find({ title: regex, isPublished: true }, "title");
    res.status(200).json({ news });
  } catch (error) {
    console.log(error);
  }
};
