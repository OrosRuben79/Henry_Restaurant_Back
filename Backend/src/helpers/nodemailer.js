const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "devapps2211@gmail.com",
		pass: "apqmjsezlkuzsbre",
	},
});

transporter.verify().then(() => {
	console.log("Lista la configuracion para enviar correos");
});

const mailActivateAccount = async (name, email, urlserver, token) => {
	await transporter.sendMail({
		from: "PF-Henry <devapps2211@gmail.com>",
		to: email,
		subject: "Activa tu cuenta en Henry foods!!!",
		html: `
		  <h2>Hola ${name}</h2>
		  <h4>Gracias por registrarte en nuestra pagina</h4>
		  <hr />
		  <div>
			<p>Para activar tu cuenta haz clic en el enlace 👇</p>
			<a href="${urlserver}activateAccount?token=${token}" target="_blank" rel="noopener noreferrer" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">
				Activacion de cuenta 
			</a>
			<p>Atentamente</p>
			<p>Tus amigos de Henry foods</p>
		  </div> 
		`,
	});
};

const mailConfirmShopping = async (name, email, address, valuePaid) => {
	await transporter.sendMail({
		from: "PF-Henry <devapps2211@gmail.com>",
		to: email,
		subject: "Confirmacion compra exitosa Henry foods!!! ✅",
		html: `
		  <h2>Hola ${name}</h2>
		  <h3>Tu compra se ha realizado correctamente </h3>
		  <hr />
		  <div>
			<h4>Gracias por comprar en nuestra pagina 🤗 ❤️ 🙂 </h4>
			<p>Muy pronto en tu direccion registrada ${address} estara llegando tu pedido hecho por un valor de $ ${valuePaid}</p>
		  <hr />			
			<p>Atentamente</p>
			<p>Tus amigos de Henry foods</p>
		  </div> 
		`,
	});
};

const mailOrderAtTable = async(name, email, table)=>{
	await transporter.sendMail({
		from: "PF-Henry <devapps2211@gmail.com>",
		to: email,
		subject: "Se ha creado tu orden!!! ✅",
		html: `
		  <h2>Hola ${name}</h2>
		  <h3>Hemos recibido tu orden</h3>
		  <hr />
		  <div>
			<h4>Gracias por comprar en nuestro restaurante 🤗 ❤️ 🙂 </h4>
			<p>Tu pedido estara en pocos minutos en tu mesa No ${table}, si tienes alguna inquietud, no dudes consultar con alguna de la personas de nuestro Staff</p>
		  <hr />			
			<p>Atentamente</p>
			<p>Tus amigos de Henry foods</p>
		  </div> 
		`,
	});
}

const mailConfirmReservation = async (name, email, date) =>{
	await transporter.sendMail({
		from: "PF-Henry <devapps2211@gmail.com>",
		to: email,
		subject: "Hemos recibido una reservacion de tu parte!!! ✅",
		html: `
		  <h2>Hola ${name}</h2>
		  <h3>Hemos recibido una solicitud de reserva</h3>
		  <hr />
		  <div>
			<h4>Gracias por reservar en nuestro restaurante 🤗 ❤️ 🙂 </h4>
			<p>Hemos recibido una solicitud de reserva para que disfrutes de nuestros exquisitos platos el dia ${date}.</p>
			<p>Ese dia nos puedes confirmar tu llegada al restaurante con nuestro staff para poner en marcha tu pedido y ser atendido en menos de 20 minutos</p>
			<p>Sera un placer para nosotros poder atenderte el ${date}</p>
		  <hr />			
			<p>Atentamente</p>
			<p>Tus amigos de Henry foods</p>
		  </div> 
		`,
	});
}

module.exports = {
	transporter,
	mailActivateAccount,
	mailConfirmShopping,
	mailOrderAtTable,
	mailConfirmReservation,
}