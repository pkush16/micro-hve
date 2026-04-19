import { computed, reactive, ref } from 'vue'

const initialFormState = {
  fullName: '',
  street: '',
  city: '',
  postcode: '',
}

const checkoutForm = reactive({ ...initialFormState })
const submissionAttempted = ref(false)

const trimValue = (value) => value.trim()

export const useCheckout = () => {
  const fieldErrors = computed(() => {
    const errors = {
      fullName: '',
      street: '',
      city: '',
      postcode: '',
    }

    if (!trimValue(checkoutForm.fullName)) {
      errors.fullName = 'Name is required.'
    }

    if (!trimValue(checkoutForm.street)) {
      errors.street = 'Street is required.'
    }

    if (!trimValue(checkoutForm.city)) {
      errors.city = 'City is required.'
    }

    if (!trimValue(checkoutForm.postcode)) {
      errors.postcode = 'Postcode is required.'
    } else if (!/^[A-Za-z0-9\- ]{4,10}$/.test(trimValue(checkoutForm.postcode))) {
      errors.postcode = 'Enter a valid postcode.'
    }

    return errors
  })

  const hasErrors = computed(() => Object.values(fieldErrors.value).some(Boolean))

  const canSubmit = computed(() => !hasErrors.value)

  const markSubmissionAttempted = () => {
    submissionAttempted.value = true
  }

  const resetCheckoutForm = () => {
    Object.assign(checkoutForm, initialFormState)
    submissionAttempted.value = false
  }

  const getCheckoutPayload = () => ({
    fullName: trimValue(checkoutForm.fullName),
    street: trimValue(checkoutForm.street),
    city: trimValue(checkoutForm.city),
    postcode: trimValue(checkoutForm.postcode),
  })

  return {
    checkoutForm,
    submissionAttempted,
    fieldErrors,
    canSubmit,
    markSubmissionAttempted,
    resetCheckoutForm,
    getCheckoutPayload,
  }
}
