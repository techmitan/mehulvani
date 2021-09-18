const Category = require("./categoryModel");

exports.addCategory = async (req, res) => {
  const reqBody = req.body;
  const newCategory = new Category(reqBody);

  try {
    const addedCategory = await newCategory.save();
    res.json({ success: true, addedCategory });
  } catch (error) {
    console.log(error);
  }
};

exports.updateCategory = async (req, res) => {
  const reqBody = req.body;
  const newCategory = { title: req.body.title };
  const categoryId = req.params.id;

  if (req.file) {
    newCategory.imageUrl = req.file.location;
  }

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      newCategory
    );
    res.json({ success: true, updatedCategory });
  } catch (error) {
    console.log(error);
  }
};

exports.updateStatus = async (req, res) => {
  const reqBody = req.body;
  const newStatus = reqBody;
  const categoryId = req.params.id;

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      newStatus,
      { new: true }
    );
    res.json({ success: true, updatedCategory });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCategory = async (req, res) => {
  const categoryId = req.param.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.getCategories = async (req, res) => {
  // queries

  let queryObj = {};

  if (req.query.isPublished) {
    queryObj = { isPublished: req.query.isPublished };
  }


  try {
    const categories = await Category.find(queryObj);
    res.json({ success: true, categories, length: categories.length });
  } catch (error) {
    console.log(error);
  }
};
