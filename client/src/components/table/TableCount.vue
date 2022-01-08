<template>
  Showing {{ startCount }}
  to {{ endCount }}
  of {{ games.length }}
</template>

<script>
export default {
  props: {
    pageIndex: Number,
    itemsPerPage: Number
  },
  data() {
    return {
      startCount: 0,
      endCount: 0
    }
  },
  computed: {
    games() {
      return this.$store.state.gameState.games;
    }
  },
  watch: {
    games() {
      this.calculateStartAndEnd();
    },
    pageIndex() {
      this.calculateStartAndEnd();
    }
  },
  methods: {
    calculateStartAndEnd() {
      this.startCount = (this.pageIndex * this.itemsPerPage) + (this.games.length > 0 ? 1 : 0);
      this.endCount = Math.min(this.games.length, (this.pageIndex + 1) * this.itemsPerPage);
    }
  }
}
</script>