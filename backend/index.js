const express = require('express')
const dotenv = require('dotenv')
const connectToDb = require('./db')
const signUpRoute = require('./routes/signUp')
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute')

const cors = require('cors')
dotenv.config()

const app = express()
connectToDb()
app.use(cors())
app.use(express.json())


app.use('/api/v1/auth', signUpRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoute)



const port = process.env.PORT

const server = app.listen(port, () => {
    console.log(`server started at port http://localhost:${port}/`)
})

process.on("unhandledRejection", (err) => {
    console.log(err)
    console.log('Shutting down server due to unhandled Rejection error')
    server.close(()=>{
        process.exit(1)
    })
})