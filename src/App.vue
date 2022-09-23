<script setup lang="ts">
import { RouterView } from "vue-router";
import LogRocket from "logrocket";
import { useStore } from "vuex";
import { computed } from "vue";
LogRocket.init("j1sywq/fp-partner-prod");

// Initialize store
const store = useStore();

// Get token
const token = computed(() => store.getters.getToken);

// This is an example script - don't forget to change it!
if (token.value && store.getters.getUser) {
  LogRocket.identify("FP-PARTNER", {
    name: store.getters.getUser.partner.name,
    email: store.getters.getUser.email,
  });
}
</script>

<template>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
</style>
