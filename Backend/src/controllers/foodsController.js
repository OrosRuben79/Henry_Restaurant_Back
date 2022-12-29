
const Food = require("../models/food");


const getFoods = async (req, res) => {

  try {
    const {name} = req.query
    
    if(name){
      const food = await Food.find({'lenguage.en.name': {$regex:"^\\b"+ name.toUpperCase()}}).populate('adminid', 'name');
     return res.status(200).json( food );
    }

    const foods = await Food.find()
    .populate('adminid', 'name')
    .populate('reviewid', ['reviews', 'score', 'descriptions'])
    console.log(foods)
     return res.status(200).json( foods );
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};


const postFoods = async (req, res) => {
  try {
    const { price, img, adminid, lenguage, reviewid } = req.body;
    
    lenguage.en.name = lenguage.en.name.toUpperCase()
    lenguage.es.name = lenguage.es.name.toUpperCase()
    
    const foods = await Food.create({
      reviewid,
      lenguage,
      price,
      img,
      adminid,
  
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
