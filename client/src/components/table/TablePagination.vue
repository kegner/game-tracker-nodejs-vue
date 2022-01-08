<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination my-1">
      <li class="page-item">
        <button class="page-link"
          @click="pageButtonHandler(pageIndex - 1)"
          :disabled="pageIndex === 0 ? true : null"
        >
          Previous
        </button>
      </li>
      <li v-for="(gamesPage, idx) in gamesPages" :key="idx" class="page-item" :class="idx === pageIndex ? 'active' : ''">
        <button class="page-link"
          @click="pageButtonHandler(idx)"
        >
          {{ idx + 1 }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link"
          @click="pageButtonHandler(pageIndex + 1)"
          :disabled="pageIndex === gamesPages.length - 1 ? true : null"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    gamesPages: Array,
    pageIndex: Number
  },
  methods: {
    pageButtonHandler(index) {
      this.$emit("pageChange", index);
    }
  }
}
</script>