import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import App from '../../App.vue'
import router from '../../router'
import { useCart } from '../../composables/useCart'
import { useCheckout } from '../../composables/useCheckout'
import { useOrderTracking } from '../../composables/useOrderTracking'

const flush = async () => {
  await router.isReady()
  await nextTick()
}

describe('route-level UI navigation integration', () => {
  beforeEach(async () => {
    const { clearCart } = useCart()
    const { resetCheckoutForm } = useCheckout()
    const { clearOrder } = useOrderTracking()

    clearCart()
    resetCheckoutForm()
    clearOrder()

    await router.push('/')
    await flush()
  })

  it('navigates across Catalog, Cart, Checkout, and Tracking routes from the app shell', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    await flush()
    expect(router.currentRoute.value.path).toBe('/')
    expect(wrapper.text()).toContain('Catalog')

    await router.push('/cart')
    await flush()
    expect(router.currentRoute.value.path).toBe('/cart')
    expect(wrapper.text()).toContain('Cart')

    await router.push('/checkout')
    await flush()
    expect(router.currentRoute.value.path).toBe('/checkout')
    expect(wrapper.text()).toContain('Checkout')

    await router.push('/tracking')
    await flush()
    expect(router.currentRoute.value.path).toBe('/tracking')
    expect(wrapper.text()).toContain('Tracking')

    wrapper.unmount()
  })
})
