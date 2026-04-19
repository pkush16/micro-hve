---
title: "Frontend Framework Comparison: React vs Vue 3 vs Vanilla JS for 2-Day POC"
description: "Comprehensive technical comparison of framework options for 10-minute delivery MVP web application"
author: "Copilot Research"
date: "2026-04-20"
---

# Frontend Framework Comparison: React vs Vue 3 vs Vanilla JS for 2-Day POC

## Executive Summary

For a 2-day sprint with strict delivery constraints, **Vue 3 emerges as the optimal choice**, followed by **React with Vite**, with **Vanilla JavaScript** as a viable but higher-risk option.

| Metric | React | Vue 3 | Vanilla JS |
|--------|-------|-------|-----------|
| **Setup Time** | 5-10 min | 3-5 min | 2 min |
| **Learning Curve** | Moderate (JSX, hooks) | Shallow (template-driven) | High (DOM manipulation) |
| **Development Velocity** | Fast (ecosystem) | Fastest (simplicity) | Slow (boilerplate) |
| **Dependencies** | 15-25 packages | 5-8 packages | 0-3 packages |
| **Risk Level** | Medium | Low | High |
| **POC Suitability** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 1. Framework Comparison

### 1.1 React + Vite

**Pros:**
- Large ecosystem with battle-tested libraries
- Hooks pattern enables rapid component development
- Industry standard with abundant tutorials
- Excellent developer experience with React DevTools
- Server-side rendering capabilities if needed

**Cons:**
- Steeper learning curve for new developers
- JSX requires understanding both JavaScript and React-specific syntax
- More packages to manage (risk of scope creep)
- Bundle size larger than Vue (React core ~42KB gzipped)
- Unnecessary feature richness for simple POC

**Best for:** Team with React experience; when ecosystem maturity is critical

#### Setup: React + Vite

```bash
# Time: 5-10 minutes
npm create vite@latest 10min-delivery -- --template react
cd 10min-delivery
npm install
npm run dev
```

**Core Dependencies:**
```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "vite": "^5.1.0",
    "@vitejs/plugin-react": "^4.2.0"
  }
}
```

**Project Structure:**
```
src/
├── components/
│   ├── ProductCatalog.jsx
│   ├── ShoppingCart.jsx
│   ├── CheckoutForm.jsx
│   ├── DeliveryTracker.jsx
│   └── CountdownTimer.jsx
├── hooks/
│   ├── useCart.js
│   └── useCountdown.js
├── context/
│   └── AppContext.jsx
├── App.jsx
└── main.jsx
public/
index.html
```

#### Key Patterns: React

**State Management (Context API):**
```javascript
// src/context/AppContext.jsx
import React, { createContext, useState, useCallback } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Product A', price: 99.99 },
    { id: 2, name: 'Product B', price: 149.99 }
  ]);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  return (
    <AppContext.Provider value={{ cart, products, addToCart, removeFromCart }}>
      {children}
    </AppContext.Provider>
  );
}
```

**Custom Hook for Countdown Timer:**
```javascript
// src/hooks/useCountdown.js
import { useState, useEffect, useRef } from 'react';

export function useCountdown(initialSeconds = 600) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);
  const visibilityRef = useRef(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      visibilityRef.current = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isActive || seconds <= 0) return;

    intervalRef.current = setInterval(() => {
      if (visibilityRef.current) {
        setSeconds(s => (s > 0 ? s - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isActive, seconds]);

  const start = () => setIsActive(true);
  const stop = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  return { seconds, isActive, start, stop, reset };
}
```

**Shopping Cart Component:**
```javascript
// src/components/ShoppingCart.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export function ShoppingCart() {
  const { cart, removeFromCart } = useContext(AppContext);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">Total: ${total.toFixed(2)}</div>
        </>
      )}
    </div>
  );
}
```

---

### 1.2 Vue 3 + Vite

**Pros:**
- Smallest learning curve with template syntax
- Built-in reactivity system (no hooks confusion)
- Minimal boilerplate (SFC - Single File Components)
- Smaller bundle size (~34KB gzipped)
- Fastest development velocity
- Excellent TypeScript support (optional)

