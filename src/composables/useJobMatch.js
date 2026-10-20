import { ref, inject } from 'vue'
import { analyze } from '@/utils/match'
import { vocab } from '@/data/vocab'
import { REPOS_KEY } from './keys'

export function useJobMatch() {
  const { repos } = inject(REPOS_KEY)
  const jd = ref(''), result = ref(null)
  const run = () => { result.value = jd.value.trim() ? analyze(jd.value, vocab, repos.value) : null }
  const clear = () => { jd.value = ''; result.value = null }
  return { jd, result, run, clear }
}
