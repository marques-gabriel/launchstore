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

    }
}