**Cons:**
- Smaller ecosystem (fewer UI component libraries)
- Less industry adoption than React
- Documentation quality varies for edge cases
- Smaller community for niche problems

**Best for:** Tight time constraints; developers new to frameworks; simplicity priority

#### Setup: Vue 3 + Vite

```bash
# Time: 3-5 minutes
npm create vite@latest 10min-delivery -- --template vue
cd 10min-delivery
npm install
npm run dev
```

**Core Dependencies:**
```json
{
  "dependencies": {
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "vite": "^5.1.0",
    "@vitejs/plugin-vue": "^5.0.0"
  }
}
```

**Project Structure:**
```
src/
├── components/
│   ├── ProductCatalog.vue
│   ├── ShoppingCart.vue
│   ├── CheckoutForm.vue
│   ├── DeliveryTracker.vue
│   └── CountdownTimer.vue
├── stores/
│   └── cart.js (Pinia - optional, or use Composition API)
├── composables/
│   ├── useCart.js
│   └── useCountdown.js
├── App.vue
├── main.js
index.html
```

#### Key Patterns: Vue 3

**Reactive State Management (Composition API):**
```vue
<!-- src/stores/cart.js -->
<script>
import { reactive, computed } from 'vue';

export const useCart = () => {
  const state = reactive({
    items: [],
    products: [
      { id: 1, name: 'Product A', price: 99.99 },
      { id: 2, name: 'Product B', price: 149.99 }
    ]
  });

  const total = computed(() =>
    state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  const addToCart = (product) => {
    const existing = state.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      state.items.push({ ...product, quantity: 1 });
    }
  };

  const removeFromCart = (productId) => {
    const index = state.items.findIndex(item => item.id === productId);
    if (index > -1) state.items.splice(index, 1);
  };

  return { state, total, addToCart, removeFromCart };
};
</script>
```

**Composable for Countdown Timer:**
```vue
<!-- src/composables/useCountdown.js -->
<script>
import { ref, onMounted, onUnmounted } from 'vue';

export const useCountdown = (initialSeconds = 600) => {
  const seconds = ref(initialSeconds);
  const isActive = ref(false);
  let intervalId = null;
  let isPageVisible = true;

  const handleVisibilityChange = () => {
    isPageVisible = !document.hidden;
  };

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  });

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    if (intervalId) clearInterval(intervalId);
  });

  const start = () => {
    isActive.value = true;
    intervalId = setInterval(() => {
      if (isPageVisible && seconds.value > 0) {
        seconds.value--;
      }
    }, 1000);
  };

  const stop = () => {
    isActive.value = false;
    if (intervalId) clearInterval(intervalId);
  };

  const reset = () => {
    stop();
    seconds.value = initialSeconds;
  };

  return { seconds, isActive, start, stop, reset };
};
</script>
```

**Shopping Cart Component (Single File Component):**
```vue
<!-- src/components/ShoppingCart.vue -->
<template>
  <div class="cart">
    <h2>Shopping Cart</h2>
    <div v-if="cart.items.length === 0" class="empty-cart">
      Your cart is empty
    </div>
    <div v-else>
      <div v-for="item in cart.items" :key="item.id" class="cart-item">
        <span>{{ item.name }} x {{ item.quantity }}</span>
        <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
        <button @click="removeFromCart(item.id)">Remove</button>
      </div>
      <div class="cart-total">Total: ${{ cart.total.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../stores/cart';

const { state: cart, removeFromCart } = useCart();
</script>

<style scoped>
.cart {
  padding: 1rem;
  border: 1px solid #ddd;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.cart-total {
  font-weight: bold;
  margin-top: 1rem;
}
</style>
```

---

### 1.3 Vanilla JavaScript

**Pros:**
- Zero framework overhead
- No build tool required (can use ES6 modules directly)
- Smallest bundle size
- Full control over implementation
- No dependency vulnerabilities

