<template>
  <div class="relative min-h-screen overflow-x-clip">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top_left,rgba(79,151,127,0.2),transparent_42%),radial-gradient(circle_at_top_right,rgba(245,125,15,0.16),transparent_28%),linear-gradient(180deg,#fffdf8_0%,#f8fafc_42%,#f8fafc_100%)]"
    />

    <SiteHeader />

    <main>
      <slot />
    </main>
  </div>
</template>
