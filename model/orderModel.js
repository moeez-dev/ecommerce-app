import mongoose from 'mongoose'


const schema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref: 'Product'
    }],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    status: {
        type: String,
        default: 'not processed',
        enum: ['not processed', 'processing', 'shipped', 'deliver', 'cancel']
    }
}, { timestamps: true })

const Order = mongoose.model('Order', schema)

export default Order