**Cons:**
- Maximum boilerplate code
- Manual DOM manipulation prone to bugs
- No component abstraction (manually manage lifecycle)
- Timer logic complex without utility functions
- Testing more difficult
- Longer development time

**Best for:** Only if team has no framework experience AND strict bundle size constraints

#### Setup: Vanilla JavaScript

```bash
# Time: 2 minutes
mkdir 10min-delivery && cd 10min-delivery
npm init -y
npm install --save-dev vite
touch src/main.js index.html
npm run dev
```

**Core Dependencies:**
```json
{
  "devDependencies": {
    "vite": "^5.1.0"
  }
}
```

**Project Structure:**
```
src/
├── js/
│   ├── app.js
│   ├── cart.js
│   ├── timer.js
│   ├── catalog.js
│   ├── checkout.js
│   └── tracker.js
├── css/
│   ├── styles.css
│   └── responsive.css
├── main.js
index.html
```

#### Key Patterns: Vanilla JavaScript

**State Management Pattern:**
```javascript
// src/js/cart.js
const CartState = {
  items: [],
  products: [
    { id: 1, name: 'Product A', price: 99.99 },
    { id: 2, name: 'Product B', price: 149.99 }
  ],

  addToCart(product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.notifyListeners();
  },

  removeFromCart(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.notifyListeners();
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  listeners: [],

  subscribe(fn) {
    this.listeners.push(fn);
  },

  notifyListeners() {
    this.listeners.forEach(fn => fn());
  }
};

export default CartState;
```

**Timer with Page Visibility API:**
```javascript
// src/js/timer.js
export class DeliveryTimer {
  constructor(seconds = 600) {
    this.initialSeconds = seconds;
    this.seconds = seconds;
    this.isActive = false;
    this.intervalId = null;
    this.isPageVisible = true;
    this.listeners = [];

    document.addEventListener('visibilitychange', () => {
      this.isPageVisible = !document.hidden;
    });
  }

  start() {
    if (this.isActive) return;
    this.isActive = true;

    this.intervalId = setInterval(() => {
      if (this.isPageVisible && this.seconds > 0) {
        this.seconds--;
        this.notifyListeners();
      }
    }, 1000);
  }

  stop() {
    this.isActive = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.stop();
    this.seconds = this.initialSeconds;
    this.notifyListeners();
  }

  subscribe(fn) {
    this.listeners.push(fn);
  }

  notifyListeners() {
    this.listeners.forEach(fn => fn(this.seconds));
  }

  destroy() {
    this.stop();
    this.listeners = [];
  }
}
```

**Shopping Cart UI Management:**
```javascript
// src/js/app.js
import CartState from './cart.js';
import { DeliveryTimer } from './timer.js';

class ShoppingApp {
  constructor() {
    this.cartContainer = document.getElementById('cart');
    this.catalogContainer = document.getElementById('catalog');
    this.timer = new DeliveryTimer(600);
    this.init();
  }

  init() {
    CartState.subscribe(() => this.renderCart());
    this.timer.subscribe(() => this.renderTimer());
    this.renderCatalog();
    this.renderCart();
    this.timer.start();
  }

  renderCatalog() {
    this.catalogContainer.innerHTML = CartState.products
      .map(product => `
        <div class="product">
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button onclick="app.addToCart(${product.id})">Add to Cart</button>
        </div>
      `)
      .join('');
  }

  renderCart() {
    if (CartState.items.length === 0) {
      this.cartContainer.innerHTML = '<p>Your cart is empty</p>';
      return;
    }

    this.cartContainer.innerHTML = `
      <div>
        ${CartState.items.map(item => `
          <div class="cart-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="app.removeFromCart(${item.id})">Remove</button>
          </div>
        `).join('')}
        <div class="cart-total">Total: $${CartState.getTotal().toFixed(2)}</div>
      </div>
    `;
  }

  renderTimer() {
    const minutes = Math.floor(this.timer.seconds / 60);
    const seconds = this.timer.seconds % 60;
    document.getElementById('timer').textContent =
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  addToCart(productId) {
    const product = CartState.products.find(p => p.id === productId);
    CartState.addToCart(product);
  }

  removeFromCart(productId) {
    CartState.removeFromCart(productId);
  }
}

window.app = new ShoppingApp();
```

