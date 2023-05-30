import JWT from 'jsonwebtoken'
import User from '../model/userModel.js'

//protected route token based
export const requireSignIn = (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        if (!decode) return res.send('error..please login again')

        req.user = decode;
        next()
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in auuthorization",
            error
        })
    }
}

//admin excess
export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) return res.send('user not found')

        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "current role is not alowed to access this route"
            })
        } else {
            next()

        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in admin middlware',
            error
        })
    }
}