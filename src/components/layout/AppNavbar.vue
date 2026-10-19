<script setup>
import { useI18n } from '@/i18n'
const { t, toggleLang } = useI18n()
const links = ['about', 'services', 'skills', 'projects']
</script>

<template>
  <nav class="navbar navbar-expand-md fixed-top">
      <div class="container">
        <a class="navbar-brand brand" href="#home">{{ t.name }}</a>
        <button class="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#nav" :aria-label="t.menu"><i class="bi bi-list fs-2"></i></button>
        <div class="collapse navbar-collapse" id="nav">
          <ul class="navbar-nav ms-auto align-items-md-center">
            <li class="nav-item" v-for="l in links" :key="l"><a class="nav-link" :href="'#'+l">{{ t.nav[l] }}</a></li>
            <li class="nav-item ms-md-2 mt-2 mt-md-0"><button class="langbtn" @click="toggleLang" :aria-label="t.switchLabel">{{ t.switchTo }}</button></li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<style>
.navbar{background:rgba(238,242,241,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--rule)}
.navbar .nav-link{color:var(--mute);font-weight:500}.navbar .nav-link:hover{color:var(--primary)}
.brand{font-weight:700;font-size:1.25rem;color:var(--ink)}
.langbtn{border:1px solid var(--ink);background:transparent;color:var(--ink);border-radius:4px;padding:.25rem .8rem;font-weight:500}
.langbtn:hover{background:var(--ink);color:var(--paper)}
</style>
