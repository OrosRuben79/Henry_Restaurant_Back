const stripe = require("stripe")(process.env.STRIPE_KEY)
const URL_APP = process.env.URL_APP || "http://localhost:3000/"

const calculateOrderAmount = (items) =>{
	let amount = 0
	items.forEach(el => {
		amount += el.price * el.cant
	});
	return amount * 100
}

const paymentWithStripe = async (req, res) =>{
	
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateOrderAmount(req.body),
			currency: "usd",
			automatic_payment_methods: {
				enabled: true,
			},
		});
		console.log("Intento de pago...", paymentIntent);
		return res.send({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.log("Error on payment with stripe", error);
		return res.status(500).json(error)
	}	
}


module.exports = {
	paymentWithStripe
}