<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { mevnApi } from "../../services/api/mevnApi";
import { useAuthStore } from "../../store/auth";

const route = useRoute();
const { state } = useAuthStore();
const post = ref(null);
const comments = ref([]);
const errorMessage = ref("");
const form = reactive({ body: "" });

async function load() 
{
  errorMessage.value = "";
  try 
  {
    const result = await mevnApi.getPost(route.params.postId);
    post.value = result.post;
    comments.value = result.comments;
  } catch (error) 
  {
    errorMessage.value = error.message;
  }
}

async function onSubmitComment() 
{
  try 
  {
    await mevnApi.createComment(route.params.postId, { body: form.body });
    form.body = "";
    await load();
  } catch (error) 
  {
    errorMessage.value = error.message;
  }
}

onMounted(load);
</script>

<template>
  <section class="card">
    <div class="card-header">
      <h2 class="h5 mb-0">MEVN Post detail</h2>
    </div>
    <div class="card-body">
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <div v-if="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <p class="text-muted">By {{ post.author?.username }}</p>
      </div>

      <hr />
      <h4 class="h6">Comments</h4>
      <p v-if="comments.length === 0" class="text-muted">Sense comentaris cri cri...</p>
      <div v-for="comment in comments" :key="comment._id" class="border rounded p-2 mb-2 bg-white">
        <p class="mb-1">{{ comment.body }}</p>
        <small class="text-muted">By {{ comment.author?.username }}</small>
      </div>

      <form v-if="state.user" class="mt-3" @submit.prevent="onSubmitComment">
        <label class="form-label">Nou comentari</label>
        <textarea v-model="form.body" class="form-control mb-2" rows="3" required></textarea>
        <button class="btn btn-primary btn-sm">Enviar comentari</button>
      </form>
      <p v-else class="text-muted mt-2">Fes login per comentar.</p>
    </div>
  </section>
</template>
