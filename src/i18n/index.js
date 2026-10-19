import { ref, computed, watch } from 'vue'
import rtlCss from 'bootstrap/dist/css/bootstrap.rtl.min.css?url'
import ltrCss from 'bootstrap/dist/css/bootstrap.min.css?url'
import ar from './ar'
import en from './en'

const messages = { ar, en }
let saved = 'ar'
try { saved = localStorage.getItem('lang') || 'ar' } catch { /* ignore */ }
const lang = ref(saved === 'en' ? 'en' : 'ar')

function apply(l) {
  const rtl = l === 'ar'
  document.documentElement.lang = l
  document.documentElement.dir = rtl ? 'rtl' : 'ltr'
  let link = document.getElementById('bs-dir')
  if (!link) { link = document.createElement('link'); link.id = 'bs-dir'; link.rel = 'stylesheet'; document.head.prepend(link) }
  link.href = rtl ? rtlCss : ltrCss
  try { localStorage.setItem('lang', l) } catch { /* ignore */ }
}
watch(lang, apply, { immediate: true })

export function useI18n() {
  const t = computed(() => messages[lang.value])
  const toggleLang = () => { lang.value = lang.value === 'ar' ? 'en' : 'ar' }
  return { t, lang, toggleLang }
}
