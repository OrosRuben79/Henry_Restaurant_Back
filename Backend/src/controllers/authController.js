const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { jwtDecode } = require("../helpers/jwtDecode");
const User = require("../models/user");

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		//check if email exist
		const user = await User.findOne({ email });
		if (!user) return res.status(404).json("User not found")
		if (user) {
			const validPassword = bcryptjs.compareSync(password, user.password);
			if (!validPassword) {
				return res.status(400).json({
					msg: "Usuario / Password not rigth 3"
				});
			}
			// Generar el JWT
			const token = await generateJWT(user.id);
			return res.status(200).json(token);
		}

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

const userData = async (req, res = response) => {

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

const loginGithub = async (req, res) => {
	const email = req.body.email
	console.log("login github", email);
	try {
		const findUser = await User.findOne({ email });
		// Valido si ya esta autenticado con usuario y contraseña
		if (findUser && !findUser.thirdAuth) return res.status(400).json(`Tu email ${email} ya esta registrado, inicia sesion con tu cuenta de usuario y contraseña`)

		// Si ya tiene autenticacion de un tercero devuelvo un token
		if (findUser?.thirdAuth) {
			const token = await generateJWT(findUser._id, findUser.thirdAuth)
			return res.status(200).json(token)
		} else {
			//Si no esta registrado se procede a crear el usuario en db 
			const dataUser = {
				fullName: "User from GitHub",
				email,
				password: "noPasword",
				thirdAuth: "GitHub",
				rol: 'USER_ROLE'
			}
			const createUser = await User.create(dataUser);
			const token = await generateJWT(createUser._id);

			return res.status(201).json(token);
		}
	} catch (error) {
		console.log("Error on login user using github", error);
		return res.status(500).json(error)
	}
}

module.exports = {
	login,
	googleSingIn,
	userData,
	loginGithub,
};
