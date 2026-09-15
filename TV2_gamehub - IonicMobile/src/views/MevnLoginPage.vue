<template>
  <ion-page>
    <AppToolbar title="MEVN Ionic - Login" />
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">User</ion-label>
        <ion-input v-model="form.username" />
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Password</ion-label>
        <ion-input v-model="form.password" type="password" />
      </ion-item>
      <ion-button class="ion-margin-top" expand="block" @click="onLogin">Login</ion-button>
      <ion-text color="danger" v-if="errorMessage">{{ errorMessage }}</ion-text>
      <ion-text color="success" v-if="auth.state.user" class="ion-margin-top">
        Loggejat com {{ auth.state.user.username }}
      </ion-text>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import 
{
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText
} from "@ionic/vue";
import AppToolbar from "../components/AppToolbar.vue";
import { mevnApi } from "../services/mevnApi";
import { useAuthStore } from "../store/auth";

const form = reactive({ username: "", password: "" });
const errorMessage = ref("");
const router = useRouter();
const auth = useAuthStore();

async function onLogin() 
{
  errorMessage.value = "";
  try 
  {
    const result = await mevnApi.login(form);
    auth.setAuth(result.token, result.user);
    router.push("/mevn/posts");

  } catch (error) 
  {
    errorMessage.value = error.message; // clang 01 mirar err
  }
}
</script>
