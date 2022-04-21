import { createRouter, createWebHistory } from "vue-router";
import Post from '../views/Post.vue'
import NewPost from '../views/NewPost.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import OnePost from '../views/OnePost.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Post',
    component: Post
  },
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
    path: "/newpost/",
    name: "NewPost",
    component: NewPost,
  },
  {
    path: "/:id",
    name: "OnePost",
    component: OnePost,
    props: true,
  },
  {
    path: '/profile/',
    name: 'Profile',
    component: Profile
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
