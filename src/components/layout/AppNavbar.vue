<script setup>
import { useI18n } from '@/i18n'
const { t, toggleLang } = useI18n()
import { ref, onMounted, onUnmounted } from 'vue'
import { canObserve } from '@/utils/motion'
const links = ['about', 'services', 'skills', 'projects', 'match']
const scrolled = ref(false), active = ref(''), progress = ref(0)
let ticking = false, io
const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight
    scrolled.value = scrollY > 8
    progress.value = max > 0 ? Math.min(scrollY / max, 1) : 0
    ticking = false
  })
}
onMounted(() => {
  addEventListener('scroll', onScroll, { passive: true }); onScroll()
  if (!canObserve) return
  io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) active.value = e.target.id }), { rootMargin: '-45% 0px -50% 0px' })
  links.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
})
onUnmounted(() => { removeEventListener('scroll', onScroll); io?.disconnect() })
</script>

<template>
  <nav class="navbar navbar-expand-md fixed-top" :class="{ scrolled }">
      <div class="container">
        <a class="navbar-brand brand" href="#home">{{ t.name }}</a>
        <button class="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#nav" :aria-label="t.menu"><i class="bi bi-list fs-2"></i></button>
        <div class="collapse navbar-collapse" id="nav">
          <ul class="navbar-nav ms-auto align-items-md-center">
            <li class="nav-item" v-for="l in links" :key="l"><a class="nav-link" :class="{ active: active === l }" :href="'#'+l">{{ t.nav[l] }}</a></li>
            <li class="nav-item ms-md-2 mt-2 mt-md-0"><button class="langbtn" @click="toggleLang" :aria-label="t.switchLabel">{{ t.switchTo }}</button></li>
          </ul>
        </div>
      </div>
      <div class="scroll-progress" :style="{ transform: `scaleX(${progress})` }"></div>
  </nav>
</template>

<style>
.navbar{background:rgba(238,242,241,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--rule)}
.navbar .nav-link{color:var(--mute);font-weight:500}.navbar .nav-link:hover{color:var(--primary)}
.brand{font-weight:700;font-size:1.25rem;color:var(--ink)}
.langbtn{border:1px solid var(--ink);background:transparent;color:var(--ink);border-radius:4px;padding:.25rem .8rem;font-weight:500}
.langbtn:hover{background:var(--ink);color:var(--paper)}
.navbar{transition:box-shadow .3s,background-color .3s}
.navbar.scrolled{box-shadow:0 10px 24px -18px rgba(30,43,47,.5)}
.navbar .nav-link{position:relative}
.navbar .nav-link::after{content:"";position:absolute;inset-inline:.5rem;bottom:2px;height:2px;background:var(--primary);transform:scaleX(0);transition:transform .3s var(--ease)}
.navbar .nav-link.active{color:var(--ink)}
.navbar .nav-link.active::after,.navbar .nav-link:hover::after{transform:scaleX(1)}
.scroll-progress{position:absolute;inset-inline:0;bottom:-1px;height:2px;background:var(--sun);transform-origin:left;will-change:transform}
html[dir=rtl] .scroll-progress{transform-origin:right}
</style>