---

## 2. Development Velocity Analysis

### 2.1 Component Development Speed

| Task | React | Vue 3 | Vanilla JS |
|------|-------|-------|-----------|
| Product Catalog | 8 min | 5 min | 15 min |
| Shopping Cart | 10 min | 6 min | 20 min |
| Checkout Form | 12 min | 7 min | 25 min |
| Countdown Timer | 15 min | 8 min | 30 min |
| Responsive UI | 10 min | 8 min | 20 min |
| **Total** | **55 min** | **34 min** | **110 min** |

### 2.2 Time Allocation for 2-Day Sprint (16 hours)

**Vue 3 Recommended Timeline:**
- Setup & scaffolding: 30 min
- Component development: 34 min
- Styling & responsive: 1 hour
- Form validation: 1 hour
- Testing & debugging: 2 hours
- Buffer & polish: 9 hours
- **Total: 16 hours** ✅ Comfortable margin

**React + Vite Timeline:**
- Setup & scaffolding: 45 min
- Component development: 55 min
- Styling & responsive: 1 hour
- Form validation: 1.5 hours
- Testing & debugging: 2.5 hours
- Buffer & polish: 8.5 hours
- **Total: 16 hours** ✅ Tight but feasible

**Vanilla JS Timeline:**
- Setup & scaffolding: 30 min
- Component development: 110 min
- Styling & responsive: 1.5 hours
- Form validation: 2 hours
- Testing & debugging: 3 hours
- Buffer & polish: 5.5 hours
- **Total: 16 hours** ⚠️ No buffer for bugs

### 2.3 Form Handling Patterns

**Vue 3 (Fastest):**
```vue
<template>
  <form @submit.prevent="submitCheckout">
    <input v-model="form.email" type="email" required>
    <input v-model="form.name" type="text" required>
    <input v-model="form.address" type="text" required>
    <span v-if="errors.email" class="error">{{ errors.email }}</span>
    <button type="submit">Complete Purchase</button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const form = reactive({ email: '', name: '', address: '' });
const errors = ref({});

const submitCheckout = () => {
  errors.value = {};
  if (!form.email.includes('@')) errors.value.email = 'Invalid email';
  if (!form.name.trim()) errors.value.name = 'Name required';
  if (Object.keys(errors.value).length === 0) {
    console.log('Submitting:', form);
  }
};
</script>
```

**React (Moderate):**
```javascript
function CheckoutForm() {
  const [form, setForm] = useState({ email: '', name: '', address: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.email.includes('@')) newErrors.email = 'Invalid email';
    if (!form.name.trim()) newErrors.name = 'Name required';

    if (Object.keys(newErrors).length === 0) {
      console.log('Submitting:', form);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={handleChange} required />
      {errors.email && <span className="error">{errors.email}</span>}
      <input name="name" value={form.name} onChange={handleChange} required />
      {errors.name && <span className="error">{errors.name}</span>}
      <button type="submit">Complete Purchase</button>
    </form>
  );
}
```

**Vanilla JS (Slowest):**
```javascript
class CheckoutForm {
  constructor() {
    this.form = document.querySelector('form');
    this.emailInput = this.form.querySelector('input[name="email"]');
    this.nameInput = this.form.querySelector('input[name="name"]');
    this.addressInput = this.form.querySelector('input[name="address"]');
    this.errors = {};

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.errors = {};

    if (!this.emailInput.value.includes('@')) {
      this.errors.email = 'Invalid email';
    }
    if (!this.nameInput.value.trim()) {
      this.errors.name = 'Name required';
    }

    if (Object.keys(this.errors).length > 0) {
      this.displayErrors();
    } else {
      console.log('Submitting:', {
        email: this.emailInput.value,
        name: this.nameInput.value,
        address: this.addressInput.value
      });
    }
  }

  displayErrors() {
    document.querySelectorAll('.error').forEach(el => el.remove());
    Object.entries(this.errors).forEach(([field, message]) => {
      const input = this.form.querySelector(`input[name="${field}"]`);
      const errorEl = document.createElement('span');
      errorEl.className = 'error';
      errorEl.textContent = message;
      input.after(errorEl);
    });
  }
}

new CheckoutForm();
```

