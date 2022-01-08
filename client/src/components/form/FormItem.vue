<template>
  <label :for="id" class="form-label">
    <span v-if="isRequired" class="text-danger" aria-required="true">* </span>{{ label }}
  </label>
  <input :type="type" class="form-control" :class="validClass" :id="id" :name="id" 
    :value="modelValue" @input="onInput" @blur="onBlur" />
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    modelValue: [String, Number],
    type: String,
    validClass: String,
    isRequired: Boolean
  },
  methods: {
    onInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    onBlur(e) {
      if (this.isRequired) {
        const classVal = !this.modelValue ? "is-invalid" : "";
        this.$emit("update:validClass", classVal);
      }
    }
  }
}
</script>

<style>

</style>