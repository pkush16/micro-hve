<template>
  <div class="app-shell">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header class="app-header">
      <h1>10-Minute Delivery MVP</h1>
      <p>Frontend-only flow for Catalog, Cart, Checkout, and Tracking.</p>
      <nav class="top-nav" aria-label="Primary">
        <RouterLink to="/">Catalog</RouterLink>
        <RouterLink to="/cart">Cart</RouterLink>
        <RouterLink to="/checkout">Checkout</RouterLink>
        <RouterLink to="/tracking">Tracking</RouterLink>
      </nav>
    </header>

    <main id="main-content" tabindex="-1">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
