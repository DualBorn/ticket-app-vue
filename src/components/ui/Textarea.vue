<template>
  <div :class="containerClassName">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <textarea
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :value="modelValue"
      :rows="rows"
      :class="textareaClasses"
      :disabled="disabled"
      :required="required"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <p v-if="error" class="mt-1 text-sm text-danger-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  containerClassName?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  modelValue: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  name: '',
  label: '',
  placeholder: '',
  error: '',
  containerClassName: '',
  disabled: false,
  required: false,
  rows: 3
});

defineEmits<{
  'update:modelValue': [value: string];
}>();

const textareaClasses = `input-field ${props.error ? 'border-danger-500 focus:ring-danger-500' : ''}`;
</script>

<script lang="ts">
export default {
  inheritAttrs: false
};
</script>

