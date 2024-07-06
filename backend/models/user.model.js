import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    gender:{
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    profilePicture:{
        type: String,
        default: ''
    }
})

export const User = mongoose.model('User', userSchema);