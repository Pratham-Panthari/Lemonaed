const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const URI = process.env.MONGODB_URI

const connectToDb = () => {
    mongoose.set('strictQuery', false)
    
    mongoose.connect(URI)
    .then(() => {
        console.log('Connection to database successfull')
    })
}

module.exports = connectToDb