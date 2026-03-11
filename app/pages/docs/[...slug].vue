<script setup lang="ts">
import { allServices, getDocTypeMeta } from '~/utils/docs'

type CatalogEntry = {
  path: string
  title: string
  description?: string | null
  category?: string | null
  order?: number | null
}

const route = useRoute()
const currentPath = computed(() => route.path.replace(/\/$/, '') || '/docs')
const serviceSectionOrder = new Map([
  ['Get started', 0],
  ['Guides', 1],
  ['Concepts', 2],
  ['Operate', 3],
  ['Reference', 4]
])

function sortServiceDocs(left: CatalogEntry, right: CatalogEntry) {
  const leftSection = serviceSectionOrder.get(left.category || '') ?? Number.MAX_SAFE_INTEGER
  const rightSection = serviceSectionOrder.get(right.category || '') ?? Number.MAX_SAFE_INTEGER

  if (leftSection !== rightSection) {
    return leftSection - rightSection
  }

  if ((left.order ?? 999) !== (right.order ?? 999)) {
    return (left.order ?? 999) - (right.order ?? 999)
  }

  return left.title.localeCompare(right.title)
}

const [{ data: page }, { data: navigation }, { data: surroundings }, { data: catalog }] = await Promise.all([
  useAsyncData(
    `docs-page:${currentPath.value}`,
    () => queryCollection('docs').path(currentPath.value).first()
  ),
  useAsyncData('docs-navigation', () => queryCollectionNavigation('docs', ['order'])),
  useAsyncData(
    `docs-surround:${currentPath.value}`,
    () => queryCollectionItemSurroundings('docs', currentPath.value, { fields: ['description'] })
  ),
  useAsyncData(
    'docs-catalog',
    () => queryCollection('docs').select('path', 'title', 'description', 'category', 'order').all()
  )
])

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Document not found'
  })
}

const catalogEntries = computed(() => (catalog.value ?? []) as CatalogEntry[])
const activeService = computed(() =>
  allServices.find((service) => currentPath.value === service.path || currentPath.value.startsWith(`${service.path}/`)) ?? null
)
const servicePages = computed(() => {
  if (!activeService.value) {
    return []
  }

  return catalogEntries.value
    .filter((entry) => entry.path.startsWith(`${activeService.value!.path}/`) && entry.path !== activeService.value!.path)
    .sort(sortServiceDocs)
})
const serviceSequence = computed(() => {
  if (!activeService.value) {
    return []
  }

  const overview =
    catalogEntries.value.find((entry) => entry.path === activeService.value!.path) ??
    {
      path: activeService.value.path,
      title: activeService.value.title,
      description: activeService.value.description
    }

  return [overview, ...servicePages.value]
})
const previous = computed(() => {
  if (!activeService.value) {
    return surroundings.value?.[0] ?? null
  }

  const currentIndex = serviceSequence.value.findIndex((entry) => entry.path === currentPath.value)

  return currentIndex > 0 ? serviceSequence.value[currentIndex - 1] : null
})
const next = computed(() => {
  if (!activeService.value) {
    return surroundings.value?.[1] ?? null
  }

  const currentIndex = serviceSequence.value.findIndex((entry) => entry.path === currentPath.value)

  return currentIndex >= 0 && currentIndex < serviceSequence.value.length - 1
    ? serviceSequence.value[currentIndex + 1]
    : null
})
const typeMeta = computed(() => getDocTypeMeta(page.value?.docType))
const relatedDocs = computed(() => {
  const docsByPath = new Map(catalogEntries.value.map((entry) => [entry.path, entry]))

  return (page.value?.related ?? [])
    .map((path) => docsByPath.get(path))
    .filter(Boolean)
})

useSeoMeta({
  title: `${page.value.title}`,
  description: page.value.description
})
</script>

<template>
  <DocsFrame
    :title="page.title"
    :description="page.description"
    :eyebrow="typeMeta.kicker"
    :current-path="currentPath"
    :navigation="navigation ?? []"
    :toc-links="page.body?.toc?.links ?? []"
    :service="activeService"
    :service-pages="servicePages"
  >
    <article class="surface-panel p-6 sm:p-8">
      <div class="mb-8 flex flex-wrap gap-3 text-sm">
        <span class="docs-chip" :class="typeMeta.badgeClass">
          {{ typeMeta.label }}
        </span>
        <span
          v-if="page.difficulty"
          class="docs-chip bg-signal-100 text-signal-800"
        >
          {{ page.difficulty }}
        </span>
        <span
          v-if="page.estimatedTime"
          class="docs-chip bg-slate-100 text-slate-700"
        >
          {{ page.estimatedTime }}
        </span>
        <span
          v-if="page.lastReviewed"
          class="docs-chip bg-slate-100 text-slate-700"
        >
          Reviewed {{ page.lastReviewed }}
        </span>
      </div>

      <div class="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div class="docs-note-card" :class="typeMeta.panelClass">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Use this page when</p>
          <p class="mt-3 text-base leading-7 text-slate-700">
            {{ page.goal || typeMeta.description }}
          </p>

          <div
            v-if="page.bestFor?.length"
            class="mt-5 flex flex-wrap gap-2"
          >
            <span
              v-for="item in page.bestFor"
              :key="item"
              class="docs-chip bg-white/80 text-slate-700"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <div
          v-if="page.prerequisites?.length"
          class="docs-note-card"
        >
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Before you start</p>
          <ul class="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li
              v-for="item in page.prerequisites"
              :key="item"
              class="flex gap-2"
            >
              <span class="mt-2 h-2 w-2 rounded-full bg-atlas-500" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="docs-prose">
        <ContentRenderer :value="page" />
      </div>

      <section
        v-if="relatedDocs.length"
        class="mt-12 border-t border-slate-200 pt-8"
      >
        <p class="docs-kicker">Read next</p>
        <div class="mt-4 grid gap-4 md:grid-cols-2">
          <NuxtLink
            v-for="doc in relatedDocs"
            :key="doc?.path"
            :to="doc?.path"
            class="docs-note-card transition hover:-translate-y-0.5"
          >
            <p class="text-lg font-semibold tracking-tight text-slate-950">{{ doc?.title }}</p>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ doc?.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <DocsPager :previous="previous" :next="next" />
    </article>
  </DocsFrame>
</template>
