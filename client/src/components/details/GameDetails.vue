<template>
  <div class="card">
    <div class="card-header bg-dark text-white">
      Game Details
    </div>
    <div class="card-body">
      <div class="row mb-3">
        <div class="col-3">
          <DetailsItem label="Title" :value="selectedGame.title" />
        </div>
        <div class="col-3">
          <DetailsItem label="Platform" :value="selectedGame.platform" />
        </div>
        <div class="col-3">
          <DetailsItem label="Start Date" :value="selectedGame.startDate" :date="true" />
        </div>
        <div class="col-3">
          <DetailsItem label="End Date" :value="selectedGame.endDate" :date="true" />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-3">
          <DetailsItem label="Status" :value="selectedGame.status" />
        </div>
        <div class="col-3">
          <DetailsItem label="Hours to Complete" :value="selectedGame.hoursToComplete" />
        </div>
        <div class="col-3">
          <DetailsItem label="Rating" :value="selectedGame.rating" />
        </div>
        <div class="col-3">
          <DetailsItem label="Price" :value="selectedGame.price" :currency="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailsItem from '@/components/details/DetailsItem';

export default {
  components: {
    DetailsItem
  },
  computed: {
    selectedGame() {
      return this.$store.state.gameState.selectedGame;
    }
  }
}
</script>