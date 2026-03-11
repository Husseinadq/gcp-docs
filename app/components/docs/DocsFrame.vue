<script setup lang="ts">
import type { ContentNavigationItem, TocLink } from '@nuxt/content'
import type { ServiceNavItem } from '~/utils/docs'

type ServiceSidebarItem = {
  path: string
  title: string
  description?: string | null
  category?: string | null
  order?: number | null
}

withDefaults(defineProps<{
  title: string
  description?: string
  eyebrow?: string
  currentPath: string
  navigation: ContentNavigationItem[]
  tocLinks?: TocLink[]
  service?: ServiceNavItem | null
  servicePages?: ServiceSidebarItem[]
}>(), {
  service: null,
  servicePages: () => []
})
</script>

<template>
  <div class="mx-auto max-w-[92rem] px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-10">
    <div class="surface-panel mb-8 overflow-hidden">
      <div
        class="border-b border-white/70 bg-[linear-gradient(135deg,rgba(79,151,127,0.14),rgba(255,255,255,0.88)_44%,rgba(245,125,15,0.12))] px-6 py-8 sm:px-8"
      >
        <p class="docs-kicker">{{ eyebrow || 'Google Cloud, explained clearly' }}</p>
        <h1 class="mt-3 max-w-4xl font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          {{ title }}
        </h1>
        <p
          v-if="description"
          class="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg"
        >
          {{ description }}
        </p>
      </div>

      <div class="border-t border-white/70 px-4 py-4 xl:hidden">
        <details class="group rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3">
          <summary class="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-slate-800">
            {{ service ? 'Browse this service' : 'Browse docs' }}
            <Icon name="lucide:chevron-down" class="text-base transition group-open:rotate-180" />
          </summary>
          <div class="mt-4">
            <DocsServiceSidebar
              v-if="service"
              :service="service"
              :pages="servicePages"
              :current-path="currentPath"
            />
            <DocsSidebar v-else :navigation="navigation" :current-path="currentPath" />
          </div>
        </details>
      </div>
    </div>

    <div class="grid items-start gap-8 xl:grid-cols-[18rem_minmax(0,1fr)_17rem]">
      <aside class="hidden xl:block xl:sticky xl:top-24">
        <DocsServiceSidebar
          v-if="service"
          :service="service"
          :pages="servicePages"
          :current-path="currentPath"
        />
        <DocsSidebar v-else :navigation="navigation" :current-path="currentPath" />
      </aside>

      <section class="min-w-0">
        <slot />
      </section>

      <aside class="hidden 2xl:block 2xl:sticky 2xl:top-24">
        <DocsToc :links="tocLinks ?? []" />
      </aside>
    </div>
  </div>
</template>
