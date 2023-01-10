const Reviews = require("../models/reviews");

const getReviews = async (req, res) => {

  try {
    const {foodId , userId} = req.query
    if(foodId){
      const review = await Reviews.find({"foodId": foodId} )
     return res.status(200).json(review);
    }
    if(userId){
      const review = await Reviews.find({"userId": userId} )
     return res.status(200).json(review);
    }

   const review = await Reviews.find({state: true})

  return res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const postReviews = async (req, res) => {
  const {title, userId, foodId, score, descriptions } = req.body;
  let positve  = false
  if(score>2) positve = true
  
  const review = await Reviews.create({
    title,
    userId,
    foodId,
    score,
    descriptions,
    positve
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
