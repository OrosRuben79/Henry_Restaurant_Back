const Role = require("../models/role");

const getRoles = async (req, res) => {

  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ msg: error });
  }

};


const postRoles = async (req, res) => {
  try {
    const { role } = req.body;
  
    const roles = await Role.create( { role } );

    res.status(200).json(roles);
  } catch (error) {
    res.status(430).json({ msg: error });
  }

};


const putRoles = async (req, res) => {
  try {
    const { id } = req.params;
    const { state, ...resto } = req.body
   

    const roles = await Role.findByIdAndUpdate(id , resto);

    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};


const deleteRoles = async (req, res) => {
  
  try {

    const { id } = req.params;

    const roles = await Role.findByIdAndUpdate(id, { state: false });

    return res.json(roles);

  } catch (error) {
    res.status(400).json({ msg: error });

  }

};






module.exports = {
  getRoles,
  postRoles,
  putRoles,
  deleteRoles,
};
