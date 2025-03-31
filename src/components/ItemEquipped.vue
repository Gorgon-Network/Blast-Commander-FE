<template>
  <div class="equipment-container">
    <div class="position-relative w-100 h-100">
      <div class="title-item text-yellow-darken-4">Item Equipped</div>
      <!-- Top Left (MainGun) -->
      <div class="item-slot top-left" @mouseover="showTooltip(mainGun)" @mouseleave="hideTooltip" @click="openDialog(mainGun)">
        <div class="item" :class="getRarityClass(mainGun?.rarity)" v-if="mainGun">
          <img :src="getItemImage(mainGun.itemType)" alt="MainGun" />
        </div>
        <div class="item empty" v-else></div>
        <div class="tooltip" v-if="hoveredItem === mainGun && mainGun">
          <h3>{{ mainGun.itemTypeName }}</h3>
          <p>Rarity: {{ mainGun.rarityName }}</p>
          <p>Stats: <span class="text-green-accent-3">+ {{ mainGun.stats }}</span></p>
          <p>Token ID: {{ mainGun.tokenId }}</p>
        </div>
      </div>

      <!-- Top Right (WingGun) -->
      <div class="item-slot top-right" @mouseover="showTooltip(wingGun)" @mouseleave="hideTooltip" @click="openDialog(wingGun)">
        <div class="item" :class="getRarityClass(wingGun?.rarity)" v-if="wingGun">
          <img :src="getItemImage(wingGun.itemType)" alt="WingGun" />
        </div>
        <div class="item empty" v-else></div>
        <div class="tooltip" v-if="hoveredItem === wingGun && wingGun">
          <h3>{{ wingGun.itemTypeName }}</h3>
          <p>Rarity: {{ wingGun.rarityName }}</p>
          <p>Stats: <span class="text-green-accent-3">+ {{ wingGun.stats }}</span></p>
          <p>Token ID: {{ wingGun.tokenId }}</p>
        </div>
      </div>

      <!-- Center (HP) -->
      <div class="item-slot center" @mouseover="showTooltip(hp)" @mouseleave="hideTooltip" @click="openDialog(hp)">
        <div class="item" :class="getRarityClass(hp?.rarity)" v-if="hp">
          <img :src="getItemImage(hp.itemType)" alt="HP" />
        </div>
        <div class="item empty" v-else></div>
        <div class="tooltip" v-if="hoveredItem === hp && hp">
          <h3>{{ hp.itemTypeName }}</h3>
          <p>Rarity: {{ hp.rarityName }}</p>
          <p>Stats: <span class="text-green-accent-3">{{ hp.stats }}</span></p>
          <p>Token ID: {{ hp.tokenId }}</p>
        </div>
      </div>

      <!-- Bottom Left (SideGun) -->
      <div class="item-slot bottom-left" @mouseover="showTooltip(sideGun)" @mouseleave="hideTooltip" @click="openDialog(sideGun)">
        <div class="item" :class="getRarityClass(sideGun?.rarity)" v-if="sideGun">
          <img :src="getItemImage(sideGun.itemType)" alt="SideGun" />
        </div>
        <div class="item empty" v-else></div>
        <div class="tooltip" v-if="hoveredItem === sideGun && sideGun">
          <h3>{{ sideGun.itemTypeName }}</h3>
          <p>Rarity: {{ sideGun.rarityName }}</p>
          <p>Stats: <span class="text-green-accent-3">{{ sideGun.stats }}</span></p>
          <p>Token ID: {{ sideGun.tokenId }}</p>
        </div>
      </div>

      <!-- Bottom Right (Armor) -->
      <div class="item-slot bottom-right" @mouseover="showTooltip(armor)" @mouseleave="hideTooltip" @click="openDialog(armor)">
        <div class="item" :class="getRarityClass(armor?.rarity)" v-if="armor">
          <img :src="getItemImage(armor.itemType)" alt="Armor" />
        </div>
        <div class="item empty" v-else></div>
        <div class="tooltip" v-if="hoveredItem === armor && armor">
          <h3>{{ armor.itemTypeName }}</h3>
          <p>Rarity: {{ armor.rarityName }}</p>
          <p>Stats: <span class="text-green-accent-3">{{ armor.stats }}</span></p>
          <p>Token ID: {{ armor.tokenId }}</p>
        </div>
      </div>
    </div>

    <!-- Dialog -->
    <div class="dialog-overlay" v-if="showDialog" @click.self="closeDialog">
      <div class="dialog">
        <h2>{{ selectedItem.itemTypeName }}</h2>
        <img :src="getItemImage(selectedItem.itemType)" :alt="selectedItem.itemTypeName" class="dialog-image" />
        <p><strong>Rarity:</strong> {{ selectedItem.rarityName }}</p>
        <p><strong>Stats:</strong> <span class="font-weight-bold text-green-accent-3">{{ selectedItem.stats }}</span></p>
        <p><strong>Token ID:</strong> {{ selectedItem.tokenId }}</p>
        <p><strong>Stats:</strong> {{ selectedItem.tokenId }}</p>
        <div class="d-flex ga-4 justify-center">
          <v-btn color="red-lighten-1" @click="unequipItem">Unequip</v-btn>
          <v-btn @click="closeDialog">Close</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WingGunImg from "@/assets/bag/WingGun.webp";
