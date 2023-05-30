import express from 'express'
import formidable from 'express-formidable'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controller/productController.js'

const router = express.Router()

//routes
//create product post
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//get all products
router.get('/get-product', getProductController)

//get single product
router.get('/get-product/:slug', getSingleController)

//get product photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController)

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

//filter router
router.post('/filter-product', productFilterController)

//product count
router.get('/product-count', productCountController)

//product per papge
router.get('/product-list/:page', productListController)

//search product
router.get('/search/:keyword', searchProductController)

//related products
router.get('/related-product/:pid/:cid', relatedProductController)

//braintree token
router.get('/braintree/token', braintreeTokenController)

//payment
router.post('/braintree/payment', requireSignIn, braintreePaymentController)

export default router