<script setup>
import { useI18n } from '@/i18n'
import { useTyping } from '@/composables/useTyping'
import { me, ROLES } from '@/config/site'
import { ref, onMounted, onUnmounted } from 'vue'
import { prefersReducedMotion } from '@/utils/motion'
import ArchDiagram from '@/components/ui/ArchDiagram.vue'
const { t } = useI18n()
const typed = useTyping(ROLES)

// count-up for the facts row: one eased pass, starts after the entrance finishes
const p = ref(prefersReducedMotion() ? 1 : 0)
let raf
onMounted(() => {
  if (p.value === 1) return
  const start = performance.now() + 700
  const step = now => { const k = Math.min(Math.max((now - start) / 1400, 0), 1); p.value = 1 - (1 - k) ** 3; if (k < 1) raf = requestAnimationFrame(step) }
  raf = requestAnimationFrame(step)
})
onUnmounted(() => cancelAnimationFrame(raf))
const show = n => n.replace(/\d+/, d => Math.round(d * p.value))
</script>

<template>
  <header class="hero" id="home">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-7">
            <p class="role mb-3 rise" style="--d:0ms">&gt; {{ typed }}<span class="cur"></span></p>
            <h1 class="rise" style="--d:100ms">{{ t.name }}</h1>
            <p class="lead rise" style="--d:200ms">{{ t.headline }}</p>
            <p class="rise" style="color:var(--mute);max-width:34rem;--d:300ms">{{ t.bio }}</p>
            <div class="d-flex flex-wrap gap-3 mt-4 rise" style="--d:400ms">
              <a href="#projects" class="btn btn-main">{{ t.ctaWork }}</a>
              <a :href="'mailto:'+me.email" class="btn btn-ghost">{{ t.ctaHire }}</a>
              <a :href="'https://github.com/'+me.github" target="_blank" rel="noopener" class="btn btn-ghost"><i class="bi bi-github me-2"></i>GitHub</a>
            </div>
            <div class="facts rise" style="--d:500ms"><div v-for="s in t.stats" :key="s.l"><b>{{ show(s.n) }}</b><span>{{ s.l }}</span></div></div>
          </div>
          <div class="col-lg-5">
            <ArchDiagram />
          </div>
        </div>
      </div>
    </header>
</template>

<style>
.hero{min-height:100vh;display:flex;align-items:center;padding:110px 0 70px;border:0}
.hero h1{font-weight:700;font-size:clamp(2.6rem,6.4vw,5rem);line-height:1.1;letter-spacing:-.01em;margin:0 0 .6rem}
.hero .lead{font-size:clamp(1.15rem,2.2vw,1.6rem);font-weight:300;color:var(--ink);max-width:30rem}
.role{font-family:'IBM Plex Mono',monospace;color:var(--primary);direction:ltr;text-align:start;min-height:1.7em;font-size:.95rem}
html[dir=rtl] .role,html[dir=rtl] .proj h5{text-align:right}
.cur{display:inline-block;width:8px;height:1em;background:var(--sun);vertical-align:middle;margin-left:3px;animation:blink 1s steps(2) infinite}
@keyframes blink{50%{opacity:0}}
.facts{display:flex;margin-top:2.6rem;max-width:30rem}
.facts div{flex:1;padding-inline:1rem;border-inline-start:2px solid var(--sun)}
.facts b{display:block;font-size:1.6rem;line-height:1.2}.facts span{color:var(--mute);font-size:.85rem}
.facts b{font-variant-numeric:tabular-nums}
</style>
