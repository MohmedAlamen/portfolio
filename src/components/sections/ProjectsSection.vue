<script setup>
import { TransitionGroup } from 'vue'
import { useI18n } from '@/i18n'
import { inject } from 'vue'
import { REPOS_KEY } from '@/composables/keys'
import { me } from '@/config/site'
import RepoCard from '@/components/ui/RepoCard.vue'
const { t } = useI18n()
const { loading, error, q, lang, langs, featuredRepos, rest, load } = inject(REPOS_KEY)
</script>

<template>
  <section id="projects">
      <div class="container">
        <h2 v-reveal class="title">{{ t.nav.projects }}</h2>
        <p v-reveal="{ delay: 80 }" class="sub">{{ t.projectsSub }}</p>
        <h3 class="h5 fw-bold mb-3">{{ t.clientTitle }}</h3>
        <div class="row g-4 mb-5">
          <div class="col-md-6 col-lg-4" v-for="(f, i) in t.client" :key="f.n">
            <article v-reveal="{ delay: i * 90 }" class="proj client"><h5 class="mb-2">{{ f.n }}</h5><p>{{ f.d }}</p>
              <div><span class="tag" v-for="x in f.t" :key="x">{{ x }}</span></div></article>
          </div>
        </div>
        <h3 class="h5 fw-bold mb-3">{{ t.ghTitle }}</h3>
        <div v-if="loading" class="py-5"><div class="spin" role="status" :aria-label="t.loading"></div></div>
        <div v-else-if="error" class="panel text-center">
          <p class="mb-3">{{ t.errorMsg }} ({{ error }})</p>
          <div class="d-flex gap-2 justify-content-center flex-wrap">
            <button class="btn btn-main" @click="load">{{ t.retry }}</button>
            <a class="btn btn-ghost" :href="'https://github.com/'+me.github+'?tab=repositories'" target="_blank" rel="noopener">{{ t.openGh }}</a>
          </div>
        </div>
        <template v-else>
          <div class="row g-4 mb-4" v-if="featuredRepos.length">
            <div class="col-md-6 col-lg-4" v-for="r in featuredRepos" :key="'f'+r.id"><RepoCard :r="r" :star="true"></RepoCard></div>
          </div>
          <div class="row g-3 my-4 align-items-center">
            <div class="col-md-4"><input v-model="q" class="form-control search" :placeholder="t.search" :aria-label="t.search"></div>
            <div class="col-md-8 d-flex flex-wrap gap-2">
              <button class="chip" :class="{on: lang===''}" @click="lang=''">{{ t.all }}</button>
              <button class="chip" v-for="l in langs" :key="l" :class="{on: lang===l}" @click="lang=l">{{ l }}</button>
            </div>
          </div>
          <div v-if="!rest.length" class="panel text-center">{{ t.empty }}</div>
          <TransitionGroup v-else tag="div" name="list" appear class="row g-4">
            <div class="col-md-6 col-lg-4" v-for="(r, i) in rest" :key="r.id" :style="{ '--d': Math.min(i, 8) * 55 + 'ms' }"><RepoCard :r="r"></RepoCard></div>
          </TransitionGroup>
        </template>
      </div>
    </section>
</template>

<style>
.chip{border:1px solid var(--rule);background:transparent;color:var(--mute);border-radius:4px;padding:.25rem .9rem;font-size:.9rem;cursor:pointer;font-family:inherit}
.chip.on,.chip:hover{background:var(--ink);border-color:var(--ink);color:var(--paper)}
.client{border-inline-start:4px solid var(--accent)}
.spin{width:2.2rem;height:2.2rem;border:3px solid var(--rule);border-top-color:var(--primary);border-radius:50%;animation:sp .8s linear infinite;margin:auto}
@keyframes sp{to{transform:rotate(360deg)}}
</style>
