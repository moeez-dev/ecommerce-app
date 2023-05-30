import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import { connectDb } from "./config/db.js"
import authRoutes from './route/authRoute.js'
import cors from 'cors'
import categoryRoutes from './route/categoryRoute.js'
import productRoutes from './route/productRoute.js'
import path from 'path'


//
dotenv.config()

//

connectDb()

//rest object
const app = express()

//
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(path.join(__dirname,'./frontend/dist')))

//
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

//
app.use('*',function(req,res) {
    res.sendFile(path.join(__dirname,'./frontend/dist/index.html'))
})


const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})