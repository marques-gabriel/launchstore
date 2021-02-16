const Cart = require('../../lib/cart')

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

    }
}