const { mailConfirmShopping, mailOrderAtTable, mailConfirmReservation } = require("../helpers/nodemailer");
const Order = require("../models/order");
const User = require("../models/user");
const { calculateOrderAmount } = require('./paymentsController')

const getOrders = async (req, res) => {

	try {
		const order = await Order.find()
			.populate('userid', ['fullName', "rol"])
			.populate('order', ['lenguage', "img", "price"])
		res.status(200).json(order);
	} catch (error) {
		res.status(400).json({ msg: error });
	}
};


const getOrdersUserid = async (req, res) => {
	try {
		const { id } = req.params

		const order = await Order.find({ 'userid': id }).populate('order');
		return res.status(200).json(order);

	} catch (error) {
		res.status(400).json({ msg: error });
	}

}

const postOrders = async (req, res) => {
	console.log("llega por body...", req.body);
	try {
		const { userid, order, typeOrder, table, address, date } = req.body;

		const user = await User.findById(userid)

		// pendiente guardar la cantidad de unidades que pide el cliente
		const newOrder = order.map(el => {
			return { _id: el.id, img: el.img, price: el.price, cant: el.cant }
		})

		let valuePaid = 0
		if(typeOrder === "DELIVERY"){
			valuePaid = calculateOrderAmount(order) / 100
		}

		const orders = await Order.create({
			userid,
			order: newOrder,
			typeOrder,
			table,
			address,
			valuePaid,
			date
		});

		if(typeOrder === "DELIVERY"){
			mailConfirmShopping(user.fullName, user.email, address, valuePaid)
		}

		if(typeOrder === "LOCAL"){
			mailOrderAtTable(user.fullName, user.email, table)			
		}
		
		if(typeOrder === "RESERVATION"){
			mailConfirmReservation(user.fullName, user.email, date)			
		}

		res.status(200).json(orders);
	} catch (error) {
		console.log("Error controller post order", error);
		res.status(400).json({ msg: error });
	}

};


const putOrders = async (req, res) => {
	try {
		const { id } = req.params;
		const { state, ...resto } = req.body;

		const orders = await Order.findByIdAndUpdate(id, resto);

		res.status(200).json(orders);
	} catch (error) {
		res.status(400).json({ msg: error });
	}

};

const deleteOrders = async (req, res) => {
	try {

		const { id } = req.params;

		const orders = await Order.findByIdAndUpdate(id, { state: false });

		return res.json(orders);

	} catch (error) {
		res.status(400).json({ msg: error });

	}

};

module.exports = {
	getOrders,
	postOrders,
	putOrders,
	deleteOrders,
	getOrdersUserid

};
