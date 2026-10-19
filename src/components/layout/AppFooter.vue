<script setup>
import { useI18n } from '@/i18n'
const { t } = useI18n()
</script>

<template>
  <footer>© {{ new Date().getFullYear() }} {{ t.name }} — {{ t.built }}</footer>
</template>

<style>
footer{background:var(--ink);padding:22px 0;color:#b3c2c0;text-align:center;font-size:.9rem}
</style>
