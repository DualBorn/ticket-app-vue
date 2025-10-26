<template>
  <div :class="props.className">
    <!-- Decorative Circles -->
    <div class="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-60 float" aria-hidden="true"></div>
    <div class="absolute top-40 right-20 w-16 h-16 bg-warning-200 rounded-full opacity-50 float" style="animation-delay: 1s" aria-hidden="true"></div>
    <div class="absolute bottom-40 left-1/4 w-12 h-12 bg-success-200 rounded-full opacity-40 float" style="animation-delay: 2s" aria-hidden="true"></div>
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

