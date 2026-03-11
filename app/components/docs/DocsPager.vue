<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

defineProps<{
  previous?: ContentNavigationItem | null
  next?: ContentNavigationItem | null
}>()
</script>

<template>
  <div
    v-if="previous || next"
    class="mt-12 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2"
  >
    <NuxtLink
      v-if="previous"
      :to="previous.path"
      class="surface-panel p-5 transition hover:-translate-y-0.5"
    >
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Previous</p>
      <p class="mt-3 text-base font-semibold text-slate-950">{{ previous.title }}</p>
      <p
        v-if="'description' in previous && previous.description"
        class="mt-2 text-sm leading-6 text-slate-600"
      >
        {{ previous.description }}
      </p>
    </NuxtLink>

    <div v-else class="hidden sm:block" />

    <NuxtLink
      v-if="next"
      :to="next.path"
      class="surface-panel p-5 text-left transition hover:-translate-y-0.5 sm:text-right"
    >
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Next</p>
      <p class="mt-3 text-base font-semibold text-slate-950">{{ next.title }}</p>
      <p
        v-if="'description' in next && next.description"
        class="mt-2 text-sm leading-6 text-slate-600"
      >
        {{ next.description }}
      </p>
    </NuxtLink>
  </div>
</template>
