const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const postUser = async (req, res) => {
  try {
    const { name, email, password, img } = req.body;
    const rol = "USER_ROLE";

    const salt = bcryptjs.genSaltSync();
    const cripPasworrd = bcryptjs.hashSync(password, salt);
    const user = await User.create({
      name,
      email,
      password: cripPasworrd,
      img,
      rol,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const putUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, google, status, ...resto } = req.body;
    const salt = bcryptjs.genSaltSync();
    if (resto.password)
      resto.password = bcryptjs.hashSync(resto.password, salt);

    const user = await User.findByIdAndUpdate(id, resto);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const delteUser = async (req, res) => {
  try {
    const { id } = req.params;

    //Fisicamente lo borramos
    // const user = await User.findByIdAndDelete(id);

    // Borrador logico
    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json(user);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

module.exports = {
  getUser,
  postUser,
  putUser,
  delteUser,
};
