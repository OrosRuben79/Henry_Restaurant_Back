
const Food = require("../models/food");


const getFoods = async (req, res) => {

  const foods = await Food.find().populate('admin');
  try {
   // console.log(foods)
    res.status(200).json( foods );
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};


const postFoods = async (req, res) => {
  try {
    const { name, price, type, description, img } = req.body;
    
    const foods = await Food.create({
      name,
      price,
      type,
      description,
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

  const foods = await Food.findByIdAndUpdate( id, { state: false});
  
  return res.json(foods);
  
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
