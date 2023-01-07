const bcryptjs = require("bcryptjs");
const { mailActivateAccount } = require("../helpers/nodemailer");
const { generateJWT } = require("../helpers/generate-jwt");
const Admin = require("../models/admin");

const URL_SERVER = process.env.URL_SERVER || "http://localhost:3001/admins/";
const URL_CLIENT = process.env.URL_CLIENT || "http://localhost:3000/";


const getAdmins = async (req, res) => {

  try {
    const admin = await Admin.find();
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
}

const getAdminById = async (req, res) => {
  const {id} = req.params
  try {
    const findAdmin = await Admin.findById(id);
    return findAdmin
    ? res.json(findAdmin)
    : res.status(404).json("Admin not found")
  } catch (error) {
    console.log('Error trying find admins by id', error);
    
    res.status(400).json({ msg: error });
  }

};



const postAdmins = async (req, res) => {
  try {
    const { name, email, password, img, rol, country  } = req.body;

    const findAdmin= await Admin.findOne({ email })
		if (findAdmin) return res.status(400).json("UsuarioAdmin ya existe " + findAdmin._id)

		const salt = bcryptjs.genSaltSync();
		const cripPasworrd = bcryptjs.hashSync(password, salt);
    

    const admin = await Admin.create({
      name, 
      email, 
      password: cripPasworrd,
      img,
      rol,
      country,
      state : false
     });

     const token = await generateJWT(admin._id, admin.state)

		mailActivateAccount(name, email, URL_SERVER, token)

    res.status(200).json(token);
  } catch (error) {
    res.status(430).json({ msg: error });
  }

};


const putAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    const { state, google, ...resto } = req.body

    const salt = bcryptjs.genSaltSync();
		if (resto.password)
			resto.password = bcryptjs.hashSync(resto.password, salt);
   
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

const getAdminId = (req, res) => {

  
}



module.exports = {
  getAdmins,
  postAdmins,
  putAdmins,
  deleteAdmins,
  getAdminById
};
