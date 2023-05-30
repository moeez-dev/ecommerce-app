import mongoose from 'mongoose'

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to ${conn.connection.host} successfully`)
    } catch (error) {
        console.log(`error in mongoDb ${error}`)
    }
}

