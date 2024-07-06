import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cokkies.jwt

        if(!token) {
            return res.status(401).json({error: 'Unauthorized, No token provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if(decoded){
            return res.status(401).json({error: 'Unauthorized, Invalid token'});
        }

        const user = await User.findOne(decoded.userId).select("-password")

        if(!user) {
            return res.status(401).json({error: 'User not found'});
        }

        req.user = user
        next()

    } catch (error) {
        console.error("Failed to protect", error.message)
        res.status(401).json({ message: "Not authorized, token required" })
    }
}

export default protectRoute;