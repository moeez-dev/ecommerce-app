import express from 'express'
import { forgotPasswordController, loginController, registerController, testController, updateProfile } from '../controller/authController.js'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'


const router = express.Router()

//register post method
router.post('/register', registerController)
router.post('/login', loginController)
router.get('/test', requireSignIn, isAdmin, testController)

//forgot password ||post
router.post('/forgot-password', forgotPasswordController)

//protected user route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

//protected admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

//update profile
router.put('/profile', requireSignIn, updateProfile)

export default router