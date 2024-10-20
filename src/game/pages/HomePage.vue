<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['startGame']);
const onStartGame = () => {
  emit('startGame', true);
}
</script>
<template>
  <div class="home-page bg-green-200 flex">
    <div class="flex ali ">
      <button class="flex items-center px-4 py-3 text-white bg-blue-500 hover:bg-blue-400" @click="onStartGame">Start game</button>
    </div>
  </div>
</template>

<style>

.home-page {
  width: 500px;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
