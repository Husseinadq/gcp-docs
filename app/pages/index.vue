<script setup lang="ts">
useSeoMeta({
  title: 'GCP Atlas',
  description: 'Open-source Google Cloud documentation focused on plain language, real tasks, and production-aware examples.'
})

const pillars = [
  {
    title: 'Task-first guides',
    body: 'Learn by shipping real workloads, not by reading product marketing pages.',
    icon: 'lucide:map'
  },
  {
    title: 'Opinionated architectures',
    body: 'Show the tradeoffs, failure points, and costs before a team commits to a design.',
    icon: 'lucide:git-branch'
  },
  {
    title: 'Production-aware quickstarts',
    body: 'Every tutorial starts small, then explains what needs to change before going live.',
    icon: 'lucide:rocket'
  }
]

const tracks = [
  {
    title: 'Start Here',
    body: 'The shortest path from zero to understanding projects, billing, IAM, and regions.',
    to: '/docs/start-here',
    icon: 'lucide:flag'
  },
  {
    title: 'Core Concepts',
    body: 'Plain-English explanations of identity, networking, storage, and observability.',
    to: '/docs/core-concepts',
    icon: 'lucide:key-round'
  },
  {
    title: 'Products',
    body: 'Actionable guides for Cloud Run, Cloud Storage, Cloud SQL, and the services teams actually use.',
    to: '/docs/products',
    icon: 'lucide:boxes'
  }
]

const quickLinks = [
  { label: 'What is GCP?', to: '/docs/start-here/what-is-gcp' },
  { label: 'GCP for web apps', to: '/docs/start-here/gcp-for-web-apps' },
  { label: 'IAM basics', to: '/docs/core-concepts/iam-basics' },
  { label: 'Cloud Run guide', to: '/docs/products/cloud-run' },
  { label: 'Cloud Storage guide', to: '/docs/products/cloud-storage' }
]
</script>

<template>
  <div class="mx-auto max-w-[92rem] px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-14">
    <section class="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_24rem]">
      <div class="surface-panel overflow-hidden">
        <div class="px-6 py-8 sm:px-10 sm:py-12">
          <p class="docs-kicker">Open-source GCP docs</p>
          <h1 class="mt-4 max-w-4xl font-serif text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Google Cloud docs that make sense the first time.
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            GCP Atlas is a Nuxt-based documentation site for people who need plain language, fast answers, and working examples instead of maze-like product pages.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/docs"
              class="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Start reading
            </NuxtLink>
            <NuxtLink
              to="/docs/start-here/gcp-for-web-apps"
              class="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-atlas-400 hover:text-atlas-800"
            >
              Follow the web app path
            </NuxtLink>
          </div>
        </div>

        <div class="grid gap-px border-t border-white/70 bg-white/70 md:grid-cols-3">
          <div
            v-for="pillar in pillars"
            :key="pillar.title"
            class="bg-white/70 px-6 py-6"
          >
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-atlas-100 text-atlas-800">
              <Icon :name="pillar.icon" class="text-xl" />
            </div>
            <h2 class="mt-4 text-lg font-semibold tracking-tight text-slate-950">{{ pillar.title }}</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ pillar.body }}</p>
          </div>
        </div>
      </div>

      <aside class="surface-panel p-6 sm:p-7">
        <p class="docs-kicker">Quickstart map</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-tight text-slate-950">Read these first</h2>
        <ul class="mt-6 space-y-3">
          <li
            v-for="link in quickLinks"
            :key="link.to"
          >
            <NuxtLink
              :to="link.to"
              class="flex items-center justify-between rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-atlas-300 hover:bg-atlas-50 hover:text-slate-950"
            >
              <span>{{ link.label }}</span>
              <Icon name="lucide:arrow-up-right" class="text-base" />
            </NuxtLink>
          </li>
        </ul>
      </aside>
    </section>

    <section class="mt-12 grid gap-6 lg:grid-cols-3">
      <NuxtLink
        v-for="track in tracks"
        :key="track.title"
        :to="track.to"
        class="surface-panel group p-6 transition hover:-translate-y-1"
      >
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-signal-100 text-signal-700">
          <Icon :name="track.icon" class="text-xl" />
        </div>
        <h2 class="mt-5 text-2xl font-semibold tracking-tight text-slate-950">{{ track.title }}</h2>
        <p class="mt-3 text-sm leading-6 text-slate-600">{{ track.body }}</p>
        <div class="mt-5 flex items-center gap-2 text-sm font-semibold text-atlas-700">
          Open section
          <Icon name="lucide:arrow-right" class="text-base transition group-hover:translate-x-1" />
        </div>
      </NuxtLink>
    </section>

    <section class="mt-12 surface-panel overflow-hidden">
      <div class="grid gap-px bg-white/70 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div class="bg-white/70 px-6 py-8 sm:px-8">
          <p class="docs-kicker">Why this project exists</p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            The goal is not to copy the official docs.
          </h2>
          <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            The goal is to make cloud decisions easier. That means shorter explanations, stronger opinions, clearer architecture guidance, and fewer pages that assume the reader already knows GCP vocabulary.
          </p>
        </div>

        <div class="bg-slate-950 px-6 py-8 text-slate-100 sm:px-8">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Current foundation</p>
          <ul class="mt-5 space-y-4 text-sm leading-6 text-slate-300">
            <li>Nuxt 4 app shell</li>
            <li>Tailwind CSS styling system</li>
            <li>Nuxt Content markdown workflow</li>
            <li>Starter docs for the first learning path</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
