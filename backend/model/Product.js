const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    },
    quanity: {
        type: Number,
        required: true
    },
    
    photo: {
        type: [String],
    },
    shipping: {
        type: Boolean,
    }

}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)
module.exports = Product