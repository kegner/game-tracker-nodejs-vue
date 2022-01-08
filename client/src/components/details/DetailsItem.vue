<template>
  <strong>{{ label }}</strong><br />
  <span>{{ formattedValue }}</span>
</template>

<script>
export default {
  props: {
    label: String,
    value: [String, Number],
    currency: Boolean,
    date: Boolean
  },
  data() {
    return {
      formattedValue: this.format(this.value)
    }
  },
  watch: {
    value(val) {
      this.formattedValue = this.format(val);
    }
  },
  methods: {
    format(val) {
      let value;
      const formatter = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      });

      value = val;
      if (this.currency && val) {
        value = formatter.format(val);
      } else if (this.date && val) {
        value = new Date(this.value).toISOString().split("T")[0];
      }
      return value;
    }
  }
}
</script>