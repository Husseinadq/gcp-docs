<script setup lang="ts">
const currentPath = '/docs'

const [{ data: page }, { data: navigation }] = await Promise.all([
  useAsyncData('docs-home', () => queryCollection('docs').path(currentPath).first()),
  useAsyncData('docs-navigation', () => queryCollectionNavigation('docs'))
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
        <span class="rounded-full bg-atlas-100 px-3 py-1.5 font-medium text-atlas-900">Overview</span>
        <span
          v-if="page.estimatedTime"
          class="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700"
        >
          {{ page.estimatedTime }}
        </span>
      </div>

      <div class="docs-prose">
        <ContentRenderer :value="page" />
      </div>
    </article>
  </DocsFrame>
</template>
