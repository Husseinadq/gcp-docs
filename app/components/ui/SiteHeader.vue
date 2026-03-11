<script setup lang="ts">
import { allServices, featuredServices, serviceGroups } from '~/utils/docs'

const route = useRoute()
const featuredServicePaths = new Set(featuredServices.map((service) => service.path))

function isActiveService(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}

const isAllServicesActive = computed(() =>
  allServices.some((service) => {
    if (featuredServicePaths.has(service.path)) {
      return false
    }

    return isActiveService(service.path)
  })
)
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/70 bg-stone-50/85 backdrop-blur-xl">
    <div class="mx-auto flex max-w-[92rem] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="group flex items-center gap-3">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-2xl border border-atlas-200 bg-atlas-100 text-atlas-800 shadow-[0_18px_40px_-28px_rgba(51,117,98,0.7)] transition group-hover:-translate-y-0.5"
        >
          <Icon name="lucide:cloud" class="text-xl" />
        </div>

        <div>
          <p class="font-serif text-lg font-semibold tracking-tight text-slate-950">GCP Atlas</p>
          <p class="text-xs uppercase tracking-[0.22em] text-slate-500">Service-first docs</p>
        </div>
      </NuxtLink>

      <nav class="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto px-2 lg:flex">
        <NuxtLink
          v-for="service in featuredServices"
          :key="service.path"
          :to="service.path"
          class="shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition"
          :class="isActiveService(service.path) ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-white hover:text-slate-950'"
        >
          {{ service.shortTitle || service.title }}
        </NuxtLink>

        <div class="group relative shrink-0">
          <button
            type="button"
            class="flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition"
            :class="isAllServicesActive ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-white hover:text-slate-950'"
          >
            All services
            <Icon name="lucide:chevron-down" class="text-sm transition group-hover:rotate-180" />
          </button>

          <div
            class="invisible absolute right-0 top-full z-50 mt-3 w-[62rem] translate-y-2 rounded-[2rem] border border-white/70 bg-white/95 p-6 opacity-0 shadow-[0_32px_90px_-36px_rgba(15,23,42,0.42)] backdrop-blur transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
          >
            <div class="grid gap-5 lg:grid-cols-2">
              <section
                v-for="group in serviceGroups"
                :key="group.title"
                class="rounded-3xl border border-slate-200/80 bg-stone-50/90 p-5"
              >
                <div class="mb-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{{ group.title }}</p>
                  <p class="mt-2 text-sm leading-6 text-slate-600">{{ group.description }}</p>
                </div>

                <div class="space-y-2">
                  <NuxtLink
                    v-for="item in group.items"
                    :key="item.path"
                    :to="item.path"
                    class="flex items-start gap-3 rounded-2xl px-3 py-3 transition hover:bg-white"
                  >
                    <div class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Icon :name="item.icon" class="text-lg" />
                    </div>

                    <div class="min-w-0">
                      <p class="text-sm font-semibold text-slate-950">{{ item.title }}</p>
                      <p class="mt-1 text-sm leading-6 text-slate-600">{{ item.description }}</p>
                    </div>
                  </NuxtLink>
                </div>
              </section>
            </div>
          </div>
        </div>
      </nav>

      <nav class="flex items-center gap-2 sm:gap-3">
        <NuxtLink
          to="/docs"
          class="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-950 lg:inline-flex"
        >
          Docs home
        </NuxtLink>
        <NuxtLink
          to="/docs"
          class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-atlas-300 hover:text-slate-950"
        >
          <Icon name="lucide:search" class="text-sm" />
          Browse
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
