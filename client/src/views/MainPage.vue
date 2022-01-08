<template>
  <div class="row mb-4">
    <div class="col-12">
      <GameForm />
    </div>
  </div>
  <div class="row mb-4">
    <div class="col-6">
      <GameTable />
    </div>
    <div class="col-6">
      <GameDetails />
    </div>
  </div>
</template>

<script>
import GameForm from '@/components/form/GameForm.vue';
import GameTable from '@/components/table/GameTable.vue';
import GameDetails from '@/components/details/GameDetails.vue';

export default {
  components: {
    GameForm,
    GameTable,
    GameDetails
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.authState.isLoggedIn;
    }
  }
}
</script>
