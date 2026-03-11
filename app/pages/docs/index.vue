<script setup lang="ts">
import { commonTaskPaths, docsModes, getDocTypeMeta, webAppPath } from '~/utils/docs'

const currentPath = '/docs'

const [{ data: page }, { data: navigation }, { data: catalog }] = await Promise.all([
  useAsyncData('docs-home', () => queryCollection('docs').path(currentPath).first()),
  useAsyncData('docs-navigation', () => queryCollectionNavigation('docs', ['order'])),
  useAsyncData(
    'docs-catalog',
    () => queryCollection('docs').select('path', 'title', 'description', 'docType', 'goal').all()
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

const modeCards = computed(() =>
  docsModes.map((mode) => {
    const entry = pagesByPath.value.get(mode.path)
    const featured = (catalog.value ?? [])
      .filter((doc) => doc.docType === mode.docType && doc.path !== mode.path)
      .slice(0, 2)

    return {
      ...mode,
      meta: getDocTypeMeta(mode.docType),
      description: entry?.description ?? mode.summary,
      featured
    }
  })
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
  <DocsFrame
    :title="page.title"
    :description="page.description"
    eyebrow="Stop guessing which page you need"
    :current-path="currentPath"
    :navigation="navigation ?? []"
    :toc-links="page.body?.toc?.links ?? []"
  >
    <div class="space-y-8">
      <article class="surface-panel p-6 sm:p-8">
        <div class="mb-8 flex flex-wrap gap-3 text-sm">
          <span class="docs-chip bg-atlas-100 text-atlas-900">Overview</span>
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

      <section class="grid gap-5 xl:grid-cols-2">
        <NuxtLink
          v-for="mode in modeCards"
          :key="mode.path"
          :to="mode.path"
          class="docs-mode-card group"
        >
          <div class="flex items-start gap-4">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
              :class="mode.meta.iconClass"
            >
              <Icon :name="mode.meta.icon" class="text-xl" />
            </div>

            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-3">
                <span class="docs-chip text-xs" :class="mode.meta.badgeClass">
                  {{ mode.meta.label }}
                </span>
                <span class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {{ mode.meta.kicker }}
                </span>
              </div>

              <h2 class="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                {{ mode.title }}
              </h2>
              <p class="mt-3 text-sm leading-6 text-slate-600">
                {{ mode.description }}
              </p>
              <p class="mt-3 text-sm leading-6 text-slate-500">
                {{ mode.summary }}
              </p>
            </div>
          </div>

          <div class="mt-6 space-y-3 border-t border-slate-200/80 pt-5">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Start with</p>
            <div
              v-for="doc in mode.featured"
              :key="doc.path"
              class="rounded-2xl border border-slate-200/80 bg-stone-50 px-4 py-3"
            >
              <p class="font-medium text-slate-900">{{ doc.title }}</p>
              <p class="mt-1 text-sm leading-6 text-slate-600">{{ doc.description }}</p>
            </div>
          </div>
        </NuxtLink>
      </section>

      <section class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div class="surface-panel p-6 sm:p-8">
          <p class="docs-kicker">Recommended path</p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Building a web app on GCP?
          </h2>
          <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Follow one path from mental model to execution instead of jumping between product pages too early.
          </p>

          <div class="mt-8 space-y-4">
            <div
              v-for="(step, index) in guidedPath"
              :key="step.path"
              class="docs-note-card flex items-start gap-4"
            >
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                {{ index + 1 }}
              </div>

              <div class="min-w-0">
                <NuxtLink :to="step.path" class="text-lg font-semibold tracking-tight text-slate-950">
                  {{ step.page?.title }}
                </NuxtLink>
                <p class="mt-2 text-sm leading-6 text-slate-600">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <aside class="surface-panel p-6">
          <p class="docs-kicker">Common tasks</p>
          <h2 class="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            Start with these
          </h2>
          <ul class="mt-6 space-y-3">
            <li v-for="task in commonTasks" :key="task?.path">
              <NuxtLink
                :to="task?.path"
                class="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-stone-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-atlas-300 hover:bg-atlas-50 hover:text-slate-950"
              >
                <span>{{ task?.title }}</span>
                <Icon name="lucide:arrow-up-right" class="text-base" />
              </NuxtLink>
            </li>
          </ul>
        </aside>
      </section>
    </div>
  </DocsFrame>
</template>
