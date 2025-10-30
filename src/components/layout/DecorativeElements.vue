<template>
  <div :class="props.className">
    <!-- Decorative Circles - Hidden on mobile, visible on larger screens -->
    <div class="hidden sm:block absolute top-20 left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-primary-200 rounded-full opacity-60 float" aria-hidden="true"></div>
    <div class="hidden sm:block absolute top-40 right-20 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-warning-200 rounded-full opacity-50 float" style="animation-delay: 1s" aria-hidden="true"></div>
    <div class="hidden md:block absolute bottom-40 left-1/4 w-8 h-8 md:w-12 md:h-12 bg-success-200 rounded-full opacity-40 float" style="animation-delay: 2s" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  className: ''
});
</script>

