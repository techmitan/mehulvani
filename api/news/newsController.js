const News = require("./newsModel");
const Category = require("../category/categoryModel");

exports.getNews = async (req, res) => {
  const newsId = req.params.id;

  try {
    const news = await News.findById(newsId)
      .populate("category", "_id title")
      .populate("author", "full_name profileImageUrl");
    const newsofCategory = await News.find({
      category: news.category._id,
    })
      .sort({ published_date: -1 })
      .populate("category", "_id title").limit(10).skip(1);
    res.json({ news, relatedNews: newsofCategory });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllNews = async (req, res) => {
  var category;
  let queryObj = {};
  let page = req.query.page || 1;

  // per page we show 10 news

  if (req.query.isPublished) {
    queryObj = { isPublished: req.query.isPublished };
  }
  if (req.query.author) {
    queryObj = { ...queryObj, author: req.query.author };
  }
  if (req.query.category) {
    queryObj = { ...queryObj, category: req.query.category };
  }

  try {
    if (req.query.category) {
      category = req.query.category;
      const getCategory = await Category.findById(category);
      const categoryTitle = await getCategory.title;
      const news = await News.find(queryObj)
        .populate("category", "_id title")
        .sort({ published_date: -1 })
        .limit(10)
        .skip((page - 1) * 10);

      res.json({ totalNews: news.length, category: categoryTitle, news });
    } else {
      const news = await News.find(queryObj)
        .populate("category", "_id title")
        .populate("author", "full_name")
        .sort({ published_date: -1 })
        .limit(10)
        .skip((page - 1) * 10);

      const totalNews = await News.countDocuments();

      res.json({ totalNews, news });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addNews = async (req, res) => {
  const newNews = new News({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    location: req.body.location,
    status: req.body.status,
    published_date: req.body.published_date,
    author: req.body.author,
  });

  if (req.file) {
    newNews.imageUrl = req.file.location;
  }

  try {
    const addedNews = await newNews.save();
    res.json({ success: true, news: addedNews });
  } catch (error) {
    console.log(error);
  }
};

exports.updateNews = (req, res) => {
  const newsId = req.params.id;
  const updatedNews = req.body;

  if (req.file) {
    updatedNews.imageUrl = req.file.location;
  }

  News.findByIdAndUpdate(
    newsId,
    updatedNews,
    { new: true, useFindAndModify: false },
    (err, updatedNews) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
          message:
            "Some error ocurred with database. Please check passed values.",
        });
      }
      if (!updatedNews) {
        return res.status(400).json({
          success: false,
          message: "The news was not updated.",
        });
      }

      return res.status(200).json({
        success: true,
        news: updatedNews,
      });
    }
  );
};

exports.deleteNews = async (req, res) => {
  const newsId = req.params.newsId;
  try {
    const deleteNews = await News.findByIdAndDelete(newsId);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteAllNews = async (req, res) => {
  try {
    await News.deleteMany({}).then(() => {
      res.json({ success: true });
    });
  } catch (error) {
    console.log(error);
  }
};


exports.getHomeNews = async (req, res) => {
  let news = [];
  try {
    const categories = await Category.find({ isPublished: true });
    for (category in categories) {
      let item = await News.find({
        category: categories[category]._id,
        isPublished: true,
      }).sort({ published_date: -1 });
      if (item.length !== 0) {
        news.push({ category: categories[category], news: item.slice(0, 3) });
      }
    }
    res.json({ news });
  } catch (error) {
    console.log(error);
  }
};
