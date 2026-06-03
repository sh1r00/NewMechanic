<script setup lang="ts">
const { t } = useI18n()
const { personal } = portfolioData
const photoError = ref(false)
const isModalOpen = ref(false)

function onPhotoError() {
  photoError.value = true
}

function openModal() {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  isModalOpen.value = false
  document.body.style.overflow = ''
}
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center overflow-hidden pt-20 bg-bg-primary"
  >
    <!-- Geometric SVG background pattern -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]" aria-hidden="true">
      <svg
        class="absolute top-10 left-10 w-64 h-64 text-text-primary"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        stroke-width="0.5"
      >
        <polygon points="50,3 94,25 94,75 50,97 6,75 6,25" />
        <polygon points="50,15 82,32 82,68 50,85 18,68 18,32" />
      </svg>
      <svg
        class="absolute bottom-20 right-20 w-48 h-48 text-text-primary"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        stroke-width="0.5"
      >
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="20" />
        <line x1="50" y1="5" x2="50" y2="95" />
        <line x1="5" y1="50" x2="95" y2="50" />
      </svg>
      <svg
        class="absolute top-1/3 right-1/4 w-32 h-32 text-text-primary"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        stroke-width="0.5"
      >
        <polygon points="50,3 94,25 94,75 50,97 6,75 6,25" />
      </svg>
      <svg
        class="absolute bottom-1/4 left-1/3 w-40 h-40 text-text-primary"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        stroke-width="0.5"
      >
        <circle cx="50" cy="50" r="45" />
        <path d="M50 5 L61 38 L97 38 L68 59 L79 93 L50 72 L21 93 L32 59 L3 38 L39 38 Z" />
      </svg>
    </div>

    <!-- Diagonal gradient mesh -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: linear-gradient(135deg, transparent 0%, rgba(217, 119, 6, 0.03) 25%, transparent 50%, rgba(217, 119, 6, 0.02) 75%, transparent 100%)"
    ></div>

    <!-- Content -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
      <div class="flex flex-col lg:flex-row items-center lg:items-center gap-10">
        <!-- Photo (shows above text on mobile) -->
        <div class="lg:hidden mb-4 hero-animate hero-animate-photo">
          <div v-if="!photoError" class="relative">
            <img
              :src="personal.photoUrl"
              :alt="`Photo of ${personal.name}`"
              class="w-36 h-36 object-cover rounded-lg shadow-xl border-2 border-accent rotate-2"
              width="144"
              height="144"
              @error="onPhotoError"
            />
          </div>
          <div
            v-else
            class="w-36 h-36 rounded-lg shadow-xl border-2 border-accent rotate-2 bg-bg-secondary flex items-center justify-center"
          >
            <span class="font-display text-5xl text-accent">{{ personal.name.charAt(0) }}</span>
          </div>
        </div>

        <!-- Text block (left side on desktop) -->
        <div class="w-full lg:w-[55%] text-center lg:text-left">
          <h1 class="font-display text-6xl sm:text-7xl lg:text-8xl text-text-primary leading-none hero-animate hero-animate-name">
            {{ $t('hero.title') }}
          </h1>
          <p class="font-display text-4xl sm:text-5xl lg:text-6xl text-accent mt-2 hero-animate hero-animate-title">
            {{ $t('hero.subtitle') }}
          </p>
          <p class="font-body text-lg sm:text-xl text-text-secondary mt-4 max-w-lg mx-auto lg:mx-0 hero-animate hero-animate-tagline">
            {{ $t('hero.tagline', { years: personal.yearsExperience }) }}
          </p>

          <!-- Mobile CTA button (opens modal) -->
          <div class="mt-8 hero-animate hero-animate-cta lg:hidden">
            <button
              type="button"
              class="inline-block px-8 py-3 bg-accent text-white font-body font-semibold rounded-lg transition-all duration-200 hover:bg-accent-hover hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary"
              @click="openModal"
            >
              {{ $t('hero.cta') }}
            </button>
          </div>

          <!-- Desktop: secondary CTA link -->
          <div class="mt-8 hero-animate hero-animate-cta hidden lg:block">
            <a
              href="#contact"
              class="inline-block px-6 py-2 border-2 border-accent text-accent font-body font-semibold rounded-lg transition-all duration-200 hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary"
            >
              {{ $t('hero.ctaDesktop') }}
            </a>
          </div>
        </div>

        <!-- Desktop: Contact Form (right side) -->
        <div class="hidden lg:flex lg:w-[45%] justify-center hero-animate hero-animate-photo">
          <ContactForm />
        </div>
      </div>
    </div>

    <!-- Mobile Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isModalOpen"
          role="dialog"
          aria-modal="true"
          :aria-label="$t('contact.form.heading')"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          @click.self="closeModal"
          @keydown.escape="closeModal"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" @click="closeModal"></div>

          <!-- Modal content -->
          <div class="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <!-- Close button -->
            <button
              type="button"
              class="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-bg-secondary/80 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close form"
              @click="closeModal"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <ContactForm @close="closeModal" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
/* Staggered entrance animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.hero-animate {
  opacity: 0;
  animation-fill-mode: forwards;
  animation-duration: 0.6s;
  animation-timing-function: ease-out;
}

.hero-animate-name {
  animation-name: slideUp;
  animation-delay: 0ms;
}

.hero-animate-title {
  animation-name: fadeIn;
  animation-delay: 200ms;
}

.hero-animate-tagline {
  animation-name: fadeIn;
  animation-delay: 400ms;
}

.hero-animate-cta {
  animation-name: fadeIn;
  animation-delay: 600ms;
}

.hero-animate-photo {
  animation-name: fadeIn;
  animation-delay: 300ms;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Reduced motion: make hero elements visible immediately, skip entrance animations */
@media (prefers-reduced-motion: reduce) {
  .hero-animate {
    opacity: 1;
    animation: none;
  }

  .modal-enter-active,
  .modal-leave-active {
    transition-duration: 0.01ms !important;
  }
}
</style>
