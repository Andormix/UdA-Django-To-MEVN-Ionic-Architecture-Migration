<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { mevnApi } from "../../services/api/mevnApi";
import { useAuthStore } from "../../store/auth";

const { state } = useAuthStore();
const router = useRouter();
const form = reactive({ title: "", body: "" });
const errorMessage = ref("");

if (!state.user) {
  router.push("/mevn/login");
}

async function onSubmit() {
  errorMessage.value = "";
  try {
    const response = await mevnApi.createPost(form);
    router.push(`/mevn/posts/${response.post._id}`);
  } catch (error) {
    errorMessage.value = error.message;
  }
}
</script>

<template>
  <section class="card">
    <div class="card-header"><h2 class="h5 mb-0">Crear MEVN Post</h2></div>
    <div class="card-body">
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input v-model="form.title" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Body</label>
          <textarea v-model="form.body" class="form-control" rows="6" required></textarea>
        </div>
        <button class="btn btn-primary">Create post</button>
      </form>
    </div>
  </section>
</template>
