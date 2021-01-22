const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')


// // login/logout
// routes.get('/login', SessionController.loginForm)
// routes.post('/login', SessionController.login)
// routes.post('/logout', SessionController.logout)


// // reset password / forgot
// routes.get('/forgot-password', SessionController.forgotForm)
// routes.get('/password-reset', SessionController.resetForm)
// routes.post('/forgot-password', SessionController.forgot)
// routes.post('/forgot-password', SessionController.reset)


// // user register UserController 
// routes.get('/register', UserController.registerForm)
// routes.post('/register', UserController.post)

// routes.get('/register', UserController.show)
// routes.put('/register', UserController.update)
// routes.delete('/register', UserController.delete)

module.exports = routes
