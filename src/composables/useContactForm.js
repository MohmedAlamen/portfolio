import { ref } from 'vue'
import { sendMessage } from '@/services/contact'
import { useI18n } from '@/i18n'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useContactForm() {
  const { t } = useI18n()
  const empty = () => ({ name: '', email: '', message: '', website: '' })
  const form = ref(empty()), sending = ref(false), msg = ref(''), ok = ref(false)

  async function submit() {
    const f = form.value; msg.value = ''
    if (f.website) return                                   // honeypot
    if (!f.name || !f.message || !EMAIL_RE.test(f.email)) { ok.value = false; msg.value = t.value.form.invalid; return }
    sending.value = true
    try {
      const r = await sendMessage(f)
      ok.value = true; msg.value = r === 'mailto' ? t.value.form.mail : t.value.form.ok
      if (r === 'sent') form.value = empty()
    } catch { ok.value = false; msg.value = t.value.form.fail }
    sending.value = false
  }
  return { form, sending, msg, ok, submit }
}
