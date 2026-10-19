import { ref, onMounted, onUnmounted } from 'vue'

export function useTyping(words) {
  const typed = ref('')
  let timer, i = 0, j = 0, del = false
  const tick = () => {
    const w = words[i]; typed.value = w.slice(0, j)
    if (!del && j === w.length) { del = true; timer = setTimeout(tick, 1400); return }
    if (del && j === 0) { del = false; i = (i + 1) % words.length }
    j += del ? -1 : 1
    timer = setTimeout(tick, del ? 40 : 90)
  }
  onMounted(tick)
  onUnmounted(() => clearTimeout(timer))
  return typed
}
