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
		  <h2>Hola usuario ${name}</h2>
		  <h4>Gracias por registrarte en nuestra pagina</h4>
		  <hr />
		  <div>
			<p>Para activar tu cuenta haz clic en el enlace 👇</p>
			<a href="${urlserver}activateAccount?token=${token}" target="_blank" rel="noopener noreferrer">
			  ${urlserver}activateAccount?token=${token}
			</a>
			<p>Atentamente</p>
			<p>Tus amigos de Henry foods</p>
		  </div> 
		`,
	});
};

module.exports = {
	transporter,
	mailActivateAccount,
}