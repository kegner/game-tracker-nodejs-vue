<template>
  <tbody>
    <tr v-for="game in gamesPages[pageIndex]" :key="game.id" :class="selectedGame.id === game.id ? 'table-active' : ''" 
        @click="rowClickHandler(game)">
      <td class="text-center">{{ game.title }}</td>
      <td class="text-center">{{ game.status }}</td>
      <td class="text-center">{{ game.rating }}</td>
      <td class="text-center"><DeleteButton :id="game.id" /></td>
      <td class="text-center"></td>
    </tr>
  </tbody>
</template>

<script>
import DeleteButton from '@/components/table/DeleteButton.vue';

export default {
  components: {
    DeleteButton
  },
  props: {
    gamesPages: Array,
    pageIndex: Number
  },
  computed: {
    selectedGame() {
      return this.$store.state.gameState.selectedGame;
    }
  },
  methods: {
    rowClickHandler(game) {
      this.$store.dispatch("selectGame", game);
    }
  }
}
</script>

<style>

</style>