<script setup>
import { useI18n } from '@/i18n'
import { useContactForm } from '@/composables/useContactForm'
import { me } from '@/config/site'
const { t } = useI18n()
const { form, sending, msg, submit } = useContactForm()
const contacts = [
  { i: 'bi bi-github', u: 'https://github.com/' + me.github, l: 'GitHub' },
  { i: 'bi bi-linkedin', u: me.linkedin, l: 'LinkedIn' },
  { i: 'bi bi-envelope', u: 'mailto:' + me.email, l: 'Email' },
  { i: 'bi bi-telephone', u: 'tel:' + me.phone, l: 'Phone' }
]
</script>

<template>
  <section id="contact" class="contact">
      <div class="container">
        <div class="mx-auto" style="max-width:640px">
          <h2 class="title">{{ t.contactTitle }}</h2>
          <p class="sub">{{ t.contactSub }}</p>
          <form class="mb-5" @submit.prevent="submit" novalidate>
            <input type="text" v-model="form.website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0">
            <div class="row g-3">
              <div class="col-md-6"><label class="form-label" for="f-name">{{ t.form.name }}</label><input id="f-name" v-model.trim="form.name" class="form-control search" maxlength="80" required autocomplete="name"></div>
              <div class="col-md-6"><label class="form-label" for="f-email">{{ t.form.email }}</label><input id="f-email" type="email" v-model.trim="form.email" class="form-control search" maxlength="120" required autocomplete="email" dir="ltr"></div>
              <div class="col-12"><label class="form-label" for="f-msg">{{ t.form.message }}</label><textarea id="f-msg" v-model.trim="form.message" rows="5" class="form-control search" maxlength="2000" required></textarea></div>
            </div>
            <div class="d-flex align-items-center gap-3 mt-3 flex-wrap">
              <button class="btn btn-main" :disabled="sending">{{ sending ? t.form.sending : t.form.send }}</button>
              <span v-if="msg" role="status">{{ msg }}</span>
            </div>
          </form>
          <div class="d-flex gap-3 flex-wrap">
            <a class="ic" v-for="c in contacts" :key="c.i" :href="c.u" target="_blank" rel="noopener" :aria-label="c.l"><i :class="c.i"></i></a>
          </div>
        </div>
      </div>
    </section>
</template>

<style>
.contact{background:var(--primary);color:var(--paper);border:0}
.contact .sub{color:rgba(238,242,241,.8)}
.contact .search{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.4);color:var(--paper)}
.contact .search:focus{background:rgba(255,255,255,.16);color:var(--paper);border-color:var(--paper);box-shadow:none}
.contact .search::placeholder,.contact label.form-label{color:rgba(238,242,241,.8)}
.contact .btn-main{background:var(--paper);color:var(--primary);font-weight:700}
.contact a.ic{width:52px;height:52px;border:1px solid rgba(255,255,255,.5);border-radius:4px;display:inline-flex;align-items:center;justify-content:center;font-size:1.35rem;color:var(--paper)}
.contact a.ic:hover{background:var(--paper);color:var(--primary)}
</style>
