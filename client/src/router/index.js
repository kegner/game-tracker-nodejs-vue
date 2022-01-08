import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
import Signup from '../views/Signup.vue';
import { getCurrentUser } from '../services/authenticationService';
import store from '../store';

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
    beforeEnter(to, from, next) {
      const isLoggedIn = store.state.authState.isLoggedIn;
      if (!isLoggedIn) {
        next("/login");
      } else {
        next();
      }      
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active"
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = store.state.authState.isLoggedIn;
  const initialLoad = store.state.authState.initialLoad;
  if (isLoggedIn || initialLoad) {
    const user = await getCurrentUser();
    if (!user) {
      store.dispatch("clearUserData");
    } else if (initialLoad && user) {
      store.dispatch("setUserData", user);
    }
  }
  next();
});

export default router
