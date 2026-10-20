import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import App from '@/App.vue'
import { safeUrl } from '@/utils/url'

const repos = [
  { id: 1, name: 'demo', description: 'd', html_url: 'https://github.com/a/demo', homepage: 'javascript:alert(1)', language: 'Vue', topics: [], stargazers_count: 3, forks_count: 0, pushed_at: '2026-01-01', fork: false },
  { id: 2, name: 'forked', html_url: 'https://github.com/a/f', language: 'Java', topics: [], stargazers_count: 0, forks_count: 0, pushed_at: '2025-01-01', fork: true }
]
beforeEach(() => { sessionStorage.clear(); vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, status: 200, json: async () => repos }))) })

describe('safeUrl', () => {
  it('accepts https only', () => { expect(safeUrl('https://ok.dev')).toContain('https://ok.dev'); expect(safeUrl('javascript:alert(1)')).toBe(''); expect(safeUrl('')).toBe('') })
})
describe('App', () => {
  it('renders all sections and the architecture diagram', async () => {
    const w = mount(App); await flushPromises()
    expect(w.findAll('.node')).toHaveLength(4)
    expect(w.findAll('.spec')).toHaveLength(4)
    expect(w.findAll('.layer')).toHaveLength(4)
    expect(w.findAll('.sk')).toHaveLength(12)
  })
  it('lists non-fork repos and strips unsafe homepage links', async () => {
    const w = mount(App); await flushPromises()
    expect(w.html()).toContain('demo'); expect(w.html()).not.toContain('forked'); expect(w.html()).not.toContain('javascript:')
  })
  it('switches language and direction', async () => {
    const w = mount(App); await flushPromises()
    expect(document.documentElement.dir).toBe('rtl')
    await w.find('.langbtn').trigger('click'); await flushPromises()
    expect(document.documentElement.dir).toBe('ltr')
  })
  it('validates the contact form', async () => {
    const w = mount(App); await flushPromises()
    await w.find('form').trigger('submit'); await flushPromises()
    expect(w.find('[role=status]').exists()).toBe(true)
  })
})

describe('motion', () => {
  it('reveal directive leaves content visible when IntersectionObserver is unavailable', async () => {
    const w = mount(App); await flushPromises()
    expect(w.findAll('.reveal')).toHaveLength(0)   // jsdom has no IntersectionObserver -> no hidden content
    expect(w.find('.facts b').text()).toMatch(/\d/)
  })
})

describe('phone', () => {
  it('shows the formatted Saudi number and links with the raw number', async () => {
    const w = mount(App); await flushPromises()
    expect(w.text()).toContain('+966 53 576 6391')
    expect(w.html()).toContain('tel:+966535766391')
    expect(w.html()).toContain('https://wa.me/966535766391')
  })
})
