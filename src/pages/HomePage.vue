<script setup>
import { defineEmits } from 'vue';
import { store } from '../store/store.js'
const emit = defineEmits(['startGame']);
const onStartGame = () => {
  emit('startGame', true);
}
</script>
<template>
  <div class="wrapper">
    <div class="home-page bg-amber-accent-1">
      <v-card class="account-info bg-blue-lighten-2"  hover>
        <v-avatar color="info">
          <v-icon icon="mdi-account-circle"></v-icon>
        </v-avatar>
        <span class="px-4">{{store.state.address}}</span>
      </v-card>
      <div class="title">ChronoVortex: Space Conquest</div>
      <div class="d-flex justify-center">
        <v-btn class="btn btn-primary bg-yellow-lighten-4 text-purple-darken-4" @click="onStartGame">Start game</v-btn>
      </div>

    </div>

  </div>

</template>

<style>
.wrapper {
  width: 100%;
  height: calc(100vh - 136px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.account-info {
  position: absolute !important;
  top: 4px;
  padding: 4px !important;
  left: 16px;
}
.title {
  padding: 32px;
  font-size: 44px;
  text-align: center;
  font-family: "Londrina Sketch", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #C5CAE9;
}

.home-page {
  position: relative;
  width: 500px;
  height: calc(100vh - 134px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url("public/assets/landing/background.webp");
}

</style>
