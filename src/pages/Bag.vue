<template>
  <div class="d-flex justify-center pt-12">
    <v-btn @click="logEvent">log event</v-btn>
    <v-img :max-width="500" src="@/assets/item/comming-soon.jpg"></v-img>
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
