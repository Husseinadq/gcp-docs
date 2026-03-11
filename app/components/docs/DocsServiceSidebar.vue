<script setup lang="ts">
import type { ServiceNavItem } from '~/utils/docs'

type ServiceDocItem = {
  path: string
  title: string
  description?: string | null
  category?: string | null
  order?: number | null
}

const props = defineProps<{
  service: ServiceNavItem
  currentPath: string
  pages: ServiceDocItem[]
}>()

const sectionOrder = new Map([
  ['Get started', 0],
  ['Guides', 1],
  ['Concepts', 2],
  ['Operate', 3],
  ['Reference', 4]
])

const sections = computed(() => {
  const grouped = new Map<string, ServiceDocItem[]>()

  for (const page of props.pages) {
    const category = page.category || 'More'
    const items = grouped.get(category) ?? []

    items.push(page)
    grouped.set(category, items)
  }

  return Array.from(grouped.entries())
    .sort((left, right) => {
      const leftOrder = sectionOrder.get(left[0]) ?? Number.MAX_SAFE_INTEGER
      const rightOrder = sectionOrder.get(right[0]) ?? Number.MAX_SAFE_INTEGER

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder
      }

      return left[0].localeCompare(right[0])
    })
    .map(([title, items]) => ({
      title,
      items: [...items].sort((left, right) => {
        if ((left.order ?? 999) !== (right.order ?? 999)) {
          return (left.order ?? 999) - (right.order ?? 999)
        }

        return left.title.localeCompare(right.title)
      })
    }))
})

const isOverviewActive = computed(() => props.currentPath === props.service.path)
</script>

<template>
  <div class="surface-panel p-5">
    <div class="mb-5">
      <p class="docs-kicker">In this service</p>
      <h2 class="mt-2 text-lg font-semibold tracking-tight text-slate-950">{{ service.title }} docs</h2>
      <p class="mt-2 text-sm leading-6 text-slate-600">
        {{ service.description }}
      </p>
    </div>

    <NuxtLink
      :to="service.path"
      class="group mb-5 flex items-start gap-3 rounded-2xl px-3 py-2.5 transition"
      :class="isOverviewActive ? 'bg-atlas-100 text-atlas-900 shadow-[inset_0_0_0_1px_rgba(126,185,163,0.45)]' : 'text-slate-700 hover:bg-white hover:text-slate-950'"
    >
      <span
        class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full transition"
        :class="isOverviewActive ? 'bg-signal-400' : 'bg-slate-300 group-hover:bg-atlas-500'"
      />
      <span class="leading-6">Overview</span>
    </NuxtLink>

    <section
      v-for="section in sections"
      :key="section.title"
      class="mb-5 last:mb-0"
    >
      <p class="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{{ section.title }}</p>
      <ul class="mt-2 space-y-1">
        <li v-for="item in section.items" :key="item.path">
          <NuxtLink
            :to="item.path"
            class="group flex items-start gap-3 rounded-2xl px-3 py-2.5 transition"
            :class="currentPath === item.path ? 'bg-atlas-100 text-atlas-900 shadow-[inset_0_0_0_1px_rgba(126,185,163,0.45)]' : 'text-slate-600 hover:bg-white hover:text-slate-950'"
          >
            <span
              class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full transition"
              :class="currentPath === item.path ? 'bg-signal-400' : 'bg-slate-300 group-hover:bg-atlas-500'"
            />
            <span class="leading-6">{{ item.title }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
