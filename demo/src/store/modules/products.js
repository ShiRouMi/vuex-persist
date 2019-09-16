import axios from 'axios'
const state = {
  products: []
}

const getters = {}

const mutations = {
  setProducts(state, payload) {
    state.products = payload
  }
}

const actions = {
  getProducts({ commit }) {
    axios.get('./products.json').then(({ data }) => {
      commit('setProducts', data.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}