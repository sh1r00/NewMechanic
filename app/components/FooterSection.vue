<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer aria-label="Site footer" class="bg-bg-primary border-t border-border py-8 px-6">
    <!-- Section divider: thin gradient accent line -->
    <div
      class="mx-auto max-w-6xl mb-6 h-px"
      style="background: linear-gradient(to right, transparent, var(--color-accent), transparent);"
    ></div>

    <div class="max-w-6xl mx-auto text-center">
      <p class="font-body text-text-secondary text-sm">
        {{ $t('footer.copyright', { year: currentYear }) }}
      </p>
    </div>
  </footer>
</template>
