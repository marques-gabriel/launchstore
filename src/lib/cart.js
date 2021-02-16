const { formatPrice } = require('./utils')

const Cart = {

    init(oldCart) {
        if (oldCart) {
            this.items = oldCart.items
            this.total = oldCart.total
        } else {
            this.items = []
            this.total = {
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }
        }
        return this
    },

    addOne(product) {

        // vefiricar se o item existe no carrinho
        let inCart = this.getCardItem(product.id)

        // se nao existir
        if (!inCart) {
            inCart = {
                product: {
                    ...product,
                    formattedPrice: formatPrice(product.price)
                },
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }

            this.items.push(inCart)
        }

        // quantidade maxima excedida
        if(inCart.quantity >= product.quantity) return this

        // update item
        inCart.quantity++
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formattedPrice = formatPrice(inCart.price)

        // update cart
        this.total.quantity++
        this.total.price += inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)

        return this

    },

    removeOne(productId) {

        // pegar item do carinho
        const inCart = this.getCardItem(productId)

        if(!inCart) return this

        // atualizar item
        inCart.quantity--
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formattedPrice = formatPrice(inCart.price)

        // atualizar o carrinho
        this.total.quantity--
        this.total.price -= inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)

        if(inCart.quantity < 1) {

            // const itemIndex = this.items.indexOf(inCart)
            // this.items.splice(itemIndex, 1)

            this.items = this.items.filter(item => item.product.id != inCart.product.id)

            return this
        }

        return this
    },

    delete(productId) {

        const inCart = this.getCardItem(productId)

        if(!inCart) return this

        if(this.items.length > 0) {
            this.total.quantity -= inCart.quantity
            this.total.price -= (inCart.product.price * inCart.quantity)
            this.total.formattedPrice = formatPrice(this.total.price)
        }

        this.items = this.items.filter(item => inCart.product.id != item.product.id)

        return this
    },

    getCardItem(productId) {

        return this.items.find(item => item.product.id == productId)


    }
}

module.exports = Carts