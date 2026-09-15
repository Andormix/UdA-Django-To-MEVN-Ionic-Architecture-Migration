<script setup>
import { onMounted, ref } from "vue";
import { djangoApi } from "../../services/api/djangoApi";

const comments = ref([]);
const errorMessage = ref("");

async function loadComments() 
{
  errorMessage.value = "";
  try 
  {
    const data = await djangoApi.listComments();
    comments.value = data.results || data;
  } catch (error) 
  {
    errorMessage.value = error.message;
  }
}

onMounted(loadComments);
</script>

<template>
  <section class="card">
    <div class="card-header"><h2 class="h5 mb-0">Django API - Comentaris (read only)</h2></div>
    <div class="card-body">
      <div v-if="errorMessage" class="alert alert-warning">{{ errorMessage }}</div>
      <p v-if="comments.length === 0" class="text-muted">Sense data o Django API offline.</p>
      <div v-for="comment in comments" :key="comment.id" class="mb-2 border rounded p-2 bg-white">
        <p class="mb-1">{{ comment.body }}</p>
        <small class="text-muted">Post: {{ comment.post }} | User: {{ comment.name || comment.author || "N/A" }}</small>
      </div>
    </div>
  </section>
</template>
