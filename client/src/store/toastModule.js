import { v4 } from 'uuid';

const toastModule = {
  state: () => ({
    toasts: []
  }),
  mutations: {
    showSuccessToast(state, payload) {
      showToast(state, false, payload);
    },
    showErrorToast(state, payload) {
      showToast(state, true, payload);
    },
    hideToast(state, payload) {
      state.toasts = state.toasts.filter(toast => toast.id !== payload);
    }
  },
  actions: {
    showSuccessToast(state, payload) {
      state.commit("showSuccessToast", payload);
    },
    showErrorToast(state, payload) {
      state.commit("showErrorToast", payload);
    },
    hideToast(state, payload) {
      state.commit("hideToast", payload);
    }
  }
}

const showToast = (state, isError, message) => {
  let newToast = {
    id: v4(),
    isError,
    message
  };

  state.toasts = [...state.toasts, newToast];
}

export default toastModule;