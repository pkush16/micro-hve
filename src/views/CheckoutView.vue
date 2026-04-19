<template>
  <section class="screen">
    <header class="screen__header">
      <h1>Checkout</h1>
      <p>Capture delivery details before placing the order.</p>
    </header>

    <CheckoutForm
      :checkout-form="checkoutForm"
      :submission-attempted="submissionAttempted"
      :field-errors="fieldErrors"
      :subtotal="subtotal"
      :is-empty="isEmpty"
      @submit="goToTracking"
      @update-field="onUpdateField"
    />
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import CheckoutForm from '../components/CheckoutForm.vue'
import { useCart } from '../composables/useCart'
import { useCheckout } from '../composables/useCheckout'
import { useOrderTracking } from '../composables/useOrderTracking'

const router = useRouter()
const { cartItems, subtotal, isEmpty, clearCart } = useCart()
const {
  checkoutForm,
  submissionAttempted,
  fieldErrors,
  canSubmit,
  markSubmissionAttempted,
  resetCheckoutForm,
  getCheckoutPayload,
} = useCheckout()
const { createOrder } = useOrderTracking()

const onUpdateField = ({ fieldName, value }) => {
  checkoutForm[fieldName] = value
}

const goToTracking = () => {
  markSubmissionAttempted()

  if (!canSubmit.value || isEmpty.value) {
    return
  }

  createOrder({
    items: cartItems.value.map((item) => ({ ...item })),
    checkoutDetails: getCheckoutPayload(),
  })

  clearCart()
  resetCheckoutForm()
  router.push('/tracking')
}
</script>
