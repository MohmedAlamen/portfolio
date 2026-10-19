export const safeUrl = u => { try { const x = new URL(u); return x.protocol === 'https:' ? x.href : '' } catch { return '' } }
