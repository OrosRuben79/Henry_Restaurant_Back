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
  console.log(roles)
    res.status(200).json(roles);
  } catch (error) {
    res.status(430).json({ msg: error });
  }

};


const putRoles = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const roles = await Role.findByIdAndUpdate(id, {role});

    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};


const deleteRoles = async (req, res) => {
  
  try {

    const { id } = req.params;
    const { role } = req.body;

    const roles = await Role.deleteOne( {id} );

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
