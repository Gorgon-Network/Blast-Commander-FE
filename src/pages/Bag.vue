<template>
  <div class="d-flex justify-center pt-12 position-relative">
<!--    <v-btn @click="logEvent">log event</v-btn>-->
    <v-img :max-width="500" src="@/assets/item/background.webp"></v-img>
    <div class="banner bg-amber-darken-2 position-absolute">Feature Coming soon!</div>
  </div>
</template>

<script setup>

import {_recordAchievement} from "@/store/ultil";

async function logEvent() {
  const arr = ['do ing map 1, hightest asdasdasdasdasdasdasda','do ing map 1, hightest asdasdasdasdasdasdasda','do ing map 1, hightest asdasdasdasdasdasdasda','do ing map 1, hightest asdasdasdasdasdasdasda','do ing map 1, hightest asdasdasdasdasdasdasda','do ing map 1, hightest asdasdasdasdasdasdasda',
    'do ing map 1, hightest asdasdasdasdasdasdasda','do ing map 1, hightest asdasdasdasdasdasdasda','do ing map 1, hightest asdasdasdasdasdasdasda','do ing map 1, hightest asdasdasdasdasdasdasda']
  await _recordAchievement(120, JSON.stringify(arr));
}
</script>

<style>
  .banner {
    font-size: 36px;
    top: 460px;
    padding: 8px;
    border-radius: 16px;
  }

</style>
