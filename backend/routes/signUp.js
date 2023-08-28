const express = require('express')
const { signUpUser, loginUser, testController, forgotPasswordController, getOrderController, getAdminOrderController, updateOrder } = require("../controller/signUpController")
const {loginRequire, isAdmin} = require('../middlewear/authMiddlewear')
const router = express.Router()

router.post('/sign-up', signUpUser)

router.post('/login', loginUser)

router.post('/forgot-password', forgotPasswordController)

router.post('/test', loginRequire, isAdmin, testController)

router.get('/user-auth', loginRequire, isAdmin, (req, res) => {
    res.status(200).send({ok: true})
    
})

router.get('/orders/get-all-orders', loginRequire, getOrderController)

router.get('/admin-orders/get-all-orders', getAdminOrderController)

router.put('/admin-orders/update-order/:id', updateOrder)

module.exports = router