import MainGunImg from "@/assets/bag/MainGun.webp"
import SideGunImg from "@/assets/bag/SideGun.webp";
import HPImg from "@/assets/bag/HP.webp"
import ArmorImg from "@/assets/bag/Armor.webp";
export default {
  name: 'EquipmentDisplay',
  props: {
    equippedItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      hoveredItem: null,
      showDialog: false,
      selectedItem: null
    }
  },
  computed: {
    mainGun() {
      return this.equippedItems.find(item => item.itemType === 0)
    },
    wingGun() {
      return this.equippedItems.find(item => item.itemType === 1)
    },
    sideGun() {
      return this.equippedItems.find(item => item.itemType === 2)
    },
    hp() {
      return this.equippedItems.find(item => item.itemType === 3)
    },
    armor() {
      return this.equippedItems.find(item => item.itemType === 4)
    }
  },
  methods: {
    showTooltip(item) {
      this.hoveredItem = item
    },
    hideTooltip() {
      this.hoveredItem = null
    },
    getRarityClass(rarity) {
      switch(rarity) {
        case 0: return 'common'
        case 1: return 'uncommon'
        default: return 'common'
      }
    },
    getItemImage(itemType) {
      const images = {
        0: MainGunImg, // MainGun
        1: WingGunImg, // WingGun
        2: SideGunImg, // SideGun
        3: HPImg, // HP
        4: ArmorImg, // Armor
      }
      return images[itemType] || '/images/default.png'
    },
    openDialog(item) {
      if (item) {
        this.selectedItem = item
        this.showDialog = true
      }
    },
    closeDialog() {
      this.showDialog = false
      this.selectedItem = null
    },

    unequipItem() {
      this.$emit('unequip', this.selectedItem.itemType)
      this.closeDialog()
    }
  }
}
</script>

<style scoped>
.equipment-container {
  position: relative;
  padding: 90px 50px 35px 50px;
  width: 350px;
  height: 410px;
  margin: 0px auto;
  background: url("@/assets/image/bg-equipment.webp");
  background-size: cover;
}

.title-item {
  position: absolute;
  z-index: 2;
  font-size: 28px;
  left: 43px;
  top: -68px;
  font-family: "Comic Sans MS", sans-serif;
}

.item-slot {
  position: absolute;
  width: 80px;
  height: 80px;
}

.item {
  width: 100%;
  height: 100%;
  border: 2px solid #666;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}

.item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.empty {
  background-color: #2a2a2a; /* Dark theme empty slot */
  border: 2px dashed #555;
}

.top-left {
  top: 0;
  left: 0;
}

.top-right {
  top: 0;
  right: 0;
}

.center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.bottom-left {
  bottom: 0;
  left: 0;
}

.bottom-right {
  bottom: 0;
  right: 0;
}

.common {
  background-color: #f0f0f0;
}

.uncommon {
  background-color: #d4edda;
}

.tooltip {
  position: absolute;
  background-color: #333;
  color: white;
  padding: 10px;
  border-radius: 4px;
  z-index: 10;
  font-size: 12px;
  min-width: 150px;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.tooltip h3 {
  margin: 0 0 5px 0;
}

.tooltip p {
  margin: 2px 0;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Darker overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.dialog {
  border: solid 5px #F57F17;
  border-radius: 16px;
  background: #1e1e1e; /* Dark theme background */
  color: #e0e0e0; /* Light text */
  padding: 20px;
  width: 300px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.dialog-image {
  width: 100px;
  height: 100px;
  margin: 10px 0;
  object-fit: cover;
  border: 1px solid #444;
}

.dialog h2 {
  margin: 0 0 10px 0;
  color: #fff;
}

.dialog p {
  margin: 5px 0;
}

.dialog p strong {
  color: #bbb;
}

.dialog button {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #3a5fc6; /* Dark theme button */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dialog button:hover {
  background-color: #2a4a9e; /* Darker hover */
}
</style>
