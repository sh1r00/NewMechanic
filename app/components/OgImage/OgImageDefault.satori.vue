<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  siteName?: string
}>()
</script>

<template>
  <div
    :style="{
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '80px',
      backgroundColor: '#0f0f0f',
      fontFamily: 'Bebas Neue, sans-serif',
    }"
  >
    <!-- Amber accent bar -->
    <div :style="{ width: '80px', height: '6px', backgroundColor: '#d97706', marginBottom: '32px' }" />
    <!-- Title -->
    <div :style="{ fontSize: '64px', color: '#f5f0eb', letterSpacing: '2px', marginBottom: '16px' }">
      {{ title || 'Elias | Mechanic Portfolio' }}
    </div>
    <!-- Description -->
    <div :style="{ fontSize: '28px', color: '#a8a29e', fontFamily: 'DM Sans, sans-serif', maxWidth: '900px' }">
      {{ description || 'Professional mechanic portfolio' }}
    </div>
    <!-- Bottom accent -->
    <div :style="{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: '8px', backgroundColor: '#d97706' }" />
  </div>
</template>
