import axios from 'axios';

const errorHandler = (error, state) => {
  const validResponses = [404, 409];
  if (error && error.response && validResponses.includes(error.response.status)) {
    state.dispatch("showErrorToast", error.response.data);
  } else {
    console.error(error);
  }
}

const gameModule = {
  state: () => ({
    games: [],
    selectedGame: {},
    loading: false,
    saving: false
  }),
  mutations: {
    selectGame(state, payload) {
      state.selectedGame = payload;
    },
    fetchGames(state, payload) {
      state.games = payload;
      state.selectedGame = payload && payload.length > 0 ? payload[0] : {};
      state.loading = false;
    },
    createGame(state, payload) {
      state.games = [...state.games, payload];
      state.selectedGame = payload;
      state.saving = false;
    },
    updateGame(state, payload) {
      state.games = state.games.map(game => (
        game.id === payload.id ? payload : game
      ));
      state.selectedGame = payload;
      state.saving = false;
    },
    deleteGame(state, payload) {
      state.games = state.games.filter(game => game.id !== payload);
      state.selectedGame = state.games.length > 0 ? state.games[0] : {};
      state.saving = false;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    startSaving(state) {
      state.saving = true;
    },
    stopSaving(state) {
      state.saving = false;
    }
  },
  actions: {
    selectGame(state, payload) {
      state.commit("selectGame", payload);
    },
    async fetchGames(state, payload) {
      state.commit("startLoading");

      try {
        const res = await axios.get("/api/v1/games", { params: { userId: payload } });
        state.commit("fetchGames", res.data.games);
      } catch (error) {
        state.commit("stopLoading");
        errorHandler(error, state);
      }
    },
    async createGame(state, payload) {
      state.commit("startSaving");

      try {
        const res = await axios.post("/api/v1/games", payload);
        state.commit("createGame", res.data);
        state.dispatch("showSuccessToast", "Game added.");
      } catch (error) {
        state.commit("stopSaving");
        errorHandler(error, state);
      }
    },
    async updateGame(state, payload) {
      state.commit("startSaving");

      try {
        const res = await axios.put("/api/v1/games", payload);
        state.commit("updateGame", res.data);
        state.dispatch("showSuccessToast", "Game updated.");
      } catch (error) {
        state.commit("stopSaving");
        errorHandler(error, state);
      }
    },
    async deleteGame(state, payload) {
      state.commit("startSaving");

      try {
        await axios.delete(`/api/v1/games/${payload}`);
        state.commit("deleteGame", payload);
        state.dispatch("showSuccessToast", "Game deleted.");
      } catch (error) {
        state.commit("stopSaving");
        errorHandler(error, state);
      }
    },
    startLoading(state) {
      state.commit("startLoading");
    },
    stopLoading(state) {
      state.commit("stopLoading");
    },
    startSaving(state) {
      state.commit("startSaving");
    },
    stopSaving(state) {
      state.commit("stopSaving");
    }
  },
  getters: {
    
  }
}

export default gameModule;