const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const Food = require("../models/food");

const getFoods = async (req, res) => {
  try {
    const { name, country, food, fit } = req.query;

    if (name) {
      const food = await Food.find({
        "lenguage.en.name": { $regex: "^\\b" + name.toUpperCase() },
      }).populate("adminid", "name");
      return res.status(200).json(food);
    }

    // country, food, fit
    if (country && food && fit) {
      const foods = await Food.find({
        "tags.en": { $all: [country, food, fit] },
      });
      return res.status(200).json(foods);
    }

    // country, food
    if (country && food) {
      const foods = await Food.find({
        "tags.en": { $all: [country, food] },
      });
      return res.status(200).json(foods);
    }

    // country, fit
    if (country && fit) {
      const foods = await Food.find({
        "tags.en": { $all: [country, fit] },
      });
      return res.status(200).json(foods);
    }

    // food, fit
    if (food && fit) {
      const foods = await Food.find({
        "tags.en": { $all: [food, fit] },
      });
      return res.status(200).json(foods);
    }
    // country
    if (country) {
      const foods = await Food.find({
        "tags.en": { $all: [country] },
      });
      return res.status(200).json(foods);
    }
    // food
    if (food) {
      const foods = await Food.find({
        "tags.en": { $all: [food] },
      });
      return res.status(200).json(foods);
    }
    // fit
    if (fit) {
      const foods = await Food.find({
        "tags.en": { $all: [fit] },
      });
      return res.status(200).json(foods);
    }

    const foods = await Food.find().populate("adminid", "name");
    // .populate('reviewid', ['reviews', 'score', 'descriptions'])
    // console.log(foods)
    return res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const postFoods = async (req, res) => {
  try {
    const { tempFilePath } = req.files.file;
    const { img } = await cloudinary.uploader.upload(tempFilePath);

    const { adminid, price, tags, lenguage } = req.body;

    lenguage.en.name = lenguage.en.name.toUpperCase();
    lenguage.es.name = lenguage.es.name.toUpperCase();

    const foods = await Food.create({
      adminid,
      price,
      tags,
      lenguage,
      img,
    });

    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const putFoods = async (req, res) => {
  try {
    const { id } = req.params;
    const { state, ...resto } = req.body;

    const foods = await Food.findByIdAndUpdate(id, resto);

    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const deleteFoods = async (req, res) => {
  try {
    const { id } = req.params;

    const foods = await Food.findByIdAndUpdate(id, { state: false });

    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json("soy el error");
  }
};

module.exports = {
  getFoods,
  postFoods,
  putFoods,
  deleteFoods,
};
