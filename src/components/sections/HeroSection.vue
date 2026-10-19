<script setup>
import { useI18n } from '@/i18n'
import { useTyping } from '@/composables/useTyping'
import { me, ROLES } from '@/config/site'
import ArchDiagram from '@/components/ui/ArchDiagram.vue'
const { t } = useI18n()
const typed = useTyping(ROLES)
</script>

<template>
  <header class="hero" id="home">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-7">
            <p class="role mb-3">&gt; {{ typed }}<span class="cur"></span></p>
            <h1>{{ t.name }}</h1>
            <p class="lead">{{ t.headline }}</p>
            <p style="color:var(--mute);max-width:34rem">{{ t.bio }}</p>
            <div class="d-flex flex-wrap gap-3 mt-4">
              <a href="#projects" class="btn btn-main">{{ t.ctaWork }}</a>
              <a :href="'mailto:'+me.email" class="btn btn-ghost">{{ t.ctaHire }}</a>
              <a :href="'https://github.com/'+me.github" target="_blank" rel="noopener" class="btn btn-ghost"><i class="bi bi-github me-2"></i>GitHub</a>
            </div>
            <div class="facts"><div v-for="s in t.stats" :key="s.l"><b>{{ s.n }}</b><span>{{ s.l }}</span></div></div>
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
</style>
