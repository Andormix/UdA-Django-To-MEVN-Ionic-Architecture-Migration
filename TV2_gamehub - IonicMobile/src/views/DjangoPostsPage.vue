<template>
  <ion-page>
    <AppToolbar title="Django API Posts (Read only)" />
    <ion-content class="ion-padding">
      <ion-button expand="block" fill="outline" @click="loadPosts">Reload Dades de Django Web</ion-button>
      <ion-text color="danger" v-if="errorMessage">{{ errorMessage }}</ion-text>

      <ion-list>
        <ion-item v-for="post in posts" :key="post.id">
          <ion-label>
            <h2>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import 
{
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonList,
  IonItem,
  IonLabel
} from "@ionic/vue";
import AppToolbar from "../components/AppToolbar.vue";
import { djangoApi } from "../services/djangoApi";

const posts = ref([]);
const errorMessage = ref("");

//mateix que al web - Principal avanatge.
async function loadPosts() 
{
  errorMessage.value = "";
  try 
  {
    const result = await djangoApi.listPosts();
    posts.value = result.results || result;
  } catch (error) 
  {
    errorMessage.value = error.message;
  }
}

onMounted(loadPosts);
</script>
