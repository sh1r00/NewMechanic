<script setup lang="ts">
import { ref, computed } from 'vue'

defineEmits<{
  (e: 'close'): void
}>()

const form = ref({
  fullName: '',
  vehicleMakeModel: '',
  email: '',
  phone: '',
  contactPreference: 'email',
  description: '',
})

const isSubmitted = ref(false)

const isValid = computed(() => {
  return (
    form.value.fullName.trim() !== '' &&
    form.value.vehicleMakeModel.trim() !== '' &&
    form.value.description.trim() !== '' &&
    (form.value.contactPreference === 'email'
      ? form.value.email.trim() !== ''
      : form.value.phone.trim() !== '')
  )
})

function handleSubmit() {
  if (!isValid.value) return
  isSubmitted.value = true
  // In a real app, this would send the data to a backend
}

function resetForm() {
  form.value = {
    fullName: '',
    vehicleMakeModel: '',
    email: '',
    phone: '',
    contactPreference: 'email',
    description: '',
  }
  isSubmitted.value = false
}
</script>

<template>
  <div class="bg-surface rounded-xl border border-border p-6 shadow-xl w-full max-w-md">
    <!-- Success state -->
    <div v-if="isSubmitted" class="text-center py-8">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
        <svg class="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="font-display text-2xl text-text-primary mb-2">Request Sent!</h3>
      <p class="font-body text-text-secondary text-sm mb-6">We'll get back to you shortly.</p>
      <button
        type="button"
        class="font-body text-sm text-accent hover:text-accent-hover transition-colors"
        @click="resetForm"
      >
        Submit another request
      </button>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-4">
      <h3 class="font-display text-2xl text-text-primary mb-1">Book a Service</h3>
      <p class="font-body text-text-secondary text-sm mb-4">Tell us about your vehicle issue.</p>

      <!-- Full Name -->
      <div>
        <label for="fullName" class="block font-body text-sm font-medium text-text-primary mb-1">Full Name *</label>
        <input
          id="fullName"
          v-model="form.fullName"
          type="text"
          required
          placeholder="John Doe"
          class="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-text-primary font-body text-sm placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        />
      </div>

      <!-- Vehicle Make & Model -->
      <div>
        <label for="vehicleMakeModel" class="block font-body text-sm font-medium text-text-primary mb-1">Vehicle Make & Model *</label>
        <input
          id="vehicleMakeModel"
          v-model="form.vehicleMakeModel"
          type="text"
          required
          placeholder="2019 Honda Civic"
          class="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-text-primary font-body text-sm placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block font-body text-sm font-medium text-text-primary mb-1">Email *</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          :required="form.contactPreference === 'email'"
          placeholder="you@example.com"
          class="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-text-primary font-body text-sm placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        />
      </div>

      <!-- Phone -->
      <div>
        <label for="phone" class="block font-body text-sm font-medium text-text-primary mb-1">Phone *</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          :required="form.contactPreference === 'phone'"
          placeholder="(555) 123-4567"
          class="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-text-primary font-body text-sm placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        />
      </div>

      <!-- Contact Preference -->
      <div>
        <label for="contactPreference" class="block font-body text-sm font-medium text-text-primary mb-1">Preferred Contact Method</label>
        <select
          id="contactPreference"
          v-model="form.contactPreference"
          class="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-text-primary font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block font-body text-sm font-medium text-text-primary mb-1">Describe the Problem *</label>
        <textarea
          id="description"
          v-model="form.description"
          required
          rows="4"
          placeholder="e.g., My car is making a grinding noise when braking..."
          class="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-text-primary font-body text-sm placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="!isValid"
        class="w-full py-3 bg-accent text-white font-body font-semibold rounded-lg transition-all duration-200 hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Request
      </button>
    </form>
  </div>
</template>
