const JWT = require('jsonwebtoken')
const User = require('../model/User')

const dotenv = require('dotenv')

dotenv.config()

const loginRequire = async(req, res, next) => {
    try {
        const verify = JWT.verify(req.headers.authorization, process.env.JWT_SECRET_KEY)
        if(!verify){
            res.status(404).send("Login not correct, please try again")
        }
        req.user = verify
        next()
    } catch (error) {
        res.status(500).send("Please login to continue")
    }
}

const isAdmin = async(req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        if(user.role !== 1){
            res.status(401).send("Unauthorized access")
        }
        else{
            next()
        }
    } catch (error) {
        res.status(500)
    }
}

module.exports = {loginRequire, isAdmin}