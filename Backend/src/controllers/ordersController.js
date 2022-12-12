const Order = require("../models/order");

const getOrders = async (req, res) => {

  try {
    const order = await Order.find()
    .populate('userid', ['fullName', "rol"])
    .populate('order', ['name',"img","price"])
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
  };

  const postOrders = async (req, res) => {
    try {
      const { userid, order, typeOrder, table, address} = req.body;
      
      const orders = await Order.create({
       userid,
       order,
       typeOrder,
       table,
       address,
      
      });
    
      res.status(200).json(orders);
    } catch (error) {
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
    
      const orders = await Order.findByIdAndUpdate( id, { state: false});
      
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

  };
  