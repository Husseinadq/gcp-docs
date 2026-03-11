<template>
  <header class="sticky top-0 z-40 border-b border-white/70 bg-stone-50/80 backdrop-blur-xl">
    <div class="mx-auto flex max-w-[92rem] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="group flex items-center gap-3">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-2xl border border-atlas-200 bg-atlas-100 text-atlas-800 shadow-[0_18px_40px_-28px_rgba(51,117,98,0.7)] transition group-hover:-translate-y-0.5"
        >
          <Icon name="lucide:cloud" class="text-xl" />
        </div>

        <div>
          <p class="font-serif text-lg font-semibold tracking-tight text-slate-950">GCP Atlas</p>
          <p class="text-xs uppercase tracking-[0.22em] text-slate-500">Open-source field guide</p>
        </div>
      </NuxtLink>

      <nav class="flex items-center gap-2 sm:gap-3">
        <NuxtLink
          to="/"
          class="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-950"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/docs"
          class="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Read the docs
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
