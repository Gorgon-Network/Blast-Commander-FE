<script setup>
import {ref, onMounted} from 'vue';
import PhaserGame from '../game/PhaserGame.vue';
import HomePage from "./HomePage.vue";
import Info from "@/pages/Info.vue";
import Mint from "@/pages/Mint.vue";
import Bag from "@/pages/Bag.vue";
import {store} from "@/store/store";
// import { store } from '../store/store.js'

const isConnected = ref(false);
const page = ref('HOME')
const errorMessage = ref('');

// Hàm kết nối với MetaMask
const connectMetaMask = async () => {
  if (typeof window.ethereum !== "undefined") {
    window.ethereum
      .request({method: "eth_requestAccounts"})
      .then((accounts) => {
        const account = accounts[0]
        store.commit('setWallet', account)
        console.log(`Wallet connected: ${account}`)
        isConnected.value = true;
      })
      .catch((error) => {
        console.log(error, error.code);
      })
  } else {
    window.open("https://metamask.io/download/", "_blank");
  }
};

const onStartGame = (payload) => {
  page.value = 'GAME';
}

// Tự động gọi kết nối khi component được mount
onMounted(() => {
  connectMetaMask();
});

</script>

<template>
  <v-app-bar
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Title</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
  <div>
    <!-- Kiểm tra trạng thái kết nối -->
    <div v-if="!isConnected">
      <p>{{ errorMessage }}</p>
      <button @click="connectMetaMask">Connect to MetaMask</button>
    </div>

    <!-- Hiển thị game khi đã kết nối thành công -->
    <div v-if="isConnected">

      <HomePage v-if="page === 'HOME'" @startGame="onStartGame">Home Page</HomePage>
      <PhaserGame v-if="page === 'GAME'" ref="phaserRef"/>

      <Info v-if="page === 'INFO'">INFO</Info>
      <Mint v-if="page === 'MINT'"></Mint>
      <Bag v-if="page === 'COLLECTION'"/>

      <v-bottom-navigation class="bg-deep-purple-accent-2">
        <v-btn value="home" @click="page = 'HOME'">
          <v-icon>mdi-home</v-icon>

          <span>Home</span>
        </v-btn>

        <v-btn value="recent" @click="page = 'INFO'">
          <v-icon>mdi-information</v-icon>

          <span>Info</span>
        </v-btn>

        <v-btn value="ship-wheel" @click="page = 'MINT'">
          <v-icon>mdi-ship-wheel</v-icon>

          <span>Mint</span>
        </v-btn>

        <v-btn value="rhombus-split" @click="page = 'COLLECTION'">
          <v-icon>mdi-rhombus-split</v-icon>

          <span>Collection</span>
        </v-btn>
      </v-bottom-navigation>
    </div>

  </div>
</template>

