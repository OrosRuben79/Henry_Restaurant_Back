const mercadopago = require("mercadopago");
const Food = require("../models/food");
const pedirProducto = async (req,res)=>{
    const producto = req.params.producto
    try {
        const descr = await Food.findById(producto);
        res.status(200).json(descr)
        
    } catch (error) {
        res.status(404).json("no se encontro el producto")
    }
}
const pagarProducto = async(req,res)=>{
    const categoriabuscar = req.params.id;
    const datos = req.body.items;
    const producto = await Food.findById(categoriabuscar);
    let preference = {
        items: [
            {
              title: "Dummy Title",
              description: "Dummy description",
              picture_url: "http://www.myapp.com/myimage.jpg",
              category_id: "car_electronics",
              quantity: 1,
              currency_id: "U$",
              unit_price: 10
            }
          ],
          payer: {
            phone: {},
            identification: {},
            address: {}
          },
          payment_methods: {
            "excluded_payment_methods": [
              {}
            ],
            excluded_payment_types: [
              {}
            ]
          },
          shipments: {
            free_methods: [
              {}
            ],
            receiver_address: {}
          },
          back_urls: {
            success : "http://localhost:3001/local/alterHome",
            failure : "http://localhost:3001/profile",
            pending :  "http://localhost:3001/login"

          },
          differential_pricing: {},
          tracks: [
            {
              type: "google_ad"
            }
          ],
          metadata: {}
    }
    mercadopago.preferences.create(preference)
    .then(function (response) {
        console.log("response", response)
        req.json({
            global : req.body.id
        })
    })
    .catch(function (error) {
        console.log("error:", error)
    })
}
module.exports = {
    pedirProducto,
    pagarProducto
}