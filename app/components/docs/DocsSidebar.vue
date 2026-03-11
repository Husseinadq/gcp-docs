<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const props = defineProps<{
  navigation: ContentNavigationItem[]
  currentPath: string
}>()

const overview = computed(() =>
  props.navigation.find((item) => item.path === '/docs')
)

const sections = computed(() => {
  if (overview.value?.children?.length) {
    return overview.value.children
  }

  return props.navigation.filter((item) => item.path !== '/docs')
})
</script>

<template>
  <div class="surface-panel p-5">
    <div class="mb-5">
      <p class="docs-kicker">Field guide</p>
      <h2 class="mt-2 text-lg font-semibold tracking-tight text-slate-950">Explore the docs</h2>
      <p class="mt-2 text-sm leading-6 text-slate-600">
        Task-first documentation for teams learning Google Cloud fast.
      </p>
    </div>

    <NuxtLink
      v-if="overview"
      :to="overview.path"
      class="mb-4 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-stone-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-atlas-300 hover:bg-atlas-50 hover:text-slate-950"
    >
      <span>{{ overview.title }}</span>
      <Icon name="lucide:arrow-right" class="text-base" />
    </NuxtLink>

    <ul class="space-y-2">
      <DocsSidebarItem
        v-for="item in sections"
        :key="item.path"
        :item="item"
        :current-path="currentPath"
      />
    </ul>
  </div>
</template>
