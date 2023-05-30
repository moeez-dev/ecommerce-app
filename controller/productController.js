import slugify from "slugify"
import Product from "../model/productModel.js"
import fs from 'fs'
import braintree from "braintree"
import Order from "../model/orderModel.js"

//dotenv --- gateway wasnt working without importing this
import dotenv from 'dotenv'
dotenv.config()

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})



//create product
export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        if (!name || !description || !price || !category || !quantity || !shipping || !photo) {
            return res.status(401).send({
                success: false,
                message: 'all fields are  required'
            })
        }
        if (photo.size > 1000000) {
            return res.send('photo size must be less than 1mb')
        }
        const product = new Product({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: 'product created successfully',
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in create product',
            error
        })
    }
}

//get product
export const getProductController = async (req, res) => {
    try {
        const product = await Product.find({}).populate('category').select('-photo').limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            totalCount: product.length,
            message: 'successfully get all products',
            product
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in getting all product',
            error
        })
    }
}

//get single product
export const getSingleController = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message: 'got single product successfully',
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in getting single product',
            error
        })
    }
}

//product photo controller
export const productPhotoController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid).select('photo')
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
        }
        res.status(200).send(
            product.photo.data
        )
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in getting  product photo',
            error
        })
    }
}

//delete product
export const deleteProductController = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.pid)
        res.status(200).send({
            success: true,
            message: 'product deleted successfully',
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in deleting product',
            error
        })
    }
}

//uodate product
export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        if (!name || !description || !price || !quantity || !shipping) {
            return res.status(401).send({
                success: false,
                message: 'all fields are  required'
            })
        }
        // if (photo.size > 1000000) {
        //     return res.send('photo size must be less than 1mb')
        // }
        const product = await Product.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(200).send({
            success: true,
            message: 'product updated successfully',
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in updating product',
            error
        })
    }
}

//filter product
export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) {
            args.category = checked
        }
        if (radio.legth) {
            args.price = { $gte: radio[0], $lte: radio[1] }
        }

        const products = await Product.find(args)
        res.status(200).send({
            success: true,
            message: 'filtered products successfully',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in filter product',
            error
        })
    }
}

//product count
export const productCountController = async (req, res) => {
    try {
        const total = await Product.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            message: "count successful",
            total
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in product count function',
            error
        })
    }
}

//product list based on page
export const productListController = async (req, res) => {
    try {
        const perPage = 2
        const page = req.params.page ? req.params.page : 1
        const products = await Product.find({}).select('-photo').skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in product per page function',
            error
        })
    }
}

//search
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params
        const result = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        }).select('-photo')
        res.json(result)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in searching',
            error
        })
    }
}

//related product
export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const products = await Product.find({
            category: cid,
            _id: { $ne: pid }
        }).select('-photo').limit(3).populate('category')
        res.status(200).send({
            success: true,
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in getting related product',
            error
        })
    }
}

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, (err, response) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in getting braintree token controller',
            error
        })
    }

}

//payment controller
export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body
        let total = 0
        cart.map(i => total += i)

        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
            async function (error, result) {
                if (result) {
                    const order = await new Order({
                        products: cart,
                        payment: result,
                        buyer: req.user._id
                    }).save()
                    res.json({ ok: true })
                } else {
                    res.status(500).send(error)
                }
            }
        )

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in getting braintree payment controller',
            error
        })
    }
}