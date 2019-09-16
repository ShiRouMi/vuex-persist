<template>
  <ul>
    <li v-for="product in products" :key="product.title">
      {{product.title}}
      -
      {{product.price}}

      <button @click="addToCart(product)">添加到购物袋</button>
    </li>
  </ul>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: mapState('products', {
    products: state => state.products
  }),
  methods: {
    ...mapActions('cart', ['addToCart'])
  },
  created() {
    this.$store.dispatch('products/getProducts')
  },
}
</script>