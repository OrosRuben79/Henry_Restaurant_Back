const stripe = require("stripe")(process.env.STRIPE_KEY)

const calculateOrderAmount = (items) =>{
	let amount = 0
	items.forEach(el => {
		amount += el.price * el.cant
	});
	return amount * 100
}

const paymentWithStripe = async (req, res) => {
	const { id, items } = req.body;

	try {
		await stripe.paymentIntents.create({

			amount: calculateOrderAmount(items),
			currency: "usd",
			payment_method: id,
			confirm: true,
		});

		return res.json({message: "Succesfull payment"})
	} catch (error) {
		if(error.raw.message){
			console.log("Card rejected by Stripe", error.raw.message);
			return res.status(400).json(error.raw.message)
		} else {
			console.log("Error general on payment with stripe", error);
			return res.status(500).json(error)
		}
	}
}

module.exports = {
	paymentWithStripe,
	calculateOrderAmount,
}
