<script setup lang="ts">
import { docsModes, featuredServices, getDocTypeMeta, homepageGoalCards } from '~/utils/docs'

const currentPath = '/docs'

const [{ data: page }, { data: navigation }, { data: catalog }] = await Promise.all([
  useAsyncData('docs-home', () => queryCollection('docs').path(currentPath).first()),
  useAsyncData('docs-navigation', () => queryCollectionNavigation('docs', ['order'])),
  useAsyncData(
    'docs-catalog',
    () => queryCollection('docs').select('path', 'title', 'description', 'docType', 'summary').all()
  )
])

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Docs overview not found'
  })
}

useSeoMeta({
  title: `${page.value.title}`,
  description: page.value.description
})

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
</script>

<template>
  <DocsFrame
    :title="page.title"
    :description="page.description"
    eyebrow="Choose a service, then the right depth"
    :current-path="currentPath"
    :navigation="navigation ?? []"
    :toc-links="page.body?.toc?.links ?? []"
  >
    <div class="space-y-8">
      <article class="surface-panel p-6 sm:p-8">
        <div class="mb-8 flex flex-wrap gap-3 text-sm">
          <span class="docs-chip bg-atlas-100 text-atlas-900">Docs directory</span>
          <span
            v-if="page.estimatedTime"
            class="docs-chip bg-slate-100 text-slate-700"
          >
            {{ page.estimatedTime }}
          </span>
        </div>

        <div class="docs-prose">
          <ContentRenderer :value="page" />
        </div>
      </article>

      <section>
        <div class="mb-5">
          <p class="docs-kicker">Featured services</p>
          <h2 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Open the docs by product
          </h2>
        </div>

        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <NuxtLink
            v-for="service in serviceCards"
            :key="service.path"
            :to="service.path"
            class="docs-mode-card group"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Icon :name="service.icon" class="text-xl" />
            </div>
            <p class="mt-5 text-2xl font-semibold tracking-tight text-slate-950">{{ service.title }}</p>
            <p class="mt-3 text-sm leading-6 text-slate-600">
              {{ service.page?.description || service.description }}
            </p>
            <div class="mt-5 flex items-center gap-2 text-sm font-semibold text-atlas-700">
              Open service hub
              <Icon name="lucide:arrow-right" class="text-base transition group-hover:translate-x-1" />
            </div>
          </NuxtLink>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div class="surface-panel p-6 sm:p-8">
          <p class="docs-kicker">Choose by goal</p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Start from the outcome, not the product catalog.
          </h2>
          <div class="mt-6 grid gap-4 md:grid-cols-2">
            <NuxtLink
              v-for="goal in goalCards"
              :key="goal.path"
              :to="goal.path"
              class="docs-note-card transition hover:-translate-y-0.5"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-atlas-100 text-atlas-800">
                <Icon :name="goal.icon" class="text-lg" />
              </div>
              <p class="mt-4 text-lg font-semibold tracking-tight text-slate-950">{{ goal.title }}</p>
              <p class="mt-2 text-sm leading-6 text-slate-600">{{ goal.description }}</p>
            </NuxtLink>
          </div>
        </div>

        <aside class="surface-panel p-6">
          <p class="docs-kicker">Docs modes</p>
          <h2 class="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            After the hub
          </h2>
          <div class="mt-5 space-y-3">
            <NuxtLink
              v-for="mode in modeCards"
              :key="mode.path"
              :to="mode.path"
              class="block rounded-2xl border border-slate-200/80 bg-stone-50 px-4 py-3 transition hover:border-atlas-300 hover:bg-atlas-50"
            >
              <div class="flex items-center gap-3">
                <span class="docs-chip text-xs" :class="mode.meta.badgeClass">{{ mode.meta.label }}</span>
                <p class="text-sm font-medium text-slate-900">{{ mode.title }}</p>
              </div>
              <p class="mt-2 text-sm leading-6 text-slate-600">{{ mode.page?.description || mode.summary }}</p>
            </NuxtLink>
          </div>
        </aside>
      </section>
    </div>
  </DocsFrame>
</template>
