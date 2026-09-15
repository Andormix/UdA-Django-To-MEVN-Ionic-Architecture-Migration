<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-buttons v-if="showBack" slot="start">
        <ion-back-button default-href="/home" text="Back" />
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button fill="clear" color="light" router-link="/home">Home</ion-button>
        <ion-button
          v-if="auth.state.user"
          fill="clear"
          color="light"
          @click="onLogout"
        >
          Logout
        </ion-button>
        <ion-button v-else fill="clear" color="light" router-link="/mevn/login">
          Login
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup>
import { useRouter } from "vue-router";
import 
{
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton
} from "@ionic/vue";
import { useAuthStore } from "../store/auth";

defineProps({
  title: { type: String, required: true },
  showBack: { type: Boolean, default: true }
});

const router = useRouter();
const auth = useAuthStore();

//Retorna al home
function onLogout() 
{
  auth.clearAuth();
  router.replace("/home");
}
</script>
