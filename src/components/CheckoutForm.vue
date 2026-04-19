<template>
  <section aria-labelledby="checkout-form-heading">
    <h2 id="checkout-form-heading" class="section-title">Delivery details</h2>

    <p v-if="isEmpty" class="placeholder-text" role="status">
      Your cart is empty. Add products before checkout.
    </p>

    <form v-else class="checkout-form" novalidate @submit.prevent="$emit('submit')">
      <p
        v-if="submissionAttempted && hasAnyError"
        class="checkout-form__error-summary"
        role="alert"
        tabindex="-1"
      >
        Please fix the highlighted fields before placing your order.
      </p>

      <label>
        Full Name
        <input
          :value="checkoutForm.fullName"
          type="text"
          class="input-control"
          placeholder="Alex Johnson"
          autocomplete="name"
          :aria-invalid="Boolean(submissionAttempted && fieldErrors.fullName)"
          :aria-describedby="submissionAttempted && fieldErrors.fullName ? 'fullName-error' : undefined"
          @input="updateField('fullName', $event)"
        />
        <span
          v-if="submissionAttempted && fieldErrors.fullName"
          id="fullName-error"
          class="field-error"
        >
          {{ fieldErrors.fullName }}
        </span>
      </label>

      <label>
        Street
        <input
          :value="checkoutForm.street"
          type="text"
          class="input-control"
          placeholder="123 Main Street"
          autocomplete="address-line1"
          :aria-invalid="Boolean(submissionAttempted && fieldErrors.street)"
          :aria-describedby="submissionAttempted && fieldErrors.street ? 'street-error' : undefined"
          @input="updateField('street', $event)"
        />
        <span v-if="submissionAttempted && fieldErrors.street" id="street-error" class="field-error">
          {{ fieldErrors.street }}
        </span>
      </label>

      <label>
        City
        <input
          :value="checkoutForm.city"
          type="text"
          class="input-control"
          placeholder="Seattle"
          autocomplete="address-level2"
          :aria-invalid="Boolean(submissionAttempted && fieldErrors.city)"
          :aria-describedby="submissionAttempted && fieldErrors.city ? 'city-error' : undefined"
          @input="updateField('city', $event)"
        />
        <span v-if="submissionAttempted && fieldErrors.city" id="city-error" class="field-error">
          {{ fieldErrors.city }}
        </span>
      </label>

      <label>
        Postcode
        <input
          :value="checkoutForm.postcode"
          type="text"
          class="input-control"
          placeholder="98101"
          autocomplete="postal-code"
          :aria-invalid="Boolean(submissionAttempted && fieldErrors.postcode)"
          :aria-describedby="submissionAttempted && fieldErrors.postcode ? 'postcode-error' : undefined"
          @input="updateField('postcode', $event)"
        />
        <span
          v-if="submissionAttempted && fieldErrors.postcode"
          id="postcode-error"
          class="field-error"
        >
          {{ fieldErrors.postcode }}
        </span>
      </label>

      <p class="cart-total">Order Total: ${{ subtotal.toFixed(2) }}</p>

      <div class="actions-row">
        <RouterLink to="/cart" class="flow-link flow-link--muted">Back to Cart</RouterLink>
        <button class="flow-link" type="submit">Place Mock Order</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  checkoutForm: {
    type: Object,
    required: true,
  },
  submissionAttempted: {
    type: Boolean,
    required: true,
  },
  fieldErrors: {
    type: Object,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  isEmpty: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['submit', 'update-field'])

const hasAnyError = computed(() => Object.values(props.fieldErrors).some(Boolean))

const updateField = (fieldName, event) => {
  emit('update-field', {
    fieldName,
    value: event.target.value,
  })
}
</script>
