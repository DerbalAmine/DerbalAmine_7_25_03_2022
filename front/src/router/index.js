import { createRouter, createWebHistory } from "vue-router";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import NewPost from "../views/NewPost.vue";
const routes = [
  {
    path: "/signup/",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login/",
    name: "Login",
    component: Login,
  },
  {
    path: '/newpost/',
    name: 'NewPost',
    component: NewPost
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
