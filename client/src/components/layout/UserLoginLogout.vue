<template>
  <ul class="navbar-nav ms-auto">
    <li class="nav-item">
      <span v-if="isLoggedIn" class="d-block py-2 px-2 text-white">Hello, {{ user.firstName }} </span>
    </li>
    <li class="nav-item">
      <router-link v-if="!isLoggedIn" class="nav-link active" to="/login">Sign In</router-link>
      <button v-if="isLoggedIn" class="btn btn-link nav-link" @click="logout">Sign Out</button>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.authState.isLoggedIn;
    },
    user() {
      return this.$store.state.authState.user;
    }
  },
  methods: {
    async logout() {
      try {
        await axios.post("/api/v1/users/logout");
        this.$store.dispatch("clearUserData");
        this.$router.push("/logout");
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>