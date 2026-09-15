<template>
  <ion-page>
    <AppToolbar title="TV2 GameHub Ionic" :show-back="false" />
    <ion-content class="ion-padding">
      <ion-text v-if="auth.state.user" color="success" class="ion-margin-bottom">
        Loggejat com {{ auth.state.user.username }}
      </ion-text>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Ionic Mobile - Part 2 del TV</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Aquesta app per mòvil consumeix els dos backends:
          <ul>
            <li>MEVN: login, veure posts list, crear post</li>
            <li>Django: posts (read-only)</li>
          </ul>
        </ion-card-content>
      </ion-card>

      <ion-list>
        <ion-item button router-link="/mevn/login">MEVN - Login</ion-item>
        <ion-item button router-link="/mevn/posts">MEVN - Veure posts</ion-item>
        <ion-item button router-link="/mevn/posts/new">MEVN - Crear post</ion-item>
        <ion-item button router-link="/django/posts">Django API - Posts (read-only)</ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonText
} from "@ionic/vue";
import AppToolbar from "../components/AppToolbar.vue";
import { useAuthStore } from "../store/auth";

const auth = useAuthStore();
</script>
