const Reviews = require("../models/reviews");


const getReviews = async (req, res) => {

  try {
    const review = await Reviews.find()
    // .populate('orderid', ['userid', 'fullName'])
    .populate('orderid', ['typeOrder'] )
    .populate('foods', ['lenguage',"img","price"])

    
    res.status(200).json( review );
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const postReviews = async (req, res) => {
  const { foods, reviewsDate, orderid, descriptions, reviews, score} = req.body;
  
  const review = await Reviews.create({
   foods,
   orderid,
   reviewsDate,
   descriptions,
   score,
   reviews,
  
  });
  try {
    
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
   
};



const putReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const { state, ...resto } = req.body;

    const review = await Reviews.findByIdAndUpdate(id, resto);

    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ msg: error });
  }

};


const deleteReviews = async (req, res) => {
  try {

    const { id } = req.params;

    const review = await Reviews.findByIdAndUpdate(id, { state: false });

    return res.json(review);

  } catch (error) {
    res.status(400).json({ msg: error });

  }

};

  
  module.exports = {
    getReviews,
    postReviews,
    putReviews,
    deleteReviews,
  };
  