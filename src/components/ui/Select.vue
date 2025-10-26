<template>
  <div :class="containerClassName">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <select
      :id="id"
      :name="name"
      :value="modelValue"
      :class="selectClasses"
      :disabled="disabled"
      :required="required"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="mt-1 text-sm text-danger-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string;
  label: string;
}

interface Props {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  containerClassName?: string;
  disabled?: boolean;
  required?: boolean;
  options: Option[];
  modelValue: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  name: '',
  label: '',
  error: '',
  containerClassName: '',
  disabled: false,
  required: false
});

defineEmits<{
  'update:modelValue': [value: string];
}>();

const selectClasses = `input-field ${props.error ? 'border-danger-500 focus:ring-danger-500' : ''}`;
</script>

<script lang="ts">
export default {
  inheritAttrs: false
};
</script>

