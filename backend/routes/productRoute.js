const express = require('express')

const {loginRequire, isAdmin} = require('../middlewear/authMiddlewear')

const {createProduct, getAllProducts, getProduct, updateProduct, deleteProduct, searchProductController, similarProduct, similarCategory,
   placeOrder } = require('../controller/productController')


const router = express.Router()


router.post('/create-product', createProduct)

router.get('/get-all-products', getAllProducts)

router.get('/get-product/:slug', getProduct)

router.put('/update-product/:pid', updateProduct)

router.delete('/delete-product/:pid',  deleteProduct)

router.get('/search/:keyword', searchProductController)

router.get('/similar-products/:pid/:cid', similarProduct)

router.get('/similar-products/:cid', similarCategory)

router.post('/create-checkout-session', loginRequire, placeOrder) 

module.exports = router