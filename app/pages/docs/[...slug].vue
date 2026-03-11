<script setup lang="ts">
import { getDocTypeMeta } from '~/utils/docs'

const route = useRoute()
const currentPath = computed(() => route.path.replace(/\/$/, '') || '/docs')

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
    () => queryCollection('docs').select('path', 'title', 'description').all()
  )
])

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Document not found'
  })
}

const previous = computed(() => surroundings.value?.[0] ?? null)
const next = computed(() => surroundings.value?.[1] ?? null)
const typeMeta = computed(() => getDocTypeMeta(page.value?.docType))
const relatedDocs = computed(() => {
  const docsByPath = new Map((catalog.value ?? []).map((entry) => [entry.path, entry]))

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
