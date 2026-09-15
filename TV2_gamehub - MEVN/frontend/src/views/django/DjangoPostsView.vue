<script setup>
import { onMounted, ref } from "vue";
import { djangoApi } from "../../services/api/djangoApi";

const posts = ref([]);
const errorMessage = ref("");

async function loadPosts() 
{
  errorMessage.value = "";
  try 
  {
    const data = await djangoApi.listPosts();
    posts.value = data.results || data;
  } catch (error) 
  {
    errorMessage.value = error.message;
  }
}

onMounted(loadPosts);
</script>

<template>
  <section class="card">
    <div class="card-header"><h2 class="h5 mb-0">Django API - Posts (read only)</h2></div>
    <div class="card-body">
      <div v-if="errorMessage" class="alert alert-warning">{{ errorMessage }}</div>
      <p v-if="posts.length === 0" class="text-muted">Sense data o Django API offline.</p>
      <div v-for="post in posts" :key="post.id" class="mb-3 border rounded p-3 bg-white">
        <h3 class="h6">{{ post.title }}</h3>
        <p class="mb-2">{{ post.body?.slice(0, 160) }}...</p>
        <small class="text-muted">Author: {{ post.author || "N/A" }}</small>
      </div>
    </div>
  </section>
</template>
