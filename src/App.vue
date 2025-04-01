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
/* @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Baloo+Bhai+2:wght@400;700&family=Fredoka+One&family=Lilita+One&display=swap');

.font-luckiest {
  font-family: 'Luckiest Guy', sans-serif;
}
.font-baloo {
  font-family: 'Baloo Bhai 2', sans-serif;
}
.font-fredoka {
  font-family: 'Fredoka One', sans-serif;
}
.font-lilita {
  font-family: 'Lilita One', sans-serif;
} */
</style>