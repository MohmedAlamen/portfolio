import { ref, computed, onMounted } from 'vue'
import { fetchRepos } from '@/services/github'
import { FEATURED_REPOS } from '@/config/site'

export function useRepos() {
  const repos = ref([]), loading = ref(true), error = ref('')
  const q = ref(''), lang = ref('')

  async function load() {
    loading.value = true; error.value = ''
    try { repos.value = await fetchRepos() } catch (e) { error.value = e.message }
    loading.value = false
  }
  onMounted(load)

  const langs = computed(() => [...new Set(repos.value.map(r => r.language).filter(Boolean))])
  const featuredRepos = computed(() => FEATURED_REPOS.length
    ? FEATURED_REPOS.map(n => repos.value.find(r => r.name === n)).filter(Boolean)
    : repos.value.slice(0, 3))
  const filtered = computed(() => repos.value.filter(r =>
    (!lang.value || r.language === lang.value) &&
    (!q.value || (r.name + ' ' + (r.description || '')).toLowerCase().includes(q.value.toLowerCase()))))
  const rest = computed(() => (q.value || lang.value) ? filtered.value : filtered.value.filter(r => !featuredRepos.value.includes(r)))

  return { repos, loading, error, q, lang, langs, featuredRepos, rest, load }
}
