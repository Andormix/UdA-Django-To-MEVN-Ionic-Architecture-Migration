import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MevnPostsView from "../views/mevn/MevnPostsView.vue";
import MevnPostDetailView from "../views/mevn/MevnPostDetailView.vue";
import MevnCreatePostView from "../views/mevn/MevnCreatePostView.vue";
import MevnLoginView from "../views/mevn/MevnLoginView.vue";
import MevnRegisterView from "../views/mevn/MevnRegisterView.vue";
import DjangoPostsView from "../views/django/DjangoPostsView.vue";
import DjangoCommentsView from "../views/django/DjangoCommentsView.vue";

const routes = 
[
  { path: "/", name: "home", component: HomeView },
  { path: "/mevn/posts", name: "mevn-posts", component: MevnPostsView },
  { path: "/mevn/posts/new", name: "mevn-post-create", component: MevnCreatePostView },
  { path: "/mevn/posts/:postId", name: "mevn-post-detail", component: MevnPostDetailView, props: true },
  { path: "/mevn/login", name: "mevn-login", component: MevnLoginView },
  { path: "/mevn/register", name: "mevn-register", component: MevnRegisterView },
  { path: "/django/posts", name: "django-posts", component: DjangoPostsView },
  { path: "/django/comments", name: "django-comments", component: DjangoCommentsView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
