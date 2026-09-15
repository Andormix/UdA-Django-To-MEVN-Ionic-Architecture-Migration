<script setup>
import { useAuthStore } from "../store/auth";

const { state, clearAuth } = useAuthStore();
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark custom-bar">
    <div class="container">
      <RouterLink to="/" class="navbar-brand fw-bold">TFG GameHub</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/mevn/posts">DevLog (MEVN)</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/django/posts">DevLog (API Django)</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/django/comments">Comments (API Django)</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li v-if="state.user" class="nav-item d-flex align-items-center text-white me-3">
            {{ state.user.username }}
          </li>
          <li v-if="state.user" class="nav-item">
            <button class="btn btn-sm btn-outline-light" @click="clearAuth">Logout</button>
          </li>
          <li v-else class="nav-item">
            <RouterLink class="nav-link" to="/mevn/login">Login</RouterLink>
          </li>
          <li v-if="!state.user" class="nav-item">
            <RouterLink class="nav-link" to="/mevn/register">Register</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
