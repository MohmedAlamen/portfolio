<script setup>
import { useI18n } from '@/i18n'
import { langColor as color } from '@/utils/langColors'
defineProps({ r: { type: Object, required: true }, star: Boolean })
const { t, lang } = useI18n()

function ago(d) {
  if (!d) return ''
  const days = Math.round((new Date(d) - Date.now()) / 864e5)
  const rtf = new Intl.RelativeTimeFormat(lang.value, { numeric: 'auto' })
  if (Math.abs(days) < 30) return rtf.format(days, 'day')
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), 'month')
  return rtf.format(Math.round(days / 365), 'year')
}
</script>

<template>
  <article class="proj" :class="{star}">
      <span class="badge-top" v-if="star">{{ t.top }}</span>
      <div class="d-flex align-items-start gap-2 mb-2"><i class="bi bi-folder2-open fs-4" style="color:var(--gold)"></i><h5 class="mb-0" style="direction:ltr">{{ r.name }}</h5></div>
      <p>{{ r.description || t.noDesc }}</p>
      <div class="mb-2"><span class="tag" v-for="x in (r.topics||[]).slice(0,4)" :key="x">{{ x }}</span></div>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span class="lang" v-if="r.language" :style="{'--dot': color(r.language)}">{{ r.language }}</span><span v-else></span>
        <span class="meta"><span :title="t.updated"><i class="bi bi-clock"></i> {{ ago(r.pushed_at) }}</span><span><i class="bi bi-star"></i> {{ r.stargazers_count }}</span><span><i class="bi bi-diagram-2"></i> {{ r.forks_count }}</span></span>
      </div>
      <div class="d-flex gap-2">
        <a :href="r.html_url" target="_blank" rel="noopener" class="btn btn-ghost btn-sm flex-fill py-2"><i class="bi bi-github me-1"></i>{{ t.code }}</a>
        <a v-if="r.homepage" :href="r.homepage" target="_blank" rel="noopener" class="btn btn-main btn-sm flex-fill py-2">{{ t.live }}</a>
      </div></article>
</template>

<style>
.proj{background:var(--card);border:1px solid var(--rule);border-radius:4px;padding:1.4rem;height:100%;display:flex;flex-direction:column;position:relative;transition:border-color .2s}
.proj:hover{border-color:var(--primary)}
.proj.star{border-top:3px solid var(--primary)}
.proj h5{font-weight:700;word-break:break-word}
.proj p{color:var(--mute);flex:1;font-size:.95rem}
.badge-top{position:absolute;top:12px;inset-inline-end:12px;background:var(--primary);color:var(--paper);font-size:.72rem;font-weight:500;border-radius:3px;padding:1px 8px}
.lang{display:inline-flex;align-items:center;gap:6px;font-size:.85rem;color:var(--mute);direction:ltr}
.lang::before{content:"";width:10px;height:10px;border-radius:50%;background:var(--dot,#888)}
.tag{font-size:.72rem;border:1px solid var(--rule);color:var(--accent);border-radius:3px;padding:1px 7px;margin-inline-end:4px;margin-bottom:4px;direction:ltr;display:inline-block}
.meta{color:var(--mute);font-size:.82rem;display:flex;gap:12px}
</style>
