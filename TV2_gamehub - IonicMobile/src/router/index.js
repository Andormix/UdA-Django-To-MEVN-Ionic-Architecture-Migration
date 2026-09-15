import { createRouter, createWebHistory } from "@ionic/vue-router";
import MobileHomePage from "../views/MobileHomePage.vue";
import MevnLoginPage from "../views/MevnLoginPage.vue";
import MevnPostsPage from "../views/MevnPostsPage.vue";
import MevnCreatePostPage from "../views/MevnCreatePostPage.vue";
import DjangoPostsPage from "../views/DjangoPostsPage.vue";

const routes = 
[
  { path: "/", redirect: "/home" },
  { path: "/home", component: MobileHomePage },
  { path: "/mevn/login", component: MevnLoginPage },
  { path: "/mevn/posts", component: MevnPostsPage },
  { path: "/mevn/posts/new", component: MevnCreatePostPage },
  { path: "/django/posts", component: DjangoPostsPage }
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
