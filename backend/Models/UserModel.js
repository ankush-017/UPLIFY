import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    // phone: {type: Number},
    uid: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate Firebase users
    },
    email: { type: String, unique: true, required: true },
    phone: {type: Number},
    password: { type: String },
    role: { type: String, enum: ['student', 'company'], default: 'student' },
},
    { timestamps: true }
)

const User = new mongoose.model('User', userSchema);
export default User;