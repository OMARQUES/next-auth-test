import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Codigo de autenticação 2FA",
        html: `<p>Use este codigo: ${token}</p>`
    })
        
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Recuperação de senha",
        html: `<p>Clique <a href="${resetLink}">Aqui</a> para alterar sua senha.</p>`
    })
}



export const sendVerificationEmail = async (
    email: string, 
    token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Email de verificação",
        html: `<p>Clique <a href="${confirmLink}">Aqui</a> para confirmar seu email.</p>`
    })
}