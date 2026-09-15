<template>
  <ion-page>
    <AppToolbar title="Crear MEVN - Ionic Post" />
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">Títol</ion-label>
        <ion-input v-model="form.title" />
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Body</ion-label>
        <ion-textarea v-model="form.body" />
      </ion-item>
      <ion-button class="ion-margin-top" expand="block" @click="onCreatePost">
        Crear Post
      </ion-button>
      <ion-text color="danger" v-if="errorMessage">{{ errorMessage }}</ion-text>
      <ion-text color="success" v-if="successMessage">{{ successMessage }}</ion-text>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import 
{
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonText
} from "@ionic/vue";
import AppToolbar from "../components/AppToolbar.vue";
import { mevnApi } from "../services/mevnApi";

const form = reactive({ title: "", body: "" });
const errorMessage = ref("");
const successMessage = ref("");

async function onCreatePost() 
{
  errorMessage.value = "";
  successMessage.value = "";
  try 
  {
    await mevnApi.createPost(form);
    form.title = "";
    form.body = "";
    successMessage.value = "Post creat amb èxit.";
  } catch (error) 
  {
    errorMessage.value = error.message;
  }
}
</script>
