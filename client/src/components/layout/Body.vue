<template>
  <div class="container">
    <router-view />
    <ToastMessageContainer />
  </div>
</template>

<script>
import ToastMessageContainer from '@/components/layout/ToastMessageContainer.vue';

export default {
 components: {
   ToastMessageContainer
 }
}
</script>