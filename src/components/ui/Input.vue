<template>
  <div :class="containerClassName">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
      :id="id"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :class="inputClasses"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="error" class="mt-1 text-sm text-danger-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  containerClassName?: string;
  disabled?: boolean;
  required?: boolean;
  autocomplete?: string;
  modelValue: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  name: '',
  type: 'text',
  label: '',
  placeholder: '',
  error: '',
  containerClassName: '',
  disabled: false,
  required: false,
  autocomplete: 'off'
});

defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputClasses = `input-field ${props.error ? 'border-danger-500 focus:ring-danger-500' : ''}`;
</script>

<script lang="ts">
export default {
  inheritAttrs: false
};
</script>

