const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { jwtDecode } = require("../helpers/jwtDecode");
const User = require("../models/user");
const Admin = require("../models/admin");
const URL_CLIENT = process.env.URL_CLIENT || "http://localhost:3000/";

const login = async (req, res) => {
	const { email, password } = req.body;
	
	try {
		//check if email exist
		const admin = await Admin.findOne({ email });
		
		const user = await User.findOne({ email, state:true });

		if (admin) {
			
			const validPasswordA = bcryptjs.compareSync(password, admin.password);
			if (!validPasswordA) {
				return res.status(400).json({
					msg: "Usuario / Password not rigth 4"
				});
			}
			// Generar el JWT
			const token = await generateJWT(admin.id);
			return res.status(201).json(token);
		}

		if(user.google) return res.status(404).json("Tu correo esta asociado a un inicio de sesion con un tercero como Google o Github")

		if (user) {
			const validPassword = bcryptjs.compareSync(password, user.password);
			if (!validPassword) {
				return res.status(400).json("Usuario / Password not rigth 3");
			}
			// Generar el JWT
			const token = await generateJWT(user.id);
			return res.status(200).json(token);
		}
		if (!admin && !user) return res.status(404).json("User not found")

		

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
	const { email, thirdAuth, img } = req.body.userData
	console.log("body login github", req.body.userData);
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
				thirdAuth,
				rol: 'USER_ROLE',
				google: true,
				img
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

const loginGoogle = async (req, res) => {
	console.log("body login google", req.body.dataUser);
	const { email, fullName, thirdAuth, img } = req.body.userData
	try {
		const findUser = await User.findOne({ email });
		// Valido si ya esta autenticado con usuario y contraseña
		console.log("Usuario encontrado", findUser);
		if (findUser && findUser.thirdAuth === "") return res.status(400).json(`Tu email ${email} ya esta registrado, inicia sesion con tu cuenta de usuario y contraseña`)

		// Si ya tiene autenticacion de un tercero devuelvo un token
		if (findUser?.thirdAuth) {
			const token = await generateJWT(findUser._id, findUser.thirdAuth)
			return res.status(200).json(token)
		} else {
			//Si no esta registrado se procede a crear el usuario en db 
			const dataUser = {
				fullName,
				email,
				password: "noPasword",
				thirdAuth,
				rol: 'USER_ROLE',
				google: true,
				img
			}
			const createUser = await User.create(dataUser);
			console.log("usercreated", createUser);
			const token = await generateJWT(createUser._id);

			return res.status(201).json(token); 
		}
	} catch (error) {
		console.log("Error on login user third provider", error);
		return res.status(500).json(error)
	}
}

module.exports = {
	login,
	googleSingIn,
	userData,
	loginGithub,
	loginGoogle
};
