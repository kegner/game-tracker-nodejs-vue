<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container">
      <router-link class="navbar-brand" to="/">Game Tracker</router-link>
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/signup">Signup</router-link>
        </li>
      </ul>
      <UserLoginLogout />
    </div>
  </nav>
</template>

<script>
import UserLoginLogout from './UserLoginLogout.vue';

export default {
  components: {
    UserLoginLogout
  }
}
</script>