const { hashedPassword, comparePassword } = require('../helpers/signUpHelper')
const Order = require('../model/Order')
const User = require('../model/User')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const signUpUser = async (req, res) => {
    try {
        const { name, email, password, address, phno, answer } = req.body
        if(!name){
            return res.status(500).send({status: 'failed', message: 'Name is required'})
        }
        if(!email){
            return res.status(500).send({status: 'failed', message: 'email is required'})
        }
        if(!email.includes('@') || !email.includes('.')){
            return res.status(500).send({status: 'failed', message: 'Email invalid'})
        } 
        if(!password){
            return res.status(500).send({message: 'password is required'})
        }
       if(password.length <5 || password.length >25){
            return res.status(500).send({status: 'failed', message: 'Password must be 5-25 characters long'})
        } 
        if(!address){
            return res.status(500).send({ message:'address is required'})
        }
        if(!phno){
            return res.status(500).send({message:'Phone no is required'})
        }
       if(phno.length >10 || phno.length <10){
            return res.status(500).send({status: 'failed', message: 'Phone No Invalid'})
        }
        if(!answer){
            return res.status(500).send({message:'Answer is required'})
        }

        const existingUser = await User.findOne({ email })

        if(existingUser) {
            return res.status(500).send({status: 'failed', message: "Email already exists. Please login"})
        }

        const hashPassword = await hashedPassword(password)

        const user = await User.create({ name, email, password: hashPassword, address, phno, answer })
        res.status(200).send({
            status: "success",
            message: "User created successfully",
            user
        })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Unable to register user"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        
        const { email, password } = req.body
        if(!email){
            return res.status(404).send({message: "Email or password invaild"})
        }
        if(!password){
            return res.status(404).send({message: "Email or Password invalid"})
        }

        const user = await User.findOne({ email })
        if(!user){
            return res.status(404).send({status: 'failed', message: "User does not exists, please sign up"})
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(404).send({message: "Email or Password invalid"})
        }
        const JWT_KEY = process.env.JWT_SECRET_KEY
        const token = await JWT.sign({ _id: user._id }, JWT_KEY, { expiresIn: '1d' } )
        res.status(200).send({
            status: "success",
            id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            phno: user.phno,
            role: user.role,
            token
        })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Unable to login user",
            error: error.message
        })
    }
    
}

const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body

        if(!email){
            return res.status(500).send({status: 'failed', message: 'email is required'})
        }
        if(!email.includes('@') || !email.includes('.')){
            return res.status(500).send({status: 'failed', message: 'Email invalid'})
        } 
        if(!answer) {
            return res.status(500).send({message: 'Answer is required'})
        }
        if(!newPassword){
            return res.status(500).send({message: 'password is required'})
        }
       if(newPassword.length <5 || newPassword.length >25){
            return res.status(500).send({status: 'failed', message: 'Password must be 5-25 characters long'})
        } 

        const user = await User.findOne({email, answer})
        if(!user){
            return res.status(404).send({status: 'failed', message: 'wrong email or answer'})
        }
        const hased = await hashedPassword(newPassword)
        await User.findByIdAndUpdate(user._id, {password: hased})
        res.status(200).send({
            status: 'success',
            message: 'Password successfully Changed',
            
        })
    } catch (error) {
        console.log(error)
        res.status(200).send({
            status: 'failed',
            message: 'Something went wrong',
            error
        })
    }
}

const testController = async( req, res) => {
    res.send("test response")
}

const getOrderController = async (req, res) => {
    try {
        const orders = await Order.find({buyer: req.user._id}).populate("products.product", "name price").populate("buyer", "name address")
        res.status(200).send({
            status: 'success',
            message: 'orders fetched successfully',
            orders
        }) 
    } catch (error) {
        console.log(error)
        res.status(200).send({
            status: 'failed',
            message: 'Error while getting orders',
            error
        })
    }
}

const getAdminOrderController = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("products.product", "name price").populate("buyer", "name address phno email")
        res.status(200).send({
            status: 'success',
            message: 'orders fetched successfully',
            orders
        }) 
    } catch (error) {
        res.status(200).send({
            status: 'failed',
            message: 'Error while getting orders',
            error
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
        res.status(200).send({
            status: 'success',
            message: 'Status updated successfully'
        })
    } catch (error) {
        res.status(200).send({
            status: 'failed',
            message: 'Error while getting orders',
            error
        })
    }
}

module.exports = { signUpUser, loginUser, testController, forgotPasswordController, getOrderController, getAdminOrderController, updateOrder } 