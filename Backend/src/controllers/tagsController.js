const Tag = require("../models/tag");

const getTags = async (req, res) => {
  try {
    const { tagES, tagEN, type} = req.query

    // if(tagES){
    //   const tages = await Tag.find({"tagES": tagES} )
    //  return res.status(200).json(tages);
    // }

    // if(tagEN){
    //   const tagen = await Tag.find({"tagEN": tagEN} )
    //  return res.status(200).json(tagen);
    // }

    if(type){
      const types = await Tag.find({"type": type} )
     return res.status(200).json(types);
    }

   const tags = await Tag.find()

    return res.status(200).json(tags);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const postTags = async (req, res) => {
  try {
    const { tagES, tagEN, type } = req.body;
    
    const tags = await Tag.create({ tagES, tagEN, type });
    
    res.status(200).json(tags);
  } catch (error) {
    res.status(430).json({ msg: error });
  }

};

const putTags = async (req, res) => {
  try {
    const { id } = req.params;
    const { state, ...resto } = req.body;

    const tags = await Tag.findByIdAndUpdate(id, resto);

    res.status(200).json(tags);
  } catch (error) {
    res.status(400).json({ msg: error });
  }

};

const deleteTags = async (req, res) => {
  try {
    const { id } = req.params;

    const tags = await Tag.findByIdAndUpdate(id, { state: false });

    res.status(200).json(tags);
  } catch (error) {
    res.status(400).json({ msg: error });
  }

};


module.exports = {
  getTags,
  postTags,
  putTags,
  deleteTags,
};