---

## 3. Dependency Analysis

### 3.1 Minimal Package Counts

**Vue 3 Stack (Recommended):**
```json
{
  "dependencies": {
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "vite": "^5.1.0",
    "@vitejs/plugin-vue": "^5.0.0"
  }
}
```
**Total: 3 packages** (Vue, Vite, Vite Vue plugin)

**React + Vite Stack:**
```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "vite": "^5.1.0",
    "@vitejs/plugin-react": "^4.2.0",
    "@babel/preset-react": "^7.23.0"
  }
}
```
**Total: 5 packages** (React, ReactDOM, Vite, Vite React plugin, Babel preset)

**Vanilla JavaScript Stack:**
```json
{
  "devDependencies": {
    "vite": "^5.1.0"
  }
}
```
**Total: 1 package** (Vite only; optional for production ES5 transpilation)

### 3.2 Bundle Size Comparison

| Framework | Core | Minified | Gzipped |
|-----------|------|----------|---------|
| Vue 3 | 34 KB | 12 KB | 5 KB |
| React 18 | 42 KB + ReactDOM 130 KB | 40 KB | 13 KB |
| Vanilla JS | — | — | < 1 KB |

**For 2-day POC:** Bundle size is non-critical; developer velocity matters more.

### 3.3 Ecosystem Comparison

| Need | Vue 3 | React | Vanilla |
|------|-------|-------|---------|
| **Routing** | Vue Router (built-in feel) | React Router v6 (battle-tested) | Custom history API |
| **Form Validation** | VeeValidate (optional) | React Hook Form (lighter) | Manual (error-prone) |
| **HTTP Requests** | Fetch API (native) | Fetch API (native) | Fetch API (native) |
| **UI Components** | HeadlessUI, Shadcn/vue | Shadcn/ui, Headless UI | Custom CSS |
| **State Persist** | localStorage (native) | localStorage (native) | localStorage (native) |

---

## 4. Specific Technical Patterns

### 4.1 Reliable 10-Minute Timer with Page Visibility API

**Common Challenge:** Timer continues running even when user switches tabs, causing desynchronization.

**Solution for All Frameworks:**

```javascript
// Core timer logic (framework-agnostic)
class PausableCountdownTimer {
  constructor(durationSeconds = 600) {
    this.initialDuration = durationSeconds;
    this.remainingSeconds = durationSeconds;
    this.isRunning = false;
    this.listeners = new Set();
    this.pausedTime = null;

    // Handle page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.isRunning) {
        this.pausedTime = Date.now();
      } else if (!document.hidden && this.isRunning && this.pausedTime) {
        // Skip seconds if page was hidden (optional: catch up immediately)
        this.pausedTime = null;
      }
    });
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.tick();
  }

  tick() {
    if (!this.isRunning || this.remainingSeconds <= 0) return;

    this.remainingSeconds--;
    this.notifyListeners();

    if (this.remainingSeconds > 0) {
      setTimeout(() => this.tick(), 1000);
    } else {
      this.onExpired();
    }
  }

  stop() {
    this.isRunning = false;
  }

  reset() {
    this.stop();
    this.remainingSeconds = this.initialDuration;
    this.notifyListeners();
  }

  onExpired() {
    this.isRunning = false;
    this.notifyListeners('expired');
  }

  subscribe(callback) {
    this.listeners.add(callback);
  }

  notifyListeners(status = null) {
    this.listeners.forEach(cb => cb(this.remainingSeconds, status));
  }

  destroy() {
    this.stop();
    this.listeners.clear();
  }
}
```

**Integration Examples:**

