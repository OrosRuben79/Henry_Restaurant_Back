const bcryptjs = require("bcryptjs");
const { generatrJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
const User = require("../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check if email exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password not rigth 1",
      });
    }

    // check is user are active
    if (!user.state) {
      return res.status(400).json({
        msg: "Usuario / Password not rigth 2",
      });
    }
    //check password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password not rigth 3",
      });
    }

    // Generar el JWT
    const token = await generatrJWT(user.id);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Contact Server ADMIN",
    });
  }
};

const googleSingIn = async (req, res) => {
  const { id_token } = req.body;

  try {
    const { email, name, img } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      //Tengo que crearlo
      const data = {
        name,
        email,
        password: "noPasword",
        img,
        google: true,
        rol: "USER_ROLE",
      };

      user = new User(data);
      await User.save();
    }

    // Si el usurario en DB
    if (!user.state) {
      return res.status(401).json({
        msg: "User Blocked",
      });
    }

    // Generar el JWT
    const token = await generarJWT(user.id);

    res.json(token);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "the token could not be verified",
    });
  }
};

module.exports = {
  login,
  googleSingIn,
};
