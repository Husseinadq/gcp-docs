<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

withDefaults(defineProps<{
  links: TocLink[]
  eyebrow?: string
  title?: string
  description?: string
}>(), {
  eyebrow: 'On this page',
  title: 'Contents',
  description: ''
})
</script>

<template>
  <div v-if="links.length" class="surface-panel p-5">
    <p class="docs-kicker">{{ eyebrow }}</p>
    <h2 class="mt-2 text-lg font-semibold tracking-tight text-slate-950">{{ title }}</h2>
    <p v-if="description" class="mt-2 text-sm leading-6 text-slate-600">{{ description }}</p>
    <ul class="mt-4 space-y-1">
      <DocsTocItem
        v-for="link in links"
        :key="link.id"
        :link="link"
      />
    </ul>
  </div>
</template>
