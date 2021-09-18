const FeaturedNews = require("./newsModel");
const News = require("../news/newsModel");

// 5 featured news

exports.addFeaturedNews = async (req, res) => {
  // we add 5 news ids in array
  const newsId = req.body.newsId;
  // const fNews = new FeaturedNews(req.body);
  // const createdNews = await fNews.save();
  // return res.json({ createdNews });

  let fNewsId = "";

  try {
    const getNewsList = await FeaturedNews.find();
    const newsItems = getNewsList[0].news;
    fNewsId = getNewsList[0]._id;

    if (newsItems.length === 5) {
      // remove the last item and add in the beginning
      newsItems.pop();
      newsItems.unshift(newsId);
    } else {
      newsItems.unshift(newsId);
    }

    const toUpdate = { news: newsItems };

    const fNews = await FeaturedNews.findByIdAndUpdate(fNewsId, toUpdate, {
      new: true,
    });

    res.json({ success: true, fNews });
  } catch (error) {
    console.log(error);
  }
};

exports.removeFeaturedNews = async (req, res) => {
  // we add 5 news ids in array

  const newsId = req.param.id;

  try {
    const getNewsList = await FeaturedNews.find();

    const newsItems = getNewsList[0].news;

    newsItems.push(newsId);
    const savedNews = await newsItems.save();
    res.json({ success: true, savedNews });
  } catch (error) {
    console.log(error);
  }
};

// exports.getFeaturedNews = async (req, res) => {
//   try {
//     const featuredNews = await FeaturedNews.find({}).populate(
//       "news",
//       "title imageUrl"
//     );
//     res.json({ success: true, featuredNews });
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.getFeaturedNews = async (req, res) => {
  try {
    const fNews = await News.find({ isPublished: true }).sort({
      published_date: -1,
    });

    res.json({ success: true, featured: fNews.slice(0, 5) });
  } catch (error) {
    console.log(error);
  }
};
