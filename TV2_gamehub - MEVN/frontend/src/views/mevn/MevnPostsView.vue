<script setup>
import { onMounted, ref } from "vue";
import { mevnApi } from "../../services/api/mevnApi";
import { useAuthStore } from "../../store/auth";

const { state } = useAuthStore();
const posts = ref([]);
const errorMessage = ref("");

async function loadPosts() 
{
  errorMessage.value = "";
  try 
  {
    const response = await mevnApi.listPosts();
    posts.value = response.results;
  } catch (error) 
  {
    errorMessage.value = error.message;
  }
}

onMounted(loadPosts);
</script>

<template>
  <section class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h2 class="h5 mb-0">MEVN Posts</h2>
      <RouterLink v-if="state.user" to="/mevn/posts/new" class="btn btn-sm btn-light">New post</RouterLink>
    </div>
    <div class="card-body">
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <p v-if="posts.length === 0" class="text-muted mb-0">No hi ha posts encara.</p>
      <div v-for="post in posts" :key="post._id" class="mb-3 border rounded p-3 bg-white">
        <h3 class="h6">{{ post.title }}</h3>
        <p class="mb-2">{{ post.body.slice(0, 160) }}...</p>
        <small class="text-muted">By {{ post.author?.username }}</small>
        <div class="mt-2">
          <RouterLink :to="`/mevn/posts/${post._id}`" class="btn btn-outline-secondary btn-sm">Open</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
