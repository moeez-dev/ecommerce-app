import mongoose from "mongoose";


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true
    }
})

const Category = mongoose.model('Category', schema)

export default Category