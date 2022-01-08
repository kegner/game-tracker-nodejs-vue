<template>
  <form @submit="onSubmit">
    <div class="row mb-4">
      <div class="col-6">
        <FormItem v-model="firstName" id="firstName" label="First Name"
          type="text" v-model:validClass="firstNameValidClass" :isRequired="true" />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-6">
        <FormItem v-model="lastName" id="lastName" label="Last Name"
          type="text" v-model:validClass="lastNameValidClass" :isRequired="true" />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-6">
        <FormItem v-model="email" id="email" label="Email"
          type="email" v-model:validClass="emailValidClass" :isRequired="true" />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-6">
        <FormItem v-model="username" id="username" label="Username"
          type="text" v-model:validClass="usernameValidClass" :isRequired="true" />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-6">
        <FormItem v-model="password" id="password" label="Password"
          type="password" v-model:validClass="passwordValidClass" :isRequired="true" />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-6">
        <button class="btn btn-primary" type="submit" @click="onSubmit">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>
import FormItem from '@/components/form/FormItem.vue';
import axios from 'axios';

export default {
  components: {
    FormItem
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      firstNameValidClass: "",
      lastNameValidClass: "",
      emailValidClass: "",
      usernameValidClass: "",
      passwordValidClass: ""
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      this.firstNameValidClass = !this.firstName ? "is-invalid" : "";
      this.lastNameValidClass = !this.lastName ? "is-invalid" : "";
      this.emailValidClass = !this.email ? "is-invalid" : "";
      this.usernameValidClass = !this.username ? "is-invalid" : "";
      this.passwordValidClass = !this.password ? "is-invalid" : "";

      if (this.firstNameValidClass || this.lastNameValidClass || this.emailValidClass ||
        this.usernameValidClass || this.passwordValidClass) return;

      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        password: this.password
      }

      try {
        await axios.post("/api/v1/users/signup", user);
        this.$store.dispatch("showSuccessToast", "Sign up successful.");
      } catch (error) {
        const validResponses = [404, 409];
        if (error && error.response && validResponses.includes(error.response.status)) {
          this.$store.dispatch("showErrorToast", error.response.data);
        } else {
          console.error(error);
        }
      }
    }
  }
}
</script>