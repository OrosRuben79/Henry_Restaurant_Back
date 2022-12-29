const Tag = require("../models/tag");

const getTags = async (req, res) => {
  try {
   const tags = await Tag.find()

    return res.status(200).json(tags);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

module.exports = {
  getTags,
};
