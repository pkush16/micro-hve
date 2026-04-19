<template>
  <section aria-labelledby="catalog-products-heading">
    <div class="catalog-toolbar">
      <h2 id="catalog-products-heading" class="section-title">Products</h2>
      <label class="catalog-toolbar__search">
        <span class="catalog-toolbar__search-label">Search</span>
        <input
          v-model="searchQuery"
          type="search"
          class="input-control"
          placeholder="Find products"
          aria-label="Search products"
        />
      </label>
    </div>

    <p v-if="filteredProducts.length === 0" class="placeholder-text" role="status">
      No products match your search.
    </p>

    <ul v-else class="catalog-list">
      <li v-for="product in filteredProducts" :key="product.id" class="catalog-list__item">
        <div class="catalog-list__name-row">
          <h3>{{ product.name }}</h3>
          <span>${{ product.price.toFixed(2) }}</span>
        </div>
        <p>Available: {{ product.availableQty }}</p>
        <button
          class="flow-link"
          type="button"
          @click="$emit('add-to-cart', product)"
          :aria-label="`Add ${product.name} to cart`"
        >
          Add to Cart
        </button>
      </li>
    </ul>

    <RouterLink to="/cart" class="flow-link">Go to Cart ({{ itemCount }})</RouterLink>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  itemCount: {
    type: Number,
    required: true,
  },
})

defineEmits(['add-to-cart'])

const searchQuery = ref('')

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return props.products
  }

  return props.products.filter((product) => product.name.toLowerCase().includes(query))
})
</script>
