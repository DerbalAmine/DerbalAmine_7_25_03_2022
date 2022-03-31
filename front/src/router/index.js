import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import NewPost from "../views/NewPost.vue";
import Profile from "../views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/newPost",
    name: " NewPost",
    component: NewPost,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
