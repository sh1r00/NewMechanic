<script setup lang="ts">
const { t } = useI18n()

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

const logger = useLogger({ tag: 'ContactForm' })
const loadingStore = useLoadingStore()
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

async function handleSubmit() {
  if (!isValid.value) return

  await loadingStore.withLoading(async () => {
    logger.info('Service request submitted', {
      name: form.value.fullName,
      vehicle: form.value.vehicleMakeModel,
      contactPreference: form.value.contactPreference,
    })
    // Simulate network request (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1000))
    isSubmitted.value = true
  })
}

function resetForm() {
  logger.debug('Form reset')
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
  <div class="bg-surface-container rounded-xl border border-outline-variant p-6 shadow-elevation-3 w-full max-w-md">
    <!-- Success state - ARIA live region announces submission result to screen readers -->
    <div v-if="isSubmitted" aria-live="polite" aria-atomic="true">
      <div class="text-center py-8" role="status">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <svg class="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="font-display text-2xl text-on-surface mb-2">{{ $t('contact.form.successHeading') }}</h3>
        <p class="font-body text-on-surface-variant text-sm mb-6">{{ $t('contact.form.successDescription') }}</p>
        <button
          type="button"
          class="font-body text-sm text-primary hover:text-inverse-primary transition-colors"
          @click="resetForm"
        >
          {{ $t('contact.form.submitAnother') }}
        </button>
      </div>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-4">
      <h3 class="font-display text-2xl text-on-surface mb-1">{{ $t('contact.form.heading') }}</h3>
      <p class="font-body text-on-surface-variant text-sm mb-4">{{ $t('contact.form.description') }}</p>

      <!-- Full Name -->
      <div>
        <label for="fullName" class="block font-body text-sm font-medium text-on-surface mb-1">{{ $t('contact.form.fullName') }} *</label>
        <input
          id="fullName"
          v-model="form.fullName"
          type="text"
          required
          aria-required="true"
          aria-describedby="fullName-error"
          class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-background text-on-background font-body text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        <span id="fullName-error" class="text-xs text-red-500 mt-1 block" aria-live="polite"></span>
      </div>

      <!-- Vehicle Make & Model -->
      <div>
        <label for="vehicleMakeModel" class="block font-body text-sm font-medium text-on-surface mb-1">{{ $t('contact.form.vehicleMakeModel') }} *</label>
        <input
          id="vehicleMakeModel"
          v-model="form.vehicleMakeModel"
          type="text"
          required
          aria-required="true"
          aria-describedby="vehicleMakeModel-error"
          class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-background text-on-background font-body text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        <span id="vehicleMakeModel-error" class="text-xs text-red-500 mt-1 block" aria-live="polite"></span>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block font-body text-sm font-medium text-on-surface mb-1">{{ $t('contact.form.email') }} *</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          :required="form.contactPreference === 'email'"
          :aria-required="form.contactPreference === 'email' ? 'true' : undefined"
          aria-describedby="email-error"
          class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-background text-on-background font-body text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        <span id="email-error" class="text-xs text-red-500 mt-1 block" aria-live="polite"></span>
      </div>

      <!-- Phone -->
      <div>
        <label for="phone" class="block font-body text-sm font-medium text-on-surface mb-1">{{ $t('contact.form.phone') }} *</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          :required="form.contactPreference === 'phone'"
          :aria-required="form.contactPreference === 'phone' ? 'true' : undefined"
          aria-describedby="phone-error"
          class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-background text-on-background font-body text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        <span id="phone-error" class="text-xs text-red-500 mt-1 block" aria-live="polite"></span>
      </div>

      <!-- Contact Preference -->
      <div>
        <label for="contactPreference" class="block font-body text-sm font-medium text-on-surface mb-1">{{ $t('contact.form.contactPreference') }}</label>
        <select
          id="contactPreference"
          v-model="form.contactPreference"
          class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-background text-on-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        >
          <option value="email">{{ $t('contact.form.emailOption') }}</option>
          <option value="phone">{{ $t('contact.form.phoneOption') }}</option>
        </select>
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block font-body text-sm font-medium text-on-surface mb-1">{{ $t('contact.form.problemDescription') }} *</label>
        <textarea
          id="description"
          v-model="form.description"
          required
          aria-required="true"
          aria-describedby="description-error"
          rows="4"
          :placeholder="$t('contact.form.problemPlaceholder')"
          class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-background text-on-background font-body text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
        ></textarea>
        <span id="description-error" class="text-xs text-red-500 mt-1 block" aria-live="polite"></span>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="!isValid"
        class="w-full py-3 bg-primary text-on-primary font-body font-semibold rounded-lg transition-all duration-200 hover:bg-inverse-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-container disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ $t('contact.form.submit') }}
      </button>
    </form>
  </div>
</template>
