<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

defineProps<{
  links: TocLink[]
}>()
</script>

<template>
  <div v-if="links.length" class="surface-panel p-5">
    <p class="docs-kicker">On this page</p>
    <ul class="mt-4 space-y-1">
      <DocsTocItem
        v-for="link in links"
        :key="link.id"
        :link="link"
      />
    </ul>
  </div>
</template>
