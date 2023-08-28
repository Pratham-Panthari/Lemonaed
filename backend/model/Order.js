const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    products:[
        {
            product: {
                type: mongoose.ObjectId,
                ref: 'Product',
            },
            size: String,
            quantity: String,
        },
    ],
        
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref:'user',
    },
    status: {
        type: String,
        default: "Not Proccessed",
        enum: ["Not Proccessed", "Proccessing", "Shipped", "Delivered", "Cancel Request","Cancelled", "Return Request", "Returned"]
    }

}, { timestamps: true })


const Order = mongoose.model('Orders', orderSchema )

module.exports = Order