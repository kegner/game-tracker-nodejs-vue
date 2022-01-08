<template>
  <div ref="toastEl" class="toast text-white" :class="bgClass" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        {{ toast.message }}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'bootstrap';

export default {
  props: {
    toast: Object
  },
  data() {
    return {
      bsToast: {}
    }
  },
  computed: {
    bgClass() {
      return this.toast.isError ? "bg-danger" : "bg-success";
    }
  },
  methods: {
    hideHandler() {
      if (this.toast.id) {
        this.$store.dispatch("hideToast", this.toast.id);
      }
    },
    onToastChange() {
      this.bsToast = new Toast(this.$refs.toastEl);
      this.bsToast.show();
      this.$refs.toastEl.removeEventListener('hidden.bs.toast', this.hideHandler);
      this.$refs.toastEl.addEventListener('hidden.bs.toast', this.hideHandler);
    }
  },
  mounted() {
    this.onToastChange();
  },
  beforeUnmount() {
    this.$refs.toastEl.removeEventListener('hidden.bs.toast', this.hideHandler);
  }
}
</script>