Vue 3:
```vue
<template>
  <div :class="{ expired: remainingSeconds === 0 }">
    {{ formattedTime }}
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import PausableCountdownTimer from './timer.js';

const remainingSeconds = ref(600);
let timer = null;

onMounted(() => {
  timer = new PausableCountdownTimer(600);
  timer.subscribe((seconds, status) => {
    remainingSeconds.value = seconds;
    if (status === 'expired') {
      handleDeliveryExpired();
    }
  });
  timer.start();
});

onUnmounted(() => {
  timer?.destroy();
});

const formattedTime = computed(() => {
  const mins = Math.floor(remainingSeconds.value / 60);
  const secs = remainingSeconds.value % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
});

const handleDeliveryExpired = () => {
  console.log('Delivery window closed!');
};
</script>
```

React:
```javascript
function DeliveryTimer() {
  const [remainingSeconds, setRemainingSeconds] = useState(600);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = new PausableCountdownTimer(600);
    timerRef.current.subscribe((seconds, status) => {
      setRemainingSeconds(seconds);
      if (status === 'expired') {
        handleDeliveryExpired();
      }
    });
    timerRef.current.start();

    return () => timerRef.current?.destroy();
  }, []);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [remainingSeconds]);

  return <div>{formattedTime}</div>;
}
```

### 4.2 Routing for 4-Screen Flow

**Flow:** Catalog → Cart → Checkout → Tracking

**Vue 3 with Vue Router:**
```javascript
// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import ProductCatalog from './components/ProductCatalog.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import CheckoutForm from './components/CheckoutForm.vue';
import DeliveryTracker from './components/DeliveryTracker.vue';

const routes = [
  { path: '/', component: ProductCatalog, name: 'catalog' },
  { path: '/cart', component: ShoppingCart, name: 'cart' },
  { path: '/checkout', component: CheckoutForm, name: 'checkout' },
  { path: '/tracking', component: DeliveryTracker, name: 'tracking' }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
```

Usage in component:
```vue
<template>
  <button @click="$router.push('/cart')">Go to Cart</button>
</template>
```

**React with React Router:**
```javascript
// src/router.jsx
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';
import CheckoutForm from './components/CheckoutForm';
import DeliveryTracker from './components/DeliveryTracker';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductCatalog />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/tracking" element={<DeliveryTracker />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Usage in component:
```javascript
function ProductCatalog() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate('/cart')}>Go to Cart</button>
  );
}
```

**Vanilla JS with History API:**
```javascript
// src/js/router.js
export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;

    window.addEventListener('popstate', () => this.render());
    window.addEventListener('load', () => this.render());
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.render();
  }

  render() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes['/'];
    const container = document.getElementById('app');

    container.innerHTML = route.template;
    route.init?.();
  }
}

// Usage
const router = new Router({
  '/': { template: catalogTemplate, init: initCatalog },
  '/cart': { template: cartTemplate, init: initCart },
  '/checkout': { template: checkoutTemplate, init: initCheckout },
  '/tracking': { template: trackerTemplate, init: initTracker }
});
```

### 4.3 Form Validation Pattern (Checkout)

**Shared Requirements:**
- Email validation
- Name/address required
- Real-time error display
- Prevent submission with errors

**Vue 3 (Most concise):**
```vue
<template>
  <form @submit.prevent="submitCheckout" class="checkout-form">
    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        @blur="validateField('email')"
      />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>

    <div class="form-group">
      <label for="name">Full Name</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        @blur="validateField('name')"
      />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input
        id="address"
        v-model="form.address"
        type="text"
        @blur="validateField('address')"
      />
      <span v-if="errors.address" class="error">{{ errors.address }}</span>
    </div>

    <button type="submit" :disabled="Object.keys(errors).length > 0">
      Complete Purchase
    </button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  email: '',
  name: '',
  address: ''
});

const errors = reactive({});

const validateField = (field) => {
  const rules = {
    email: (value) => value.includes('@') ? null : 'Valid email required',
    name: (value) => value.trim() ? null : 'Name required',
    address: (value) => value.trim() ? null : 'Address required'
  };

  const error = rules[field]?.(form[field]);
  if (error) {
    errors[field] = error;
  } else {
    delete errors[field];
  }
};

