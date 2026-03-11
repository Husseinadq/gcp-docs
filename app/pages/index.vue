<script setup lang="ts">
import { commonTaskPaths, docsModes, getDocTypeMeta, webAppPath } from '~/utils/docs'

useSeoMeta({
  title: 'GCP Atlas',
  description: 'Open-source Google Cloud documentation organized by how people actually learn: tutorial, how-to, explanation, and reference.'
})

const { data: catalog } = await useAsyncData(
  'home-docs-catalog',
  () => queryCollection('docs').select('path', 'title', 'description', 'docType').all()
)

const pagesByPath = computed(
  () => new Map((catalog.value ?? []).map((entry) => [entry.path, entry]))
)

const modes = computed(() =>
  docsModes.map((mode) => ({
    ...mode,
    meta: getDocTypeMeta(mode.docType),
    page: pagesByPath.value.get(mode.path)
  }))
)

const guidedPath = computed(() =>
  webAppPath
    .map((step) => ({
      ...step,
      page: pagesByPath.value.get(step.path)
    }))
    .filter((step) => step.page)
)

const commonTasks = computed(() =>
  commonTaskPaths
    .map((path) => pagesByPath.value.get(path))
    .filter(Boolean)
)
</script>

<template>
  <div class="mx-auto max-w-[92rem] px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-14">
    <section class="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_24rem]">
      <div class="surface-panel overflow-hidden">
        <div class="px-6 py-8 sm:px-10 sm:py-12">
          <p class="docs-kicker">Open-source GCP docs</p>
          <h1 class="mt-4 max-w-4xl font-serif text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            GCP docs organized by how people actually think.
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Stop forcing beginners through product menus. Start with the kind of help they need: a tutorial, a task guide, an explanation, or a fast reference page.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/docs"
              class="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Start reading
            </NuxtLink>
            <NuxtLink
              to="/docs/learn/ship-your-first-web-app-on-gcp"
              class="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-atlas-400 hover:text-atlas-800"
            >
              Start with the tutorial
            </NuxtLink>
          </div>
        </div>

        <div class="grid gap-px border-t border-white/70 bg-white/70 md:grid-cols-3">
          <div class="bg-white/70 px-6 py-6">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-atlas-100 text-atlas-800">
              <Icon name="lucide:compass" class="text-xl" />
            </div>
            <h2 class="mt-4 text-lg font-semibold tracking-tight text-slate-950">Choose the right page type</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Great docs stop guessing. They route the reader to the right format first.
            </p>
          </div>
          <div class="bg-white/70 px-6 py-6">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-signal-100 text-signal-800">
              <Icon name="lucide:route" class="text-xl" />
            </div>
            <h2 class="mt-4 text-lg font-semibold tracking-tight text-slate-950">Teach with one path</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Tutorials should be journeys, not catalogs of services or options.
            </p>
          </div>
          <div class="bg-white/70 px-6 py-6">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-800">
              <Icon name="lucide:messages-square" class="text-xl" />
            </div>
            <h2 class="mt-4 text-lg font-semibold tracking-tight text-slate-950">Explain before you optimize</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              The hard part of GCP is usually the mental model, not the command syntax.
            </p>
          </div>
        </div>
      </div>

      <aside class="surface-panel p-6 sm:p-7">
        <p class="docs-kicker">Web app path</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-tight text-slate-950">Start here if you are shipping</h2>
        <ul class="mt-6 space-y-3">
          <li
            v-for="step in guidedPath"
            :key="step.path"
          >
            <NuxtLink
              :to="step.path"
              class="flex items-center justify-between rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-atlas-300 hover:bg-atlas-50 hover:text-slate-950"
            >
              <span>{{ step.page?.title }}</span>
              <Icon name="lucide:arrow-up-right" class="text-base" />
            </NuxtLink>
          </li>
        </ul>
      </aside>
    </section>

    <section class="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
      <NuxtLink
        v-for="mode in modes"
        :key="mode.path"
        :to="mode.path"
        class="docs-mode-card group"
      >
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl" :class="mode.meta.iconClass">
          <Icon :name="mode.meta.icon" class="text-xl" />
        </div>
        <div class="mt-5 flex flex-wrap items-center gap-3">
          <span class="docs-chip text-xs" :class="mode.meta.badgeClass">{{ mode.meta.label }}</span>
        </div>
        <h2 class="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{{ mode.title }}</h2>
        <p class="mt-3 text-sm leading-6 text-slate-600">{{ mode.page?.description || mode.summary }}</p>
        <div class="mt-5 flex items-center gap-2 text-sm font-semibold text-atlas-700">
          Open this mode
          <Icon name="lucide:arrow-right" class="text-base transition group-hover:translate-x-1" />
        </div>
      </NuxtLink>
    </section>

    <section class="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div class="surface-panel px-6 py-8 sm:px-8">
        <p class="docs-kicker">Why this structure works</p>
        <h2 class="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          GCP stops feeling mysterious when the docs stop mixing jobs.
        </h2>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <div class="docs-note-card">
            <p class="font-semibold text-slate-950">Tutorials</p>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Teach one path from start to finish. They are not the place for exhaustive options.
            </p>
          </div>
          <div class="docs-note-card">
            <p class="font-semibold text-slate-950">How-to guides</p>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Solve one task fast. They assume you know the goal and need the execution steps.
            </p>
          </div>
          <div class="docs-note-card">
            <p class="font-semibold text-slate-950">Explanations</p>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Build the mental model. This is where IAM, projects, and service boundaries become clear.
            </p>
          </div>
          <div class="docs-note-card">
            <p class="font-semibold text-slate-950">Reference</p>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Give short, exact answers. Use these pages when the concept is already familiar.
            </p>
          </div>
        </div>
      </div>

      <aside class="surface-panel p-6 sm:p-7">
        <p class="docs-kicker">Common entry points</p>
        <h2 class="mt-3 text-2xl font-semibold tracking-tight text-slate-950">Useful right now</h2>
        <ul class="mt-6 space-y-3">
          <li v-for="task in commonTasks" :key="task?.path">
            <NuxtLink
              :to="task?.path"
              class="flex items-center justify-between rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-atlas-300 hover:bg-atlas-50 hover:text-slate-950"
            >
              <span>{{ task?.title }}</span>
              <Icon name="lucide:arrow-up-right" class="text-base" />
            </NuxtLink>
          </li>
        </ul>
      </aside>
    </section>
  </div>
</template>
