import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controller/categoryController.js'


const router = express.Router()

//routes
//create category post
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

//update category put
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

//all category get
router.get('/get-category', categoryController)

//single category get
router.get('/single-category/:slug', singleCategoryController)

//
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)


export default router