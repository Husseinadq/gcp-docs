<script setup lang="ts">
const route = useRoute()
const currentPath = computed(() => route.path.replace(/\/$/, '') || '/docs')

const [{ data: page }, { data: navigation }, { data: surroundings }] = await Promise.all([
  useAsyncData(
    `docs-page:${currentPath.value}`,
    () => queryCollection('docs').path(currentPath.value).first()
  ),
  useAsyncData('docs-navigation', () => queryCollectionNavigation('docs')),
  useAsyncData(
    `docs-surround:${currentPath.value}`,
    () => queryCollectionItemSurroundings('docs', currentPath.value, { fields: ['description'] })
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

useSeoMeta({
  title: `${page.value.title}`,
  description: page.value.description
})
</script>

<template>
  <DocsFrame
    :title="page.title"
    :description="page.description"
    :current-path="currentPath"
    :navigation="navigation ?? []"
    :toc-links="page.body?.toc?.links ?? []"
  >
    <article class="surface-panel p-6 sm:p-8">
      <div class="mb-8 flex flex-wrap gap-3 text-sm">
        <span
          v-if="page.category"
          class="rounded-full bg-atlas-100 px-3 py-1.5 font-medium text-atlas-900"
        >
          {{ page.category }}
        </span>
        <span
          v-if="page.difficulty"
          class="rounded-full bg-signal-100 px-3 py-1.5 font-medium text-signal-800"
        >
          {{ page.difficulty }}
        </span>
        <span
          v-if="page.estimatedTime"
          class="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700"
        >
          {{ page.estimatedTime }}
        </span>
        <span
          v-if="page.lastReviewed"
          class="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700"
        >
          Reviewed {{ page.lastReviewed }}
        </span>
      </div>

      <div class="docs-prose">
        <ContentRenderer :value="page" />
      </div>

      <DocsPager :previous="previous" :next="next" />
    </article>
  </DocsFrame>
</template>
