const slugify = require('slugify')
const Product = require('../model/Product')

const mongoose = require('mongoose')
const braintree = require('braintree')
const Order = require('../model/Order')

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "hppcr7qxtstkpbkn",
    publicKey: "tnsg7ch57zs9mznn",
    privateKey: "0dd8f32690f82121bc95aba5198f2562",
  });

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
<<<<<<< HEAD
        const page = req.query.page;
=======
       const page = req.query.page;
>>>>>>> 2321e3c3241769140a13bc329a1ba54008a8b51f
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


const brainTreeToken = async(req, res) => {
    try {
        gateway.clientToken.generate({}, function(error, result) {
            if(error){
                res.send(error)
            }
            else{
                res.send(result)
            }
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const brainTreePayment = async(req, res) => {
    try {
        const { cart, nonce } = req.body
        let totalPrice = 0
        cart?.map((p) => {
          totalPrice = parseInt(p.product.price) + parseInt(totalPrice)
        })
        totalPrice = parseInt(totalPrice) + parseInt(10)
        let newTransaction = gateway.transaction.sale({
            amount: totalPrice,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true,
            }
        }, (error, result) => {
            if(result){
                const order = new Order({
                    products: cart,
                    payment: result,
                    buyer: req.user._id,
    
                }).save()
                
                res.json({ok: true})
            }
            else{
                res.send(error)
            }
            
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

<<<<<<< HEAD
module.exports = {createProduct, getAllProducts, getProduct, updateProduct, deleteProduct, searchProductController, similarProduct, similarCategory, brainTreeToken ,brainTreePayment}
=======
module.exports = {createProduct, getAllProducts, getProduct, updateProduct, deleteProduct, searchProductController, similarProduct, brainTreeToken ,brainTreePayment}
>>>>>>> 2321e3c3241769140a13bc329a1ba54008a8b51f
