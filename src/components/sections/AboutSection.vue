<script setup>
import { useI18n } from '@/i18n'
import { me } from '@/config/site'
import { formatPhone } from '@/utils/phone'
const { t } = useI18n()
const profileUrl = `${import.meta.env.BASE_URL}assets/images/profile.jpg`   // ضع صورتك في public/assets/images/
</script>

<template>
  <section id="about">
      <div class="container">
        <h2 v-reveal class="title">{{ t.nav.about }}</h2>
        <p v-reveal="{ delay: 80 }" class="sub">{{ t.aboutSub }}</p>
        <div class="row g-4">
          <div class="col-lg-7">
            <div v-reveal class="panel d-flex gap-4 align-items-center flex-wrap flex-md-nowrap">
              <img :src="profileUrl" :alt="t.name" width="150" height="150" style="border-radius:4px;object-fit:cover" @error="$event.target.remove()">
              <div><p class="mb-2" v-for="p in t.about" :key="p">{{ p }}</p></div>
            </div>
          </div>
          <div class="col-lg-5">
            <div v-reveal="{ delay: 120 }" class="panel">
              <h3 class="h6 fw-bold mb-3">{{ t.focusTitle }}</h3>
              <span class="pt" v-for="f in t.focus" :key="f">{{ f }}</span>
              <hr style="border-color:var(--rule)">
              <div class="d-flex flex-column gap-2">
                <a class="contact-line" :href="'mailto:' + me.email"><i class="bi bi-envelope"></i><bdi dir="ltr">{{ me.email }}</bdi></a>
                <a class="contact-line" :href="'tel:' + me.phone"><i class="bi bi-telephone"></i><bdi dir="ltr">{{ formatPhone(me.phone) }}</bdi></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<style>
.pt{display:inline-block;border:1px solid var(--rule);border-radius:4px;padding:.15rem .7rem;margin:0 0 .5rem .5rem;font-size:.9rem;color:var(--accent)}
.contact-line{display:flex;align-items:center;gap:.7rem;color:var(--mute);transition:color .2s}
.contact-line i{color:var(--primary);font-size:1.05rem}
.contact-line:hover{color:var(--ink)}
</style>
