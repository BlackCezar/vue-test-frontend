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
    >
    <label :for="fieldId">
      {{ fieldLabel }}
    </label>
  </div>
</template>

<script>
import '@/assets/scss/Field.scss'

export default {
  name: 'FieldComponent',
  props: {
    type: String,
    name: String,
    fieldLabel: String,
    fieldId: String,
    fieldPlaceholder: String,
    input: String
  }
}
</script>