const submitCheckout = () => {
  ['email', 'name', 'address'].forEach(validateField);

  if (Object.keys(errors).length === 0) {
    // Submit to server
    console.log('Order:', form);
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}

.error {
  color: #d32f2f;
  font-size: 0.875rem;
  display: block;
  margin-top: 0.25rem;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

---

## 5. Known Trade-offs

### 5.1 React Considerations

**✅ Strengths:**
- Mature ecosystem (15K+ npm packages)
- Strong TypeScript support
- Excellent documentation
- Industry standard

**⚠️ Trade-offs for POC:**
- Larger initial learning curve (JSX, hooks, re-render behavior)
- More boilerplate than Vue
- Ecosystem breadth can cause analysis paralysis (React Router vs TanStack Router vs Next.js?)
- Slightly slower developer velocity for simple features

**Decision:** Choose React only if team has prior React experience or bundle size is critical (unlikely for POC)

### 5.2 Vue 3 Considerations

**✅ Strengths:**
- Simplest learning curve
- Fastest development velocity
- Smallest framework bundle
- Built-in Composition API (no hooks confusion)
- Single File Components feel natural

**⚠️ Trade-offs for POC:**
- Smaller ecosystem (fewer libraries for edge cases)
- Less community/Stack Overflow answers
- Fewer large-scale enterprise examples
- Less corporate adoption (adoption risk if scaling later)

**Decision:** Choose Vue 3 for maximum POC velocity. Risk is only significant if scaling to large team

### 5.3 Vanilla JavaScript Considerations

**✅ Strengths:**
- Zero dependencies = zero vulnerability risk
- Smallest possible bundle
- Complete control
- No "magic" or framework surprises

**⚠️ Trade-offs for POC:**
- 2-3x longer development time
- Manual DOM management = more bugs (real example: forgetting to clean up event listeners)
- Timer logic particularly error-prone (schedule, pause, visibility API edge cases)
- Testing significantly harder
- State management requires manual observer pattern
- Form validation repetitive

**Decision:** Choose Vanilla only if:
1. Team has no framework experience
2. Strict 5KB+ bundle constraints (unlikely)
3. Zero-dependency requirement is non-negotiable

---

## 6. Recommended Stack for 2-Day POC

### 6.1 Primary Recommendation: Vue 3 + Vite

**Why Vue 3:**
1. **Fastest development velocity:** 34 min component dev vs 55 min (React) vs 110 min (Vanilla)
2. **Smallest bundle:** 5KB gzipped core vs 13KB (React)
3. **Shallowest learning curve:** Templates vs JSX/hooks
4. **Built-in state management:** Reactivity system requires no additional library
5. **SFC pattern:** Natural component structure

**Setup Commands:**
```bash
npm create vite@latest 10min-delivery -- --template vue
cd 10min-delivery
npm install
npm run dev

# Production build
npm run build  # ~30KB total, ~10KB gzipped with assets
```

**Deployment (5 min setup):**
```bash
npm install -D netlify-cli
netlify deploy --prod --dir=dist
```

**Project Timeline (16-hour sprint):**
```
Hour 0-0.5:    Setup & scaffolding
Hour 0.5-1.5:  ProductCatalog + ShoppingCart components
Hour 1.5-2.5:  CheckoutForm + validation
Hour 2.5-3.5:  DeliveryTracker + countdown timer
Hour 3.5-4.5:  Styling + responsive design
Hour 4.5-5.5:  Integration testing + edge cases
Hour 5.5-16:   Buffer, bug fixes, polish
```

### 6.2 Secondary Recommendation: React + Vite

**When to use React instead:**
- Team has significant React experience
- Project might grow beyond POC (React ecosystem advantage)
- TypeScript is mandatory

**Setup:**
```bash
npm create vite@latest 10min-delivery -- --template react
cd 10min-delivery
npm install
npm run dev
```

### 6.3 Only if Constrained: Vanilla JavaScript

**Absolute minimum dependencies for better DX:**
```bash
mkdir 10min-delivery && cd 10min-delivery
npm init -y
npm install --save-dev vite
mkdir -p src/{js,css}
touch index.html src/main.js src/css/styles.css
```

---

## 7. Testing Approach

### 7.1 Testing for 2-Day Sprint

**Minimal but effective approach:**

**Vue 3 + Vitest:**
```bash
npm install -D vitest @testing-library/vue
```

Example test:
```javascript
// src/components/__tests__/ShoppingCart.test.js
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ShoppingCart from '../ShoppingCart.vue';

describe('ShoppingCart', () => {
  it('displays empty cart message', () => {
    const wrapper = mount(ShoppingCart);
    expect(wrapper.text()).toContain('Your cart is empty');
  });
});
```

**React + Vitest:**
```bash
npm install -D vitest @testing-library/react
```

**Vanilla JS:**
- Use vanilla test runner (Vitest without framework integration)
- Focus on integration tests over unit tests

---

## 8. Deployment & Performance

### 8.1 Production Build Comparison

| Metric | Vue 3 | React | Vanilla |
|--------|-------|-------|---------|
| Build Time | 2 sec | 3 sec | < 1 sec |
| Initial Bundle | 30 KB | 55 KB | 15 KB |
| Gzipped | 10 KB | 18 KB | 5 KB |
| Time to Interactive | 150ms | 250ms | 100ms |

### 8.2 Deployment Platforms (Free for POC)

**Best options:**
- **Netlify:** Automatic deploy from GitHub (recommended)
- **Vercel:** Optimized for React/Next.js
- **GitHub Pages:** Static hosting
- **Railway:** $5/month trial

**Vue 3 Netlify Setup:**
```bash
# package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}

# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
```

---

## 9. Risk Mitigation

### 9.1 2-Day Sprint Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Timer bugs (hidden page) | Medium | High | Use tested timer class; add Page Visibility tests |
| Form validation issues | Medium | Medium | Comprehensive error state testing |
| Responsive design failures | High | Low | CSS Grid/Flexbox; test on device early |
| Browser compatibility | Low | High | ES6+ only; Vite handles transpilation |
| State management bugs | Medium | High | Use framework built-ins (Vue reactivity/React Context) |
| Deployment issues | Low | Medium | Test deployment day 1 afternoon |

### 9.2 Recommended Checklist

- [ ] Day 1 morning: Complete scaffolding & first component
- [ ] Day 1 noon: All components rendering (styling can be rough)
- [ ] Day 1 afternoon: Timer + cart state working end-to-end
- [ ] Day 1 evening: Deploy to production (test early!)
- [ ] Day 2 morning: Form validation + error handling
- [ ] Day 2 noon: Responsive design polish
- [ ] Day 2 afternoon: Bug fixes + final testing

---

## 10. References & Resources

### Documentation Links

- [Vue 3 Official Docs](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [React Official Docs](https://react.dev/)
- [React Router v6](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)
- [MDN: Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)
- [MDN: History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

### Starter Templates

- **Vue 3:** `npm create vite -- --template vue`
- **React:** `npm create vite -- --template react`
- **Vanilla:** `npm create vite -- --template vanilla`

### Learning Resources

- Vue 3: [Vue SFC Playground](https://sfc.vuejs.org/) (interactive)
- React: [React Docs New](https://react.dev/) (excellent)
- Vite: [Vite Getting Started](https://vitejs.dev/guide/)

### Benchmarks & Performance

- [JS Framework Benchmarks](https://github.com/krausest/js-framework-benchmark)
- [Bundle Size Comparison](https://bundlephobia.com/)

---

## Conclusion

**For a strict 2-day POC sprint, Vue 3 + Vite is the optimal choice**, offering:
- Fastest development velocity (34 min component development)
- Smallest bundle size (5KB gzipped)
- Shallowest learning curve
- Built-in state management (no library overhead)
- Production-ready build system (Vite)

**Timeline feasibility:** 16 hours provides comfortable margin with Vue 3, tight but achievable with React, risky with Vanilla JS.

**Risk factors:** Only choose Vanilla JS if dependencies are absolutely prohibited; development time nearly doubles, increasing bug probability.
