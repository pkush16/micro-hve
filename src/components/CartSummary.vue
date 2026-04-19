<template>
  <section aria-labelledby="cart-summary-heading">
    <h2 id="cart-summary-heading" class="section-title">Cart items</h2>

    <p v-if="isEmpty" class="placeholder-text" role="status">
      Your cart is empty. Add products to continue.
    </p>

    <ul v-else class="cart-list">
      <li v-for="item in cartItems" :key="item.productId" class="cart-list__item">
        <div>
          <p class="cart-list__name">{{ item.name }}</p>
          <p class="cart-list__meta">${{ item.price.toFixed(2) }} each</p>
        </div>

        <div class="cart-list__controls" :aria-label="`Adjust quantity for ${item.name}`">
          <button
            type="button"
            class="flow-link flow-link--muted"
            @click="$emit('decrease-quantity', item)"
            :aria-label="`Decrease quantity for ${item.name}`"
          >
            -
          </button>
          <span class="cart-list__quantity" aria-live="polite">{{ item.quantity }}</span>
          <button
            type="button"
            class="flow-link flow-link--muted"
            @click="$emit('increase-quantity', item)"
            :aria-label="`Increase quantity for ${item.name}`"
          >
            +
          </button>
          <button
            type="button"
            class="flow-link flow-link--danger"
            @click="$emit('remove-item', item.productId)"
            :aria-label="`Remove ${item.name} from cart`"
          >
            Remove
          </button>
        </div>
      </li>
    </ul>

    <p class="cart-total">Subtotal: ${{ subtotal.toFixed(2) }}</p>

    <div class="actions-row">
      <RouterLink to="/" class="flow-link flow-link--muted">Back to Catalog</RouterLink>
      <RouterLink v-if="!isEmpty" to="/checkout" class="flow-link">Continue to Checkout</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  cartItems: {
    type: Array,
    required: true,
  },
  isEmpty: {
    type: Boolean,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
})

defineEmits(['increase-quantity', 'decrease-quantity', 'remove-item'])
</script>
