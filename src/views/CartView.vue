<template>
  <section class="screen">
    <header class="screen__header">
      <h1>Cart</h1>
      <p>Review selected products and proceed to checkout.</p>
    </header>

    <CartSummary
      :cart-items="cartItems"
      :is-empty="isEmpty"
      :subtotal="subtotal"
      @decrease-quantity="decreaseQuantity"
      @increase-quantity="increaseQuantity"
      @remove-item="removeItem"
    />
  </section>
</template>

<script setup>
import CartSummary from '../components/CartSummary.vue'
import { useCart } from '../composables/useCart'

const { cartItems, isEmpty, subtotal, updateItemQuantity, removeItem } = useCart()

const increaseQuantity = (item) => {
  updateItemQuantity(item.productId, item.quantity + 1)
}

const decreaseQuantity = (item) => {
  updateItemQuantity(item.productId, item.quantity - 1)
}
</script>
