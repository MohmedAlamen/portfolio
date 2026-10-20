<script setup>
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import { useJobMatch } from '@/composables/useJobMatch'
import { me } from '@/config/site'
const { t } = useI18n()
const { jd, result, run, clear } = useJobMatch()
const mailto = computed(() => {
  const r = result.value; if (!r) return '#'
  const body = `${t.value.match.covered}: ${r.matched.map(x => x.n).join(', ')}\n${t.value.match.score}: ${r.score}%`
  return `mailto:${me.email}?subject=${encodeURIComponent(t.value.match.subject)}&body=${encodeURIComponent(body)}`
})
</script>

<template>
  <section id="match">
    <div class="container">
      <h2 v-reveal class="title">{{ t.match.title }}</h2>
      <p v-reveal="{ delay: 80 }" class="sub">{{ t.match.sub }}</p>
      <div class="row g-4">
        <div class="col-lg-6">
          <label class="form-label" for="jd">{{ t.match.label }}</label>
          <textarea id="jd" v-model="jd" rows="9" maxlength="6000" class="form-control search" :placeholder="t.match.placeholder"></textarea>
          <div class="d-flex gap-2 mt-3 flex-wrap">
            <button class="btn btn-main" :disabled="!jd.trim()" @click="run">{{ t.match.run }}</button>
            <button class="btn btn-ghost" :disabled="!jd" @click="clear">{{ t.match.clear }}</button>
          </div>
          <p class="small mt-3" style="color:var(--mute)"><i class="bi bi-shield-check me-1"></i>{{ t.match.privacy }}</p>
        </div>
        <div class="col-lg-6">
          <div v-if="result" class="panel" aria-live="polite">
            <template v-if="result.found.length">
              <div class="d-flex align-items-baseline gap-3 mb-2">
                <b class="score">{{ result.score }}%</b>
                <span style="color:var(--mute)">{{ t.match.score }} — {{ t.match.of.replace('{n}', result.found.length) }}</span>
              </div>
              <div class="meter"><i :style="{ transform: `scaleX(${result.score / 100})` }"></i></div>
              <h3 class="h6 fw-bold mt-4">{{ t.match.covered }}</h3>
              <span class="mchip on" v-for="x in result.matched" :key="x.n">{{ x.n }}</span>
              <template v-if="result.gaps.length">
                <h3 class="h6 fw-bold mt-3">{{ t.match.gaps }}</h3>
                <span class="mchip" v-for="x in result.gaps" :key="x.n">{{ x.n }}</span>
              </template>
              <template v-if="result.related.length">
                <h3 class="h6 fw-bold mt-3">{{ t.match.repos }}</h3>
                <ul class="list-unstyled mb-0">
                  <li v-for="r in result.related" :key="r.id"><a :href="r.html_url" target="_blank" rel="noopener"><i class="bi bi-folder2-open me-2"></i>{{ r.name }}</a></li>
                </ul>
              </template>
              <a :href="mailto" class="btn btn-main mt-4">{{ t.match.cta }}</a>
            </template>
            <p v-else class="mb-0">{{ t.match.none }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.score{font-size:2.6rem;line-height:1;font-variant-numeric:tabular-nums}
.meter{height:6px;background:var(--rule);border-radius:3px;overflow:hidden}
.meter i{display:block;height:100%;background:var(--primary);transform-origin:left;animation:fill .8s var(--ease) both}
html[dir=rtl] .meter i{transform-origin:right}
@keyframes fill{from{transform:scaleX(0)}}
.mchip{display:inline-block;margin:0 0 .4rem .4rem;padding:.15rem .75rem;border:1px dashed var(--rule);border-radius:4px;font-size:.9rem;color:var(--mute);direction:ltr}
.mchip.on{border:1px solid var(--primary);background:var(--primary);color:var(--paper)}
</style>
