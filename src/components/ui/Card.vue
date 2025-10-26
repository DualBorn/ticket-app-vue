<template>
  <div :class="[baseClasses, hoverClasses, props.className]">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  className?: string;
  hover?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  hover: false
});

const baseClasses = 'card';
const hoverClasses = props.hover ? 'hover:shadow-xl transition-shadow duration-300' : '';
</script>

