<template>
  <div class="card">
    <div class="card-header bg-dark text-white">
      Game Table
    </div>
    <div class="card-body p-0">
      <table class="table table-hover table-sm">
        <caption class="visually-hidden">Game Table</caption>
        <thead>
          <tr>
            <th scope="col" class="text-center">Title</th>
            <th scope="col" class="text-center">Status</th>
            <th scope="col" class="text-center">Rating</th>
            <th scope="col" class="text-center">Delete</th>
          </tr>
        </thead>
        <TableBody :gamesPages="gamesPages" :pageIndex="pageIndex" />
        <TableFooter :gamesPages="gamesPages" :pageIndex="pageIndex" :itemsPerPage="itemsPerPage" 
          @pageChange="setIndex" />
      </table>
    </div>
    <Spinner v-if="loading" />
  </div>
</template>

<script>
import TableBody from '@/components/table/TableBody.vue';
import TableFooter from '@/components/table/TableFooter.vue';
import Spinner from '@/components/layout/Spinner.vue';
import { paginate } from '@/services/paginationService';

export default {
  components: {
    TableBody,
    TableFooter,
    Spinner
  },
  data() {
    return {
      itemsPerPage: 5,
      pageIndex: 0,
      gamesPages: [[]],
      previousCount: 0
    }
  },
  methods: {
    setIndex(index) {
      this.pageIndex = index;
    }
  },
  computed: {
    games() {
      return this.$store.state.gameState.games;
    },
    loading() {
      return this.$store.state.gameState.loading;
    }
  },
  watch: {
    games(val) {
      if (this.previousCount === 0) {
        this.previousCount = val.length;
      } else {
        if (this.previousCount < val.length) { // add a game
          this.pageIndex = Math.floor(Math.max(val.length - 1, 0) / this.itemsPerPage);
        } else if (this.previousCount > val.length) { // delete a game
          this.pageIndex = Math.min(Math.floor(Math.max(val.length - 1, 0) / this.itemsPerPage), this.pageIndex);
        }
        this.previousCount = val.length;
      }
      this.gamesPages = paginate(val, this.itemsPerPage);
    }
  },
  mounted() {
    this.$store.dispatch("fetchGames", this.$store.state.authState.user.id);
  }
}
</script>

<style>

</style>