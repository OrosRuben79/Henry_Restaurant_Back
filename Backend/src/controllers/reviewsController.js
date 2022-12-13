const Reviews = require("../models/reviews");


const getReviews = async (req, res) => {

  try {
    const reviews = await Reviews.find().populate('userid', 'fullName');

    res.status(200).json( reviews );
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};


  
  module.exports = {
    getReviews,
  };
  