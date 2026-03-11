<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

defineOptions({ name: 'DocsTocItem' })

const props = withDefaults(
  defineProps<{
    link: TocLink
    depth?: number
  }>(),
  {
    depth: 0
  }
)

const href = computed(() => `#${props.link.id}`)
</script>

<template>
  <li>
    <a
      :href="href"
      class="block rounded-xl px-3 py-2 text-sm leading-5 text-slate-500 transition hover:bg-white hover:text-slate-900"
      :class="depth > 0 ? 'ml-4' : ''"
    >
      {{ link.text }}
    </a>

    <ul v-if="link.children?.length" class="mt-1 space-y-1">
      <DocsTocItem
        v-for="child in link.children"
        :key="child.id"
        :link="child"
        :depth="depth + 1"
      />
    </ul>
  </li>
</template>
