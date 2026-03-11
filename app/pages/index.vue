<script setup lang="ts">
import { docsModes, featuredServices, getDocTypeMeta, homepageGoalCards } from '~/utils/docs'

useSeoMeta({
  title: 'GCP Atlas',
  description: 'Open-source Google Cloud docs with a Stripe-inspired service-first navigation model.'
})

const { data: catalog } = await useAsyncData(
  'home-docs-catalog',
  () => queryCollection('docs').select('path', 'title', 'description', 'docType', 'summary').all()
)

const pagesByPath = computed(
  () => new Map((catalog.value ?? []).map((entry) => [entry.path, entry]))
)

const serviceCards = computed(() =>
  featuredServices.map((service) => ({
    ...service,
    page: pagesByPath.value.get(service.path)
  }))
)

const goalCards = computed(() =>
  homepageGoalCards.map((goal) => ({
    ...goal,
    page: pagesByPath.value.get(goal.path)
  }))
)

const modeCards = computed(() =>
  docsModes.map((mode) => ({
    ...mode,
    meta: getDocTypeMeta(mode.docType),
    page: pagesByPath.value.get(mode.path)
  }))
)

const featuredHubCards = computed(() => serviceCards.value.slice(0, 4))
</script>

<template>
  <div class="mx-auto max-w-[92rem] px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-14">
    <section class="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_25rem]">
      <div class="surface-panel overflow-hidden">
        <div class="px-6 py-8 sm:px-10 sm:py-12">
          <p class="docs-kicker">Stripe-inspired GCP docs</p>
          <h1 class="mt-4 max-w-4xl font-serif text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Start with the service. Stay because the docs finally make sense.
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            The top bar gets you to the right GCP product fast. Each service hub then gives you the fastest path into quickstarts, guides, concepts, and reference.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/docs/cloud-run"
              class="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Start with Cloud Run
            </NuxtLink>
            <NuxtLink
              to="/docs"
              class="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-atlas-400 hover:text-atlas-800"
            >
              Open docs directory
            </NuxtLink>
          </div>
        </div>

        <div class="grid gap-px border-t border-white/70 bg-white/70 md:grid-cols-3">
          <div class="bg-white/70 px-6 py-6">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-atlas-100 text-atlas-800">
              <Icon name="lucide:blocks" class="text-xl" />
            </div>
            <h2 class="mt-4 text-lg font-semibold tracking-tight text-slate-950">Service-first top bar</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Featured products stay visible, and the mega menu handles the broader platform without turning the header into noise.
            </p>
          </div>
          <div class="bg-white/70 px-6 py-6">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-signal-100 text-signal-800">
              <Icon name="lucide:radar" class="text-xl" />
            </div>
            <h2 class="mt-4 text-lg font-semibold tracking-tight text-slate-950">High information scent</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Each product link explains what the service is for so users do not need to guess before clicking.
            </p>
          </div>
          <div class="bg-white/70 px-6 py-6">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-800">
              <Icon name="lucide:layers-3" class="text-xl" />
            </div>
            <h2 class="mt-4 text-lg font-semibold tracking-tight text-slate-950">One hub per service</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Each service hub answers use, avoid, compare, and next-step questions before the reader falls into a docs maze.
            </p>
          </div>
        </div>
      </div>

      <aside class="surface-panel p-6 sm:p-7">
        <p class="docs-kicker">Popular services</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-tight text-slate-950">Open a service hub</h2>
        <ul class="mt-6 space-y-3">
          <li
            v-for="service in serviceCards"
            :key="service.path"
          >
            <NuxtLink
              :to="service.path"
              class="flex items-center justify-between rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-atlas-300 hover:bg-atlas-50 hover:text-slate-950"
            >
              <span>{{ service.title }}</span>
              <Icon name="lucide:arrow-up-right" class="text-base" />
            </NuxtLink>
          </li>
        </ul>
      </aside>
    </section>

    <section class="mt-12">
      <div class="mb-5 flex items-end justify-between gap-4">
        <div>
          <p class="docs-kicker">Choose by goal</p>
          <h2 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">What are you trying to do?</h2>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="goal in goalCards"
          :key="goal.path"
          :to="goal.path"
          class="docs-mode-card group"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Icon :name="goal.icon" class="text-xl" />
          </div>
          <h2 class="mt-5 text-2xl font-semibold tracking-tight text-slate-950">{{ goal.title }}</h2>
          <p class="mt-3 text-sm leading-6 text-slate-600">
            {{ goal.description }}
          </p>
          <p class="mt-3 text-sm leading-6 text-slate-500">
            {{ goal.page?.description }}
          </p>
          <div class="mt-5 flex items-center gap-2 text-sm font-semibold text-atlas-700">
            Open service docs
            <Icon name="lucide:arrow-right" class="text-base transition group-hover:translate-x-1" />
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="mt-12 grid gap-6 xl:grid-cols-2">
      <div class="surface-panel px-6 py-8 sm:px-8">
        <p class="docs-kicker">Featured hubs</p>
        <h2 class="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Product hubs built like entry points, not dead-end overview pages.
        </h2>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <NuxtLink
            v-for="service in featuredHubCards"
            :key="service.path"
            :to="service.path"
            class="docs-note-card transition hover:-translate-y-0.5"
          >
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-atlas-100 text-atlas-800">
              <Icon :name="service.icon" class="text-xl" />
            </div>
            <p class="mt-4 text-lg font-semibold tracking-tight text-slate-950">{{ service.title }}</p>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ service.page?.description || service.description }}</p>
          </NuxtLink>
        </div>
      </div>

      <div class="surface-panel px-6 py-8 sm:px-8">
        <p class="docs-kicker">Under the surface</p>
        <h2 class="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          The docs still separate teaching, doing, understanding, and lookup.
        </h2>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <NuxtLink
            v-for="mode in modeCards"
            :key="mode.path"
            :to="mode.path"
            class="docs-note-card transition hover:-translate-y-0.5"
          >
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-2xl" :class="mode.meta.iconClass">
                <Icon :name="mode.meta.icon" class="text-lg" />
              </div>
              <span class="docs-chip text-xs" :class="mode.meta.badgeClass">{{ mode.meta.label }}</span>
            </div>
            <p class="mt-4 text-lg font-semibold tracking-tight text-slate-950">{{ mode.title }}</p>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ mode.page?.description || mode.summary }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
