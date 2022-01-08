<template>
  <button class="btn btn-danger" aria-label="Delete" @click="deleteHandler">
    <em class="bi bi-trash"></em>
  </button>
</template>

<script>
export default {
  props: {
    id: String
  },
  methods: {
    deleteHandler() {
      if (this.id !== undefined) {
        this.$store.dispatch("deleteGame", this.id);
      }
    }
  }
}
</script>