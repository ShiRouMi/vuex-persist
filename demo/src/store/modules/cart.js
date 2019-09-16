import { 
  CART_STORAGE,
  IS_CHECKOUT,
  getStorage,
  setStorage,
  removeStorage
} from '../storage'
import plugins from '../plugins'

const state = {
  cart: [],
  isCheckout: false
}

const getters = {
  countedPrice: state => {
    return state.cart.reduce((count, item) => count + +item.price * item.count, 0)
  }
}

const mutations = {
  setCheckoutStatus(state, status) {
    state.isCheckout = status
    // setStorage(IS_CHECKOUT, state.isCheckout)
  },

  setCartItems(state, { cart }) {
    state.cart = cart
  },

  pushProductToCart(state, payload) {
    state.cart.push({
      ...payload,
      count: 1
    })
  },

  increaseProductCount(state, { title }) {
    let cartItem = state.cart.find(item => item.title === title)
    cartItem.count++
  }
}

const actions = {
  cartCheckout({ commit }) {
    commit('setCheckoutStatus', true)
    commit('setCartItems', { cart: [] })

    // plugins.remove()
    // removeStorage(CART_STORAGE)
  },

  addToCart({ commit, state, rootState }, payload) {
    commit('setCheckoutStatus', false)
    let cartItem = state.cart.find(item => item.title === payload.title)
    if(!cartItem) {
      commit('pushProductToCart', payload)
    } else {
      commit('increaseProductCount', payload)
    }
    // setStorage(CART_STORAGE, state.cart)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}