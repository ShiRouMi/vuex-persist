import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import cart from './modules/cart'
import plugins from 'vuex-storage-state'
// import plugins from './plugins'
Vue.use(Vuex)

plugins.observer(['cart'], true)
const store = new Vuex.Store({
  modules: {
    products,
    cart
  },
  plugins: [plugins]
})

export default store