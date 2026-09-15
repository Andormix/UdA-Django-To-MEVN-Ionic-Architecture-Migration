<template>
  <ion-page>
    <AppToolbar title="MEVN Ionic Posts" />
    <ion-content class="ion-padding">
      <ion-button router-link="/mevn/posts/new" expand="block">Crear Post</ion-button>
      <ion-button class="ion-margin-top" expand="block" fill="outline" @click="loadPosts">Reload</ion-button>

      <ion-text color="danger" v-if="errorMessage">{{ errorMessage }}</ion-text>

      <ion-list>
        <ion-item v-for="post in posts" :key="post._id">
          <ion-label>
            <h2>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
            <p>By {{ post.author?.username }}</p>
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
import { mevnApi } from "../services/mevnApi";

const posts = ref([]);
const errorMessage = ref("");

async function loadPosts() 
{
  errorMessage.value = "";
  try {
    const result = await mevnApi.listPosts();
    posts.value = result.results || [];
  } catch (error) {
    errorMessage.value = error.message;
  }
}

onMounted(loadPosts);
</script>
