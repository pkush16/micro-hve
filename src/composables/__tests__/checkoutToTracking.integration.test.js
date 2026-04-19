import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { products } from '../../mock-data/products'
import { useCart } from '../useCart'
import { useCheckout } from '../useCheckout'
import { useOrderTracking } from '../useOrderTracking'

describe('checkout to tracking integration', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))

    const { clearCart } = useCart()
    const { resetCheckoutForm } = useCheckout()
    const { clearOrder } = useOrderTracking()

    clearCart()
    resetCheckoutForm()
    clearOrder()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('creates a trackable order from checkout details and clears transient state', () => {
    const { addItem, cartItems, clearCart, isEmpty } = useCart()
    const {
      checkoutForm,
      canSubmit,
      markSubmissionAttempted,
      resetCheckoutForm,
      getCheckoutPayload,
    } = useCheckout()
    const { activeOrder, hasActiveOrder, createOrder } = useOrderTracking()

    addItem(products[0], 2)

    checkoutForm.fullName = '  Alex Rivera '
    checkoutForm.street = ' 10 Lake View Road '
    checkoutForm.city = ' Seattle '
    checkoutForm.postcode = ' 98101 '

    markSubmissionAttempted()

    if (canSubmit.value && !isEmpty.value) {
      createOrder({
        items: cartItems.value.map((item) => ({ ...item })),
        checkoutDetails: getCheckoutPayload(),
      })
      clearCart()
      resetCheckoutForm()
    }

    expect(hasActiveOrder.value).toBe(true)
    expect(activeOrder.value).toBeTruthy()
    expect(activeOrder.value.checkoutDetails).toEqual({
      fullName: 'Alex Rivera',
      street: '10 Lake View Road',
      city: 'Seattle',
      postcode: '98101',
    })
    expect(activeOrder.value.items).toHaveLength(1)
    expect(activeOrder.value.items[0].productId).toBe(products[0].id)
    expect(activeOrder.value.items[0].quantity).toBe(2)

    expect(isEmpty.value).toBe(true)
    expect(checkoutForm.fullName).toBe('')
    expect(checkoutForm.street).toBe('')
    expect(checkoutForm.city).toBe('')
    expect(checkoutForm.postcode).toBe('')
  })

  it('does not create an order when checkout data is invalid', () => {
    const { addItem, cartItems, isEmpty } = useCart()
    const { canSubmit, markSubmissionAttempted, getCheckoutPayload } = useCheckout()
    const { hasActiveOrder, createOrder } = useOrderTracking()

    addItem(products[1], 1)
    markSubmissionAttempted()

    if (canSubmit.value && !isEmpty.value) {
      createOrder({
        items: cartItems.value.map((item) => ({ ...item })),
        checkoutDetails: getCheckoutPayload(),
      })
    }

    expect(hasActiveOrder.value).toBe(false)
  })
})
