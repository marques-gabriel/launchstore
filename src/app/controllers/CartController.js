const Cart = require('../../lib/cart')

const LoadProductService =  require('../services/LoadProductService')

module.exports = {

    index(req, res) {

        try {

            let { cart } = req.session

            // gerenciador de carrinho
            cart = Cart.init(cart)

            return res.render("cart/index", { cart })

        } catch (error) {

            console.error(error)
        }
    },

    async addOne(req, res) {

        // pegar o id do produto e o produto
        const { id } = req.params
        const product =  await LoadProductService.load('product', {where: { id}})

        // pegar o carrinho da sessao
        let { cart } = req.session

        // adicionar o produto ao carrinho
        cart = Cart.init(cart).addOne(product)

        // atualizar o carrinho da sessao
        req.session.cart = cart

        // redirecionar o usuariio para a tela do carrinho
        return res.redirect('/cart')

    },

    removeOne(req, res) {

        // pegar o id do produto e o produto
        const { id } = req.params

        // pegar o carrinho da sessao
        let { cart } = req.session

        if(!cart) return res.redirect('/cart')

        // inicar o carrinho (gerenciador carrinho) e remover
        cart = Cart.init(cart).removeOne(id)

        // atualizar o carrinho da sessao, removendo 1 item
        req.session.cart = cart

        // redirecionar o usuario para a tela do carrinho
        return res.redirect('/cart')

    },

    delete(req, res) {

        let { cart } = req.session
        let { id } = req.params
        
        if(!cart) return

        req.session.cart = Cart.init(cart).delete(id)

        return res.redirect('/cart')
    }

    
}