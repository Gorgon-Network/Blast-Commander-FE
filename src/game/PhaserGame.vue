<script setup>
import {onMounted, onUnmounted, ref, watch, computed} from 'vue';
import StartGame from './main';
import {useStore} from 'vuex';
import {_updateAircraft} from "@/store/ultil";

const store = useStore();
const eventData = computed(() => store.state.eventData);

const scene = ref();
const game = ref();
const dialog = ref(false);
const rewardPoint = ref(0);
const nftOptions = store.state.listNFT.map(item => {
  return {name: 'AirCraft#' + item.tokenId, value: item.tokenId}
})
const listNFT = ref(nftOptions);
const selectedNFT = ref(listNFT.value[0]);

onMounted(() => {
  game.value = StartGame('game-container');

});

onUnmounted(() => {
  if (game.value) {
    game.value.destroy(true);
    game.value = null;
  }

});

watch(eventData, (newV, oldV) => {
  console.log('Received eventData:', newV);
  if (newV.action === 'END_GAME') {
    dialog.value = true;
    rewardPoint.value = newV.point;
  }
});

async function claimPoints() {
  const tokenId = selectedNFT.value;
  await _updateAircraft(tokenId.value, rewardPoint.value);
  dialog.value = false;
  rewardPoint.value = 0;
}

defineExpose({scene, game});
</script>

<template>
  <div class="pt-4" id="phaser-container">
  </div>

  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-card
      max-width="500"
      prepend-icon="mdi-gift-open"
      class="bg-purple-darken-4 align-center"
      title="Claim Your points"
    >
      <v-card-text class="pt-4">
        Congratulations! Your reward points are {{ rewardPoint }}. Claim them now!
      </v-card-text>
      <v-select
        v-model="selectedNFT"
        :items="listNFT"
        item-title="name"
        item-value="value"
        label="Select an Item"
        return-object
      ></v-select>
      <template v-slot:actions class="align-center">
        <v-btn
          class="ms-auto"
          text="Claim"
          @click="claimPoints"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
