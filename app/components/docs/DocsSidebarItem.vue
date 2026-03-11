<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

defineOptions({ name: 'DocsSidebarItem' })

const props = withDefaults(
  defineProps<{
    item: ContentNavigationItem
    currentPath: string
    depth?: number
  }>(),
  {
    depth: 0
  }
)

const isActive = computed(() => props.currentPath === props.item.path)
const hasChildren = computed(() => Boolean(props.item.children?.length))
</script>

<template>
  <li>
    <NuxtLink
      v-if="item.page !== false"
      :to="item.path"
      class="group flex items-start gap-3 rounded-2xl px-3 py-2.5 transition"
      :class="[
        isActive
          ? 'bg-atlas-100 text-atlas-900 shadow-[inset_0_0_0_1px_rgba(126,185,163,0.45)]'
          : 'text-slate-600 hover:bg-white hover:text-slate-950',
        depth > 0 ? 'text-sm' : 'text-[0.95rem]'
      ]"
    >
      <span
        class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full transition"
        :class="isActive ? 'bg-signal-400' : 'bg-slate-300 group-hover:bg-atlas-500'"
      />
      <span class="leading-6">{{ item.title }}</span>
    </NuxtLink>

    <div
      v-else
      class="px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
    >
      {{ item.title }}
    </div>

    <ul
      v-if="hasChildren"
      class="ml-4 mt-2 space-y-1 border-l border-slate-200/80 pl-3"
    >
      <DocsSidebarItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :current-path="currentPath"
        :depth="depth + 1"
      />
    </ul>
  </li>
</template>
