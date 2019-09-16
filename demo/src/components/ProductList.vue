<template>
  <ul>
    <li v-for="product in products">
      {{product.title}}
      -
      {{product.price}}

      <button @click="addToCart(product)">添加到购物袋</button>
    </li>
  </ul>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
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