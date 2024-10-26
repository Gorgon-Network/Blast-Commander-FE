<template>
  <div class="mint-wrapper">
    <v-card text="Your NFT"  width="500">
      <v-container v-if="loading">
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-container>
      <v-container v-if="!loading">
        <div class="d-flex justify-lg-space-between align-center pa-4 border-b-sm" v-for="item in nftList">
          <v-img :max-width="100" cover src="@/assets/item/player.png"></v-img>
          <div>AirCraft#{{item?.tokenId}}</div>
          <div>{{item?.points}}</div>
          <div>Lv: {{item?.level}}</div>
        </div>
      </v-container>
      <v-card-actions class="justify-center" >
        <v-btn class="bg-amber-accent-2" size="large" @click="mintNft">mint</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {_getOwnedAircrafts, _mintAircraft} from "@/store/ultil";
const loading = ref(false);
const nftList = ref([]);

async function getNftList () {
  loading.value = true;
  nftList.value = await _getOwnedAircrafts();
  loading.value = false;
}

async function mintNft() {
  const res = await _mintAircraft();
  console.log(22, res);
}

 onMounted( () => {
    getNftList();
});
</script>

<style>
.mint-wrapper {
  display: flex;
  justify-content: center;
  padding: 32px;
}
</style>
