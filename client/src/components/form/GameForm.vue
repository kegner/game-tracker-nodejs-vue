<template>
  <div class="position-relative">
    <div class="card">
      <form>
        <div class="card-header bg-dark text-white">
          Game Form
        </div>
        <div class="card-body">
          <input type="hidden" :value="id" />
          <div class="row mb-2">
            <div class="col-3">
              <FormItem v-model="title" id="title" label="Title" type="text" />
            </div>
            <div class="col-3">
              <FormItem v-model="platform" id="platform" label="Platform" type="text" />
            </div>
            <div class="col-3">
              <FormItem v-model="startDate" id="startDate" label="Start Date" type="date" />
            </div>
            <div class="col-3">
              <FormItem v-model="endDate" id="endDate" label="End Date" type="date" />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-3">
              <FormItem v-model="status" id="status" label="Status" type="text" />
            </div>
            <div class="col-3">
              <FormItem v-model="hoursToComplete" id="hoursToComplete" label="Hours To Complete" type="number" />
            </div>
            <div class="col-3">
              <FormItem v-model="rating" id="rating" label="Rating" type="number" />
            </div>
            <div class="col-3">
              <FormItem v-model="price" id="price" label="Price" type="number" />
            </div>
          </div>
        </div>
        <div class="card-footer bg-dark text-white">
          <div class="d-flex justify-content-end align-items-end">
            <button type="submit" class="btn btn-primary" :disabled="title === ''" @click="createNew">
              Create New
            </button>
            <div class="mx-2"></div>
            <button type="submit" class="btn btn-primary" :disabled="id === ''" @click="update">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
    <Spinner v-if="saving" />
  </div>
</template>

<script>
import FormItem from '@/components/form/FormItem.vue';
import Spinner from '@/components/layout/Spinner.vue';

export default {
  components: {
    FormItem,
    Spinner
  },
  data() {
    return {
      id: "",
      title: "",
      platform: "",
      startDate: "",
      endDate: "",
      status: "",
      hoursToComplete: "0",
      rating: "0",
      price: "0"
    }
  },
  computed: {
    saving() {
      return this.$store.state.gameState.saving;
    },
    selectedGame() {
      return this.$store.state.gameState.selectedGame;
    },
    user() {
      return this.$store.state.authState.user;
    }
  },
  watch: {
    selectedGame(val) {
      this.id = val.id || null;
      this.title = val.title || "";
      this.platform = val.platform || "";
      this.startDate = val.startDate ? new Date(val.startDate).toISOString().split("T")[0] : null;
      this.endDate = val.endDate ? new Date(val.endDate).toISOString().split("T")[0] : null;
      this.status = val.status || "";
      this.hoursToComplete = val.hoursToComplete || 0;
      this.rating = val.rating || 0;
      this.price = val.price || 0;
    }
  },
  methods: {
    createNew(e) {
      e.preventDefault();
      const game = {
        title: this.title,
        platform: this.platform,
        startDate: this.startDate || null,
        endDate: this.endDate || null,
        status: this.status,
        hoursToComplete: Number(this.hoursToComplete),
        rating: Number(this.rating),
        price: Number(this.price),
        userId: Number(this.user.id)
      };
      this.$store.dispatch("createGame", game);
    },
    update(e) {
      e.preventDefault();
      const game = {
        id: Number(this.id),
        title: this.title,
        platform: this.platform,
        startDate: this.startDate || null,
        endDate: this.endDate || null,
        status: this.status,
        hoursToComplete: Number(this.hoursToComplete),
        rating: Number(this.rating),
        price: Number(this.price),
        userId: Number(this.user.id)
      };
      this.$store.dispatch("updateGame", game);
    }
  }
}
</script>