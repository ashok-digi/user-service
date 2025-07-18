import User from "../models/User.js";
import { loginSchema, registerSchema } from "../schemas/userSchemas.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function registerUser(req, res, next){
    try {
        const validated = registerSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(validated.password, 10)
        const user = new User({email: validated.email, password: hashedPassword, role: validated.role})
        await user.save()
        res.status(201).json({message: "User registered", userId: user._id})
    } catch (error) {
        next(error)
    }
}

export async function loginUser(req, res, next){
    try {
        const validated = loginSchema.parse(req.body)
        const user = await User.findOne({email: validated.email})
        if(!user) throw new Error("Invalid credentials")
        const isMatch = await bcrypt.compare(validated.password, user.password)
        if(!isMatch) throw new Error("Invalid credentials")
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"} )
        res.json({token})
    } catch (error) {
        next(error)
    }
}