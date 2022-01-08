<template>
  <form @submit="onSubmit" v-if="!isLoggedIn">
    <div class="row mb-4">
      <div class="col-6">
        <FormItem v-model="username" id="username" label="Username" type="text" />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-6">
        <FormItem v-model="password" id="password" label="Password" type="password" />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-6">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </div>
  </form>
  <div v-if="isLoggedIn">
    You are already logged in.
  </div>
</template>

<script>
import axios from 'axios';
import { getCurrentUser } from '@/services/authenticationService';
import FormItem from '@/components/form/FormItem.vue';

export default {
  components: {
    FormItem
  },
  data() {
    return {
      username: "",
      password: ""
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.authState.isLoggedIn;
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      
      try {
        await axios.post("/api/v1/users/login", { 
          username: this.username, 
          password: this.password 
        });
        
        const user = await getCurrentUser();
        if (user) {
          this.$store.dispatch("setUserData", user);
          this.$router.push("/");
        } else {
          this.$store.dispatch("clearUserData");
        }
      } catch (error) {
        this.$store.dispatch("showErrorToast", "Login failed.");
        console.error(error);
      }
    }
  }
}
</script>