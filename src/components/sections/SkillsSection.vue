<script setup>
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import { skills, LAYER_KEYS } from '@/data/skills'
const { t } = useI18n()
const skillGroups = computed(() => LAYER_KEYS.map((k, i) => ({ k, name: t.value.layers[i].k, items: skills.filter(s => s.g === k) })))
</script>

<template>
  <section id="skills">
      <div class="container">
        <h2 class="title">{{ t.nav.skills }}</h2>
        <p class="sub">{{ t.skillsSub }}</p>
        <div class="row g-4">
          <div class="col-6 col-lg-3" v-for="g in skillGroups" :key="g.k">
            <div class="layer"><h3>{{ g.name }}</h3>
              <div class="sk" v-for="s in g.items" :key="s.n" :title="t.levels[s.lv]"><span>{{ s.n }}</span><span class="dots"><i v-for="n in 3" :key="n" :class="{on: n <= ({exp:3,adv:2,mid:1})[s.lv]}"></i></span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<style>
.layer{border-top:2px solid var(--ink);padding-top:.8rem;height:100%}
.layer h3{font-size:.95rem;font-weight:700;color:var(--primary);margin-bottom:.8rem}
.sk{display:flex;justify-content:space-between;align-items:center;padding:.4rem 0;border-bottom:1px solid var(--rule);direction:ltr}
.dots i{display:inline-block;width:8px;height:8px;border-radius:50%;border:1.5px solid var(--ink);margin-inline-start:3px}.dots i.on{background:var(--ink)}
</style>
