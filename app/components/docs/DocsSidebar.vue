<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { docsModes } from '~/utils/docs'

type NavigationItem = ContentNavigationItem & {
  order?: number
  children?: NavigationItem[]
}

const props = defineProps<{
  navigation: NavigationItem[]
  currentPath: string
}>()

const overview = computed(() =>
  props.navigation.find((item) => item.path === '/docs')
)

const modeOrder = new Map(docsModes.map((mode, index) => [mode.path, index]))

function sortItems(items: NavigationItem[]) {
  return [...items]
    .sort((left, right) => {
      const leftMode = modeOrder.get(left.path)
      const rightMode = modeOrder.get(right.path)

      if (leftMode !== undefined || rightMode !== undefined) {
        return (leftMode ?? Number.MAX_SAFE_INTEGER) - (rightMode ?? Number.MAX_SAFE_INTEGER)
      }

      return (left.order ?? 999) - (right.order ?? 999)
    })
    .map((item) => ({
      ...item,
      children: item.children ? sortItems(item.children as NavigationItem[]) : item.children
    }))
}

const sections = computed(() => {
  if (overview.value?.children?.length) {
    return sortItems(overview.value.children as NavigationItem[])
  }

  return sortItems(props.navigation.filter((item) => item.path !== '/docs') as NavigationItem[])
})
</script>

<template>
  <div class="surface-panel p-5">
    <div class="mb-5">
      <p class="docs-kicker">Choose a mode</p>
      <h2 class="mt-2 text-lg font-semibold tracking-tight text-slate-950">Read the right kind of page</h2>
      <p class="mt-2 text-sm leading-6 text-slate-600">
        Tutorials teach. How-to guides solve. Explanations clarify. Reference pages answer fast.
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
