<template>
  <div
    class="field"
    :data-type="type"
  >
    <input
      :id="fieldId"
      :type="type"
      :placeholder="fieldPlaceholder"
      :name="name"
      :checked="checked"
      :value="value"
      @input="updateValue($event.target.value)"
    >
    <label :for="fieldId">
      {{ fieldLabel }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import '@/assets/scss/Field.scss'
import {defineProps, defineEmits } from 'vue'

interface FieldProps {
  type: string,
  name: string,
  fieldLabel: string,
  fieldId: string, 
  checked?: Boolean,
  fieldPlaceholder?: string,
  value: string | object | number
}

const emit = defineEmits(['updateValue'])

const updateValue = (val) => {
  emit('updateValue', val)
}

defineProps<FieldProps>()

</script>
