const bcryptjs = require("bcryptjs");
const { mailActivateAccount } = require("../helpers/nodemailer");
const { generateJWT } = require("../helpers/generate-jwt");
const User = require("../models/user");
const Admin = require("../models/admin");




const URL_SERVER = process.env.URL_SERVER || "http://localhost:3001/users/";
const URL_CLIENT = process.env.URL_CLIENT || "http://localhost:3000/";

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
		const { fullName, email, password, img, country } = req.body;

		const findUser = await User.findOne({ email })
		if (findUser) return res.status(400).json("Usuario ya existe " + findUser._id)

		const salt = bcryptjs.genSaltSync();
		const cripPasworrd = bcryptjs.hashSync(password, salt);
		const user = await User.create({
			fullName,
			email,
			password: cripPasworrd,
			img,
			rol: "USER_ROLE",
			country,
			state: false
		});

		const token = await generateJWT(user._id, user.state)

		mailActivateAccount(fullName, email, URL_SERVER, token)

		return res.status(200).json(token);
	} catch (error) {
		return res.status(500).json(error);
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
		const user = await User.findByIdAndDelete(id);

		// Borrador logico
		// const user = await User.findByIdAndUpdate(id, { status: false });

		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: error });
	}
};

const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const findUser = await User.findById(id)

		return findUser
			? res.json(findUser)
			: res.status(404).json("Usuario no encontrado")

	} catch (error) {
		console.log("Error on trying get user by id", error);
		return res.status(500).json(error)
	}

}

const activateAccount = async (req, res) => {
	const token = req.query.token;
	try {
		const decodeToken = JSON.parse(
			Buffer.from(token.split(".")[1], "base64").toString()
		);
			const userid = await User.findById({ _id: decodeToken.id })

		if(userid){
			const activateUser = await User.findOneAndUpdate(
				{ _id: decodeToken.id },
				{ state: true },
				{ returnOriginal: false }
			);
	
			return activateUser
				? res.redirect(`${URL_CLIENT}perfil`)
				: res.status(400).json("No se pudo activar cuenta")
		}

		const adminid = await Admin.findById({ _id: decodeToken.id })

		if(adminid){
			const activateAdmin = await Admin.findOneAndUpdate(
				{ _id: decodeToken.id },
				{ state: true },
				{ returnOriginal: false }
			);
	
			return activateAdmin
				? res.redirect(`${URL_CLIENT}dashboard`)
				: res.status(400).json("No se pudo activar cuenta")
		}

	} catch (error) {
		console.log("Error en controller usuario al activar cuenta", error);
		return res.status(500).json(error);
	}
};

const updateUser = async (req, res) => {
	const { fullName, password, country, city, address } = req.body
	const id = req.params
	try {
		const findUser = await User.findById({ _id: id.id })
		if (!findUser) return res.status(400).json("Usuario no encontrado")

		if (findUser.google) {
			const user = await User.findOneAndUpdate(
				{ _id: id.id },
				{ fullName, country, city, address },
				{ returnOriginal: false }
			)
			return res.json(user)
		} else {
			const validatePassword = await bcryptjs.compareSync(password, findUser.password)
			if (!validatePassword) return res.status(404).json("password invalid")
			const user = await User.findOneAndUpdate(
				{ _id: id.id },
				{ fullName, country, city, address },
				{ returnOriginal: false }
			)
			
			return res.json(user)
		}

	} catch (error) {
		console.log("Error on trying update user", error);
		return res.status(500).json(error)
	}
}

module.exports = {
	getUser,
	postUser,
	putUser,
	delteUser,
	getUserById,
	activateAccount,
	updateUser,
};
