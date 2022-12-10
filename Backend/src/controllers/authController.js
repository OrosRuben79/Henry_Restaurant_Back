const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { jwtDecode } = require("../helpers/jwtDecode");
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
    const token = await generateJWT(user.id);

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
    const { email, name, img } = jwtDecode(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      //Tengo que crearlo
      const data = {
        fullName: name,
        email,
        password: "noPasword",
        img,
        google: true,
        rol: "USER_ROLE",
      };
      user = await User.create(data);
    }

    // Si el usurario en DB
    if (!user.state) {
      return res.status(401).json({
        msg: "User Blocked",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json(token);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "the token could not be verified",
    });
  }
};

const userData = async( req, res = response ) =>{

  const { user } = req;

  const data = {
    fullName: user.fullName,
    email: user.email,
    img: user.img,
    country: user.country
  }

  res.json({
    data
  })

}

module.exports = {
  login,
  googleSingIn,
  userData
};
