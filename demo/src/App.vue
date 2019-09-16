<template>
  <div id="app">
    <h3>ShoppingCart vuex persist</h3> 

    <hr/>

    <h4>Products</h4>
    <ProductList></ProductList>
    <hr/>

    <h4>Cart</h4>
    <ShoppingCart></ShoppingCart>
  </div>
</template>

<script>
import ShoppingCart from './components/ShoppingCart'
import ProductList from './components/ProductList'
export default {
  name: 'app',
  components: {
    ShoppingCart,
    ProductList
  }
}
</script>

<style>

</style>
