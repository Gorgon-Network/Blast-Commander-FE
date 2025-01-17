<template>
  <div class="mint-wrapper">
    <v-card text="Your NFT" width="500" height="500">
      <v-container v-if="loading">
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-container>
      <v-container v-if="!loading">
        <div class="d-flex justify-lg-space-between align-center pa-4 border-b-sm" v-for="item in nftList">
          <v-img :max-width="100" cover src="@/assets/item/player.png"></v-img>
          <div>AirCraft#{{ item?.tokenId }}</div>
          <div>{{ item?.points }}</div>
          <div>Lv: {{ item?.level }}</div>
        </div>
      </v-container>
      <v-card-actions class="justify-center">
        <v-btn class="bg-amber-accent-2" size="large" @click="mintNft">mint</v-btn>
      </v-card-actions>

      <div class="bb-wrapper">
          <div class="bb"></div>
        </div>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { _getOwnedAircrafts, _mintAircraft } from "@/store/ultil";
const loading = ref(false);
const nftList = ref([]);

async function getNftList() {
  loading.value = true;
  nftList.value = await _getOwnedAircrafts();
  loading.value = false;
}

async function mintNft() {
  const res = await _mintAircraft();
  console.log(22, res);
}

onMounted(() => {
  getNftList();
});
</script>

<style lang="scss">
.mint-wrapper {
  display: flex;
  justify-content: center;
  padding: 32px;
}

$anime-time: 8s;

$box-size: 200px;
$clip-distance: .05;
$clip-size: $box-size * (1 + $clip-distance * 2);
$path-width: 2px;

$main-color: #919595;

$codepen-logo-path: url('../assets/item/player.png');

%full-fill {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.bb-wrapper {
  width: $box-size;
  height: $box-size;
  position: relative;
  margin: auto;
  margin-top: 32px;
}

.bb {
  @extend %full-fill;
  width: $box-size;
  height: $box-size;
  background: $codepen-logo-path no-repeat 50% / 70% rgba(#000, .1);
  color: $main-color;
  box-shadow: inset 0 0 0 1px rgba($main-color, .5);

  &::before,
  &::after {
    @extend %full-fill;
    content: '';
    z-index: -1;
    margin: -1 * $clip-distance * 100%;
    box-shadow: inset 0 0 0 $path-width;
    animation: clipMe $anime-time linear infinite;
  }

  &::before {
    animation-delay: $anime-time * -.5;
  }
}

@keyframes clipMe {

  0%,
  100% {
    clip: rect(0px, $clip-size, $path-width, 0px);
  }

  25% {
    clip: rect(0px, $path-width, $clip-size, 0px);
  }

  50% {
    clip: rect($clip-size - $path-width, $clip-size, $clip-size, 0px);
  }

  75% {
    clip: rect(0px, $clip-size, $clip-size, $clip-size - $path-width);
  }
}
</style>
