const User = require('../models/User')
const { compare } = require('bcryptjs')

async function login(req, res, next) {

    const { email, password } = req.body

    const user = await User.findOne({ where: {email} })

    if(!user) return res.render("session/login", {
        user: req.body,
        error: "Usuário não cadasrado"
    })


    const passed = await compare(password, user.password)

    if(!passed) return res.render("session/login", {
        user: req.body,
        error: "Senha incorreta."
    })

    req.user = user

    next()

}

async function forgot(req, res, next) {
    const { email } = req.body

    try {

        let user = await User.findOne({where: {email}})

        if(!user) return res.render("session/forgot-password", {
            user: req.body,
            error: "Cadastro não localizado"
        })

        req.user = user

        next()

    } catch (error) {
        console.error(err)
    }
}

async function reset(req, res, next) {
            // procurar o usuario

            const { email, password , token, passwordRepeat } = req.body

            const user = await User.findOne({ where: {email} })

            if(!user) return res.render("session/password-reset", {
                user: req.body,
                token,
                error: "Usuário não cadasrado"
            })

            // verificar se a senha é a mesma 

            if(password != passwordRepeat)
            return res.render('session/password-reset', {
                user: req.body,
                token,
                error: 'Senha e repetição da senha são diferentes'
            })

            // verificar se o token eh o mesmo 
            if (token != user.reset_token) return res.render('session/password-reset', {
                user: req.body,
                token,
                error: 'Token inválido. Solicite uma nova recuperação de senha'
            }) 

            // verificar se o token nao expirou 

            let now =  new Date()
            now = now.setHours(now.getHours())

            if( now > user.reset_token_expires) return res.render('session/password-reset', {
                user: req.body,
                token,
                error: 'Token expirado. Solicite uma nova recuperação de senha'
            }) 

            req.user = user
            next()
}

module.exports = {
    login,
    forgot,
    reset
}