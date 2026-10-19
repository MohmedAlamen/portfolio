import { me, HIDE, PROJECTS_JSON } from '@/config/site'
import { safeUrl } from '@/utils/url'

const CACHE_KEY = 'gh_repos', TTL = 10 * 60 * 1000

const readCache = () => { try { const c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null'); return c && Date.now() - c.t < TTL ? c.d : null } catch { return null } }
const writeCache = d => { try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d })) } catch { /* storage unavailable */ } }

async function fromStaticFile() {
  try { const r = await fetch(PROJECTS_JSON, { cache: 'no-cache' }); if (!r.ok) return null; const j = await r.json(); return Array.isArray(j) && j.length ? j : null } catch { return null }
}
async function fromApi() {
  const r = await fetch(`https://api.github.com/users/${me.github}/repos?per_page=100&sort=updated`)
  if (!r.ok) throw new Error(r.status === 403 ? 'rate limit' : String(r.status))
  return r.json()
}

/** Order: session cache -> static projects.json -> GitHub API */
export async function fetchRepos() {
  const data = readCache() || await fromStaticFile() || await fromApi()
  writeCache(data)
  return data.filter(r => !r.fork && !HIDE.includes(r.name))
    .map(r => ({ ...r, homepage: safeUrl(r.homepage), html_url: safeUrl(r.html_url) }))
    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
}
