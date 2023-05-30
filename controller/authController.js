import { comparePassword, hashPassword } from "../helper/authHelper.js"
import User from "../model/userModel.js"

import JWT from "jsonwebtoken"

//post register
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        //validation
        if (!name || !email || !password || !phone || !address || !answer) {
            return res.send({ message: 'all fields are required' })
        }
        //existing user
        const alreadyUser = await User.findOne({ email })
        if (alreadyUser) {
            return res.send('user already exist with this email')
        }
        //const hashed password
        const hashedPassword = await hashPassword(password)

        // 
        const user = new User({ name, email, password: hashedPassword, phone, address, answer })
        const saveUser = await user.save()
        res.status(201).send({
            success: true,
            message: 'user created successfully',
            saveUser
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in registeration',
            error
        })
    }
}

// post || login 

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.send('please enter email and password')
        }
        //check user
        const user = await User.findOne({ email })
        if (!user) {
            return res.send('please enter valid email and password')
        }
        //password matching
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.send('please enter valid email and password')
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
                role: user.role,
                phone: user.phone
            },
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in login',
            error
        })
    }
}

//protected route //test
export const testController = async (req, res) => {
    res.send('protected route')
}

//forgot password
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email || !answer || !newPassword) {
            return res.status(400).send({ message: 'all fields are required' })
        }
        const user = await User.findOne(email, answer)
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'email and answer is required'
            })
        }
        const hashed = await hashPassword(newPassword)
        await User.findByIdAndUpdate(user._id, { password: hashed }, { new: true })
        res.status(200).send({
            success: true,
            message: 'password changed successfully'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in forgot password',
            error
        })
    }
}

//update profile
export const updateProfile = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body
        const user = await User.findById(req.user._id)


        const hashedPassword = password ? await hashPassword(password) : undefined


        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            phone: phone || user.phone,
            address: address || user.address,
            password: hashedPassword || user.password,
            email: user.email
        }, { new: true })

        res.status(200).send({
            success: true,
            message: 'user updated successfully',
            updatedUser
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in update profile controller',
            error
        })
    }
}