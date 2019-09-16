<template>
  <div class="shopping-cart">
    <ul>
      <li v-for="cart in carts" :key="cart.title">
        {{cart.title}} --- {{cart.price}} * {{cart.count}}
      </li>
    </ul>
    Total: <span>{{countedPrice}}</span>
    <br />
    <button @click="cartCheckout" :disabled="isCheckout">checkout</button>
    <div v-if="isCheckout">Checkout successful</div>
    <button @click="clearStorage">clearStorage</button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import plugins from '../store/plugins'
export default {
  computed: {
    ...mapState('cart', {
      carts: state => state.cart,
      isCheckout: state => state.isCheckout
    }),
    ...mapGetters('cart', ['countedPrice'])
  },
  methods: {
    ...mapActions('cart', ['cartCheckout']),
    clearStorage() {
      plugins.remove()
    }
  },
}
</script>