<script setup>
import {ref, onMounted} from 'vue';
import PhaserGame from '../PhaserGame.vue';
import {ethers} from 'ethers';
import HomePage from "@/game/pages/HomePage.vue";

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
  console.log(payload)
  page.value = 'GAME';
}

// Tự động gọi kết nối khi component được mount
onMounted(() => {
  connectMetaMask();
});

</script>

<template>
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
    </div>

  </div>
</template>

