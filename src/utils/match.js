const esc = s => s.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&')
const has = (text, kw) => new RegExp(`(^|[^a-z0-9+#])${esc(kw)}($|[^a-z0-9+#])`, 'i').test(text)

/** Finds known technologies in a job description and compares them with the ones listed on this site. */
export function analyze(jd, vocab, repos = []) {
  const text = jd.toLowerCase()
  const found = vocab.filter(v => v.kw.some(k => has(text, k)))
  const matched = found.filter(v => v.mine), gaps = found.filter(v => !v.mine)
  const score = found.length ? Math.round(matched.length / found.length * 100) : 0
  const related = repos.map(r => {
    const rt = [r.name, r.description, r.language, ...(r.topics || [])].join(' ').toLowerCase()
    return { r, n: matched.filter(v => v.kw.some(k => has(rt, k))).length }
  }).filter(x => x.n > 0).sort((a, b) => b.n - a.n).slice(0, 3).map(x => x.r)
  return { found, matched, gaps, score, related }
}
