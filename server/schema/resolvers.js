const products = require('../models/products');
let cart = [];

module.exports = {
  Query: {
    products() {
      return products;
    },
    product(_, {id}) {
      const item = products.find(val => val.id === +id);
      if(!item) {
        throw new Error(`No products with id: ${id}`);
      } else {
        return products.find(val => val.id === +id);
      }
    },
    cart() {
      return this.cart;
    }
  },
  Mutation: {
    addProductToCart(_, {id}) {
      const cartItem = cart.find(val => val.id === +id);
      if(cartItem) {
        cartItem.quantity +=1;
      } else {
        const product = products.find(val => val.id === +id);
        if(!product) {
          throw new Error(`No Product with id: ${id}`)
        }
        const productClone = {
          ...product, 
          quantity: 1
        };
        cart.push(productClone);
      }
      return cart;
    },
    removeProductFromCart(_, {id}) {
      const cartItem = cart.find(val => val.id === +id);
      if (!cartItem) {
        throw new Error(`No Item With ID: ${id}`);
      }
      cart = cart.filter(val => val.id !== +id);
      return id;
    },
    updateQuantity(_, { id, change }) {
      const cartItem = cart.find(val => val.id === +id);
      if (!cartItem) {
        throw new Error(`No cartItem Matching ID: ${id}`);
      }
      if (change === 'up') {
        cartItem.quantity += 1;
      } else if (change === 'down' && cartItem.quantity > 0) {
        cartItem.quantity -= 1;
      }
      return cartItem;
    }
  }
}
