import {email, z} from "zod"

export const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(["customer", "admin"]).optional()
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)    
})