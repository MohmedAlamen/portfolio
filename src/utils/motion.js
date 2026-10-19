export const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
export const canObserve = typeof IntersectionObserver !== 'undefined'
