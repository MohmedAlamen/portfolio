import { prefersReducedMotion, canObserve } from '@/utils/motion'

// v-reveal / v-reveal="{ delay: 120 }": fade + rise once when scrolled into view.
// Only opacity/transform animate. The classes are removed afterwards so hover transitions stay instant.
let io
const observer = () => io ??= new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue
    const el = e.target
    el.classList.add('is-visible')
    el.addEventListener('transitionend', ev => {
      if (ev.propertyName !== 'opacity') return
      el.classList.remove('reveal', 'is-visible'); el.style.removeProperty('--d')
    }, { once: true })
    io.unobserve(el)
  }
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' })

export default {
  mounted(el, { value }) {
    if (prefersReducedMotion() || !canObserve) return          // content simply stays visible
    if (value?.delay) el.style.setProperty('--d', `${value.delay}ms`)
    el.classList.add('reveal')
    observer().observe(el)
  },
  unmounted(el) { io?.unobserve(el) }
}
