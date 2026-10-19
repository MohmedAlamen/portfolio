<script setup>
import { useI18n } from '@/i18n'
const { t } = useI18n()
</script>

<template>
  <section id="services">
      <div class="container">
        <h2 class="title">{{ t.nav.services }}</h2>
        <p class="sub">{{ t.servicesSub }}</p>
        <div class="spec" v-for="s in t.services" :key="s.t">
          <h3>{{ s.t }}</h3><p>{{ s.d }}</p><ul><li v-for="x in s.l" :key="x">{{ x }}</li></ul>
        </div>
      </div>
    </section>
</template>

<style>
.spec{display:grid;grid-template-columns:minmax(150px,1fr) 2fr 1.4fr;gap:1.2rem;padding:1.4rem 0;border-top:1px solid var(--rule)}
.spec:last-child{border-bottom:1px solid var(--rule)}
.spec h3{font-size:1.15rem;font-weight:700;margin:0}.spec p{margin:0;color:var(--mute)}
.spec ul{list-style:none;margin:0;padding:0;font-size:.9rem}.spec li::before{content:"+ ";color:var(--primary);font-weight:700}
@media(max-width:767px){.spec{grid-template-columns:1fr;gap:.3rem}}
</style>
