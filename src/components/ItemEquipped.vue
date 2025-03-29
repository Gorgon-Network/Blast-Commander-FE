<template>
  <div class="equipment-container">
    <!-- Top Left (MainGun) -->
    <div class="item-slot top-left" @mouseover="showTooltip(mainGun)" @mouseleave="hideTooltip">
      <div class="item" :class="getRarityClass(mainGun?.rarity)" v-if="mainGun">
        <img :src="getItemImage(mainGun.itemType)" alt="MainGun" />
      </div>
      <div class="item empty" v-else></div>
      <div class="tooltip" v-if="hoveredItem === mainGun && mainGun">
        <h3>{{ mainGun.itemTypeName }}</h3>
        <p>Rarity: {{ mainGun.rarityName }}</p>
        <p>Stats: {{ mainGun.stats }}</p>
        <p>Token ID: {{ mainGun.tokenId }}</p>
      </div>
    </div>

    <!-- Top Right (WingGun) -->
    <div class="item-slot top-right" @mouseover="showTooltip(wingGun)" @mouseleave="hideTooltip">
      <div class="item" :class="getRarityClass(wingGun?.rarity)" v-if="wingGun">
        <img :src="getItemImage(wingGun.itemType)" alt="WingGun" />
      </div>
      <div class="item empty" v-else></div>
      <div class="tooltip" v-if="hoveredItem === wingGun && wingGun">
        <h3>{{ wingGun.itemTypeName }}</h3>
        <p>Rarity: {{ wingGun.rarityName }}</p>
        <p>Stats: {{ wingGun.stats }}</p>
        <p>Token ID: {{ wingGun.tokenId }}</p>
      </div>
    </div>

    <!-- Center (HP) -->
    <div class="item-slot center" @mouseover="showTooltip(hp)" @mouseleave="hideTooltip">
      <div class="item" :class="getRarityClass(hp?.rarity)" v-if="hp">
        <img :src="getItemImage(hp.itemType)" alt="HP" />
      </div>
      <div class="item empty" v-else></div>
      <div class="tooltip" v-if="hoveredItem === hp && hp">
        <h3>{{ hp.itemTypeName }}</h3>
        <p>Rarity: {{ hp.rarityName }}</p>
        <p>Stats: {{ hp.stats }}</p>
        <p>Token ID: {{ hp.tokenId }}</p>
      </div>
    </div>

    <!-- Bottom Left (SideGun) -->
    <div class="item-slot bottom-left" @mouseover="showTooltip(sideGun)" @mouseleave="hideTooltip">
      <div class="item" :class="getRarityClass(sideGun?.rarity)" v-if="sideGun">
        <img :src="getItemImage(sideGun.itemType)" alt="SideGun" />
      </div>
      <div class="item empty" v-else></div>
      <div class="tooltip" v-if="hoveredItem === sideGun && sideGun">
        <h3>{{ sideGun.itemTypeName }}</h3>
        <p>Rarity: {{ sideGun.rarityName }}</p>
        <p>Stats: {{ sideGun.stats }}</p>
        <p>Token ID: {{ sideGun.tokenId }}</p>
      </div>
    </div>

    <!-- Bottom Right (Armor) -->
    <div class="item-slot bottom-right" @mouseover="showTooltip(armor)" @mouseleave="hideTooltip">
      <div class="item" :class="getRarityClass(armor?.rarity)" v-if="armor">
        <img :src="getItemImage(armor.itemType)" alt="Armor" />
      </div>
      <div class="item empty" v-else></div>
      <div class="tooltip" v-if="hoveredItem === armor && armor">
        <h3>{{ armor.itemTypeName }}</h3>
        <p>Rarity: {{ armor.rarityName }}</p>
        <p>Stats: {{ armor.stats }}</p>
        <p>Token ID: {{ armor.tokenId }}</p>
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
      hoveredItem: null
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
    }
  }
}
</script>

<style scoped>
.equipment-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 20px auto;
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
  background-color: #e0e0e0;
  border: 2px dashed #999;
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
</style>
