import { User } from "../models/user.model.js" 
import bcrypt from "bcryptjs"

const signupUser = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body

        if(!userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if(password !== confirmPassword){
            return res.status(400).json({ message: "Passwords do not match" })
        }

        const existingUser = await User.findOne({userName})

        if(existingUser){
            return res.status(400).json({ message: "Username already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePicture: gender === "Male" ? boyProfilePicture : girlProfilePicture
        })

        if(newUser){
            await newUser.save()

        res.status(201).json({
            _id : newUser._id,
            userName: newUser.userName,
            fullName: newUser.fullName,
            profilePicture: newUser.profilePicture
        })
    }
        else{
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.error("Error in signup", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const loginUser = async (req, res) => {
    res.send("User login")
}

const logoutUser = async (req, res) => {
    res.send("User logout")
}

export {
    signupUser,
    loginUser,
    logoutUser
}