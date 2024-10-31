<script setup>
import {defineEmits, onMounted, ref} from 'vue';
import {_getOwnedAircrafts} from "@/store/ultil";
import {useStore} from 'vuex';

const loading = ref(false);
const listNFT = ref([]);
const store = useStore();

const emit = defineEmits(['startGame' , 'mint']);

const onStartGame = () => {
  emit('startGame', true);
}

const onMint = () => {
  emit('mint', true);
}
async function getNftList() {
  loading.value = true;
  listNFT.value = await _getOwnedAircrafts();
  loading.value = false;
  store.commit('setListNFT', listNFT.value);
}

onMounted( () => {
  getNftList();
});

</script>
<template>
  <div class="wrapper">
    <div class="home-page bg-grey-darken-4">
      <v-card class="account-info bg-blue-lighten-2" hover>
        <v-avatar color="info">
          <v-icon icon="mdi-account-circle"></v-icon>
        </v-avatar>
        <span class="px-4">{{ store.state.address }}</span>
      </v-card>
      <div class="title">ChronoVortex: Space Conquest</div>
      <div class="pb-12">
        <div class="d-flex justify-center ga-4 pb-2">
          <v-btn size="x-large" class="btn btn-primary bg-yellow-lighten-4 text-purple-darken-4" @click="onStartGame" :disabled="loading">
            Start game
          </v-btn>
          <v-btn size="x-large" class="btn btn-primary bg-yellow-lighten-4 text-purple-darken-4" @click="onMint" :disabled="loading">
            Mint Now
          </v-btn>
        </div>
        <div v-if="listNFT?.length < 1" class="pa-2">Note: "Players need to mint NFTs to receive reward points."</div>
      </div>
      <div class="background-objects">
        <div
          v-for="(object, index) in 20"
          :key="index"
          class="floating-object"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }"
        ></div>
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
  padding: 64px 48px;
  font-size: 44px;
  text-align: center;
  font-weight: 400;
  font-style: normal;
  color: #BA68C8;
  animation: pulseEffect 2.5s infinite, glowEffect 3s ease-in-out infinite;
}

@keyframes pulseEffect {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}

@keyframes glowEffect {
  0% {
    text-shadow: 0 0 4px #C5CAE9;
  }
  50% {
    text-shadow: 0 0 16px #9FA8DA;
  }
  100% {
    text-shadow: 0 0 4px #C5CAE9;
  }
}

.home-page {
  position: relative;
  width: 500px;
  height: calc(100vh - 134px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url("@/assets/item/info.webp");
  background-size: contain;
  background-repeat: no-repeat;

  .btn {
    font-size: 20px;
    font-weight: bold;
    border-radius: 12px;
    padding: 12px 24px;
    text-transform: uppercase;
    transition: transform 0.3s, box-shadow 0.3s;
    animation: pulseBackground 3s infinite alternate;
    border: 2px solid transparent;
    background-clip: padding-box; /* Ensure the border doesn't interfere with background */
    position: relative;
    z-index: 1;
  }

  .btn::before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 16px;
    background: linear-gradient(45deg, #ffeb3b, #ff9800, #673ab7);
    z-index: -1;
    opacity: 0.6;
    filter: blur(8px);
    transition: opacity 0.3s;
  }

  .btn:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .btn:hover::before {
    opacity: 1;
  }

  @keyframes pulseBackground {
    0% {
      background-color: #ffeb3b;
    }
    50% {
      background-color: #ffcc80;
    }
    100% {
      background-color: #f3e5f5;
    }
  }

}

.background-objects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none; /* Ensure the objects do not block interactions */
}

.floating-object {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  width: 6px;
  height: 6px;
  animation: float 12s infinite;
  animation-timing-function: ease-in-out;
  opacity: 0.8;
}

.floating-object:nth-child(odd) {
  width: 8px;
  height: 8px;
  animation-duration: 16s;
}

@keyframes float {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0.8;
  }
  50% {
    transform: translate3d(50px, -100px, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(-20px, -200px, 0);
    opacity: 0.4;
  }
}

</style>
