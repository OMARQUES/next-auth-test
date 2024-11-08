import { UserRole } from '@prisma/client'
import * as z from 'zod'

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
    .refine((data) => {
        if(data.password && !data.newPassword){
            return false
        }

        return true
    },{
        message: "Nova senha é obrigatória!",
        path: ["newPassword"]
    })
    .refine((data) => {
        if(data.newPassword && !data.password){
            return false
        }

        return true
    },{
        message: "Senha atual é obrigatória!",
        path: ["password"]
    })
    

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {message: "Minimo de 6 caracteres"}),
}) 

export const ResetSchema = z.object({
    email: z.string().email({message: "Email invalido"})
}) 

export const LoginSchema = z.object({
    email: z.string().email({message: "Email invalido"}), 
    password: z.string().min(1, {message: "Senha invalida"}),
    code: z.optional(z.string())
}) 

export const RegisterSchema = z.object({
    email: z.string().email({message: "Email invalido"}), 
    password: z.string().min(6, {message: "Minimo de 6 caracteres"}),
    name: z.string().min(1, {message: "Nome invalido"})

}) 
