<template>
  <section class="screen">
    <header class="screen__header">
      <h1>Catalog</h1>
      <p>Browse products and start your 10-minute delivery order.</p>
    </header>

    <ProductList :products="products" :item-count="itemCount" @add-to-cart="addToCart" />
  </section>
</template>

<script setup>
import ProductList from '../components/ProductList.vue'
import { useCart } from '../composables/useCart'
import { mockCatalog as products } from '../data/mockCatalog'

const { addItem, itemCount } = useCart()

const addToCart = (product) => {
  addItem(product)
}
</script>
