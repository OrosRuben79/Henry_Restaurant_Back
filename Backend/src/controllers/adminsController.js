const Admin = require("../models/admin");


const getAdmins = async (req, res) => {

  try {
    const admin = await Admin.find();
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ msg: error });
  }

};

const postAdmins = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const admin = await Admin.create({ name, email, password });

    res.status(200).json(admin);
  } catch (error) {
    res.status(430).json({ msg: error });
  }

};


const putAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    const { state, ...resto } = req.body
   
    const admin = await Admin.findByIdAndUpdate(id , resto);

    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const deleteAdmins = async (req, res) => {
  
  try {

    const { id } = req.params;

    const admin = await Admin.findByIdAndUpdate(id, { state: false });

    return res.json(admin);

  } catch (error) {
    res.status(400).json({ msg: error });

  }

};



module.exports = {
  getAdmins,
  postAdmins,
  putAdmins,
  deleteAdmins,
};
