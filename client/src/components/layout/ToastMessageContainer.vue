<template>
  <div class="toast-container position-fixed p-3 border-0 bottom-0 end-0">
    <ToastMessage v-for="toast in toasts" :key="toast.id" :toast="toast" />
  </div>
</template>

<script>
import ToastMessage from '@/components/layout/ToastMessage.vue';

export default {
  components: {
    ToastMessage
  },
  computed: {
    toasts() {
      return this.$store.state.toastState.toasts;
    }
  }
}
</script>