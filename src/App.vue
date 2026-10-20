<script setup>
import { provide } from 'vue'
import { useRepos } from '@/composables/useRepos'
import { REPOS_KEY } from '@/composables/keys'
import MatchSection from '@/components/sections/MatchSection.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
provide(REPOS_KEY, useRepos())
</script>

<template>
  <AppNavbar />
  <main>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <SkillsSection />
    <ProjectsSection />
    <MatchSection />
    <ContactSection />
  </main>
  <AppFooter />
</template>
