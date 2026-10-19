<script setup>
import { useI18n } from '@/i18n'
const { t } = useI18n()
</script>

<template>
  <div class="arch" aria-hidden="true">
    <div v-for="(l, i) in t.layers" :key="l.k" class="node" :style="{ '--i': i }"><small>{{ l.k }}</small><b>{{ l.v }}</b></div>
  </div>
</template>

<style>
.arch{direction:ltr;position:relative;padding:28px 0 28px 44px;font-family:'IBM Plex Mono',monospace}
.arch::before{content:"";position:absolute;left:14px;top:40px;bottom:40px;width:2px;background:repeating-linear-gradient(var(--rule) 0 6px,transparent 6px 10px)}
.arch .node{position:relative;background:var(--card);border:1.5px solid var(--ink);padding:.9rem 1.2rem;margin-bottom:26px;animation:lit 1.1s ease-out both;animation-delay:calc(var(--i)*.55s)}
.arch .node:last-child{margin-bottom:0}
.arch .node::before{content:"";position:absolute;left:-36px;top:50%;width:36px;height:2px;background:var(--ink)}
.arch .node::after{content:"";position:absolute;left:-34px;top:50%;width:11px;height:11px;margin-top:-5px;border-radius:50%;background:var(--paper);border:2px solid var(--sun)}
.arch small{display:block;color:var(--primary);font-size:.75rem;font-weight:500}
.arch b{font-weight:500;font-size:1.02rem}
@keyframes lit{0%{border-color:var(--rule);color:var(--rule);background:transparent}45%{border-color:var(--sun)}100%{border-color:var(--ink);color:var(--ink);background:var(--card)}}
</style>
