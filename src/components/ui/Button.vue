<template>
  <button
    :class="[
      baseClasses,
      variantClasses[props.variant],
      props.disabled ? 'opacity-50 cursor-not-allowed' : '',
      props.className
    ]"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  className: '',
  disabled: false
});

const baseClasses = 'font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

const variantClasses = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
  danger: 'bg-danger-600 hover:bg-danger-700 text-white focus:ring-danger-500'
};
</script>

