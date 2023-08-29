const slugify = require('slugify')
const Product = require('../model/Product')
const stripe = require('stripe')("sk_test_51NkVIASFyRl4oKCVmMwrEGDlsAABGXv0BzgdasKHzi5aeLqEl8SbOt55QaTXtFuzSIB5hbk9mChD8gO1sfuU8DAX00lcMMbnt0")
const mongoose = require('mongoose')

const Order = require('../model/Order')


const createProduct = async (req, res) => {
    try {
        const {name, slug, description, price, category, photo, quanity, shipping } = req.body
        
        if(!name){
            return res.status(400).send({error: 'Name is required'})
        }
        if(!description){
            return res.status(400).send({error: 'description is required'})
        }
        if(!price){
            return res.status(400).send({error: 'price is required'})
        }
        if(!category){
            return res.status(400).send({error: 'category is required'})
        }
        if(!quanity){
            return res.status(400).send({error: 'quanity is required'})
        }
        
        

        const product = new Product({...req.body, slug:slugify(name)})
       
        await product.save()
        res.status(200).send({
            status: 'success',
            message: 'Product created successfully',
            product,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Cannot Create product',
            error,
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = req.query.limit
        const products = await Product.find({}).populate('category').sort({ createdAt: -1 })
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const productResults = products.slice(startIndex, endIndex)

        res.status(200).send({
            status: 'success',
            totalCount: products.length,
            message: 'All products fetched',
            productResults,   
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Cannot fetch products',
            error,
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const slug = req.params.slug
        const product = await Product.findOne({slug}).populate('category')
        res.status(200).send({
            status: 'success',
            message: 'Product fetched successfully',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Cannot fetch product',
            error,
        })
    }
}

const updateProduct = async(req, res) => {
    try {
        const { pid } = req.params

        const product = await Product.findByIdAndUpdate(pid, {$set: req.body}, {new:true})
        
        res.status(200).send({
            status: 'success',
            message: 'product updated successfully',
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Product does not exists',
            error,
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {pid} = req.params
        const product = await Product.findByIdAndDelete(pid)
        
        res.status(200).send({message : 'Product deleted successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Product does not exists',
            error,
        })
    }
}

const searchProductController = async(req, res) => {
    try {
        const keyword = req.params.keyword
        const result = await Product.find({
            $or: [
                {
                    name: {
                        $regex: keyword, 
                        $options: "i",
                    }
                },
                {
                    description: {
                        $regex: keyword,
                        $options: "i",
                    }
                }
            ]
        })
        res.status(200).send({
            message: 'Fetch successfull',
            result
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Product does not exists',
            error,
        })
    }
}

const similarProduct = async(req, res) => {
    try {
        const {pid, cid} = req.params
        
        const products = await Product.find({
            category: cid,
            _id: {$ne: pid}
        }).limit(8).populate("category")
        res.status(200).send({
            status: 'success',
            message: 'similar products fetched successfully',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Failed to fetch similar products',
            error,
        })
    }
}

const similarCategory = async (req, res) => {
    try {
        const cid = req.params.cid
        const products = await Product.find({ category: cid }).populate("category")
        res.status(200).send({
            status: 'success',
            message: 'similar products fetched successfully',
            products
        })
    } catch (error) {
        console.log(error)
    }
} 

const placeOrder = async (req, res) => {
    try {
        const cart = req.body.cart
        const line_items = cart.map(c => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: c.product.name,
                        images: [c.product.photo[0]],
                    },
                    unit_amount: c.product.price * 100
                },
                quantity: c.quantity,
            }
        })
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: 'https://lemonaed-client.onrender.com',
            cancel_url: 'https://lemonaed-client.onrender.com/cart'
        })
        if(session){
            await Order.create({
                products: cart,
                buyer: req.user._id
            })
            res.status(200).send({status: 'success', url: session.url})
        } 
       
    } catch (error) {
        console.log(error)
        res.status(500).send('Something went Wrong')
    }
}

/* buyer: req.user._id, */

module.exports = {createProduct, getAllProducts, getProduct, updateProduct, deleteProduct, searchProductController, similarProduct, similarCategory, placeOrder}
