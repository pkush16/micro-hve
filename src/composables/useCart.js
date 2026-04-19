import { computed, ref } from 'vue'

const cartItems = ref([])

const findItemIndex = (productId) => cartItems.value.findIndex((item) => item.productId === productId)

const clampQuantity = (value, max) => {
  const parsedValue = Number.parseInt(value, 10)

  if (Number.isNaN(parsedValue) || parsedValue < 0) {
    return 0
  }

  return Math.min(parsedValue, max)
}

export const useCart = () => {
  const addItem = (product, quantity = 1) => {
    if (!product || typeof product.id !== 'string') {
      return
    }

    const requestedQuantity = clampQuantity(quantity, product.availableQty)

    if (requestedQuantity <= 0) {
      return
    }

    const itemIndex = findItemIndex(product.id)

    if (itemIndex === -1) {
      cartItems.value.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        availableQty: product.availableQty,
        quantity: requestedQuantity,
      })
      return
    }

    const nextQuantity = clampQuantity(
      cartItems.value[itemIndex].quantity + requestedQuantity,
      cartItems.value[itemIndex].availableQty,
    )

    cartItems.value[itemIndex] = {
      ...cartItems.value[itemIndex],
      quantity: nextQuantity,
    }
  }

  const updateItemQuantity = (productId, quantity) => {
    const itemIndex = findItemIndex(productId)

    if (itemIndex === -1) {
      return
    }

    const updatedQuantity = clampQuantity(quantity, cartItems.value[itemIndex].availableQty)

    if (updatedQuantity === 0) {
      cartItems.value.splice(itemIndex, 1)
      return
    }

    cartItems.value[itemIndex] = {
      ...cartItems.value[itemIndex],
      quantity: updatedQuantity,
    }
  }

  const removeItem = (productId) => {
    const itemIndex = findItemIndex(productId)

    if (itemIndex >= 0) {
      cartItems.value.splice(itemIndex, 1)
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const itemCount = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0),
  )

  const subtotal = computed(() =>
    cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0),
  )

  const isEmpty = computed(() => cartItems.value.length === 0)

  return {
    cartItems,
    itemCount,
    subtotal,
    isEmpty,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
  }
}
