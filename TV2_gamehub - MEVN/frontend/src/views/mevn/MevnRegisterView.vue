<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { mevnApi } from "../../services/api/mevnApi";
import { useAuthStore } from "../../store/auth";

const form = reactive({ username: "", email: "", password: "" });
const errorMessage = ref("");
const router = useRouter();
const { setAuth } = useAuthStore();

async function onSubmit() 
{
  errorMessage.value = "";

  try 
  {
    const result = await mevnApi.register(form);
    setAuth(result.token, result.user);
    router.push("/mevn/posts");
  } catch (error) 
  {
    errorMessage.value = error.message;
  }
}
</script>

<template>
  <section class="card mx-auto" style="max-width: 520px">
    <div class="card-header"><h2 class="h5 mb-0">Register MEVN</h2></div>
    <div class="card-body">
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label class="form-label">Nickname</label>
          <input v-model="form.username" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="form.password" type="password" class="form-control" required />
        </div>
        <button class="btn btn-primary">Crear compte</button>
      </form>
    </div>
  </section>
</template>
