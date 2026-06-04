<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer aria-label="Site footer" class="bg-background border-t border-outline-variant py-8 px-6">
    <!-- Section divider: thin gradient accent line -->
    <div
      class="mx-auto max-w-6xl mb-6 h-px"
      style="background: linear-gradient(to right, transparent, var(--md-sys-color-primary), transparent);"
    ></div>

    <div class="max-w-6xl mx-auto text-center">
      <p class="font-body text-on-surface-variant text-sm">
        {{ $t('footer.copyright', { year: currentYear }) }}
      </p>
    </div>
  </footer>
</template>
