<script setup>
import AppNav from "./components/AppNav.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <div class="app-shell">
    <AppNav />
    <main class="container py-4 page-content">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
