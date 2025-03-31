<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <NotificationPopup v-for="notification in notifications" :key="notification.id" :message="notification.message"
      :type="notification.type" :id="notification.id" />
  </v-app>
</template>

<script setup>
import NotificationPopup from '@/pages/NotificationPopup.vue';
import { useNotificationService } from './store/api';
const { notifications } = useNotificationService();
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap');

body {
  font-family: 'Nunito', sans-serif;

  .main-bgr {
    background-color: #50BEF9;
  }
}
</style>