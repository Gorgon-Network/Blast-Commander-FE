<template>
  <v-container fluid class="bg-item-equipped">
    <v-row class="pa-4 d-flex justify-center ga-4" justify="center">
      <v-btn color="amber-lighten-2" @click="$router.push('/')">
        <v-icon style="font-size: 32px" class="text-red-darken-4">mdi-home</v-icon>
      </v-btn>

      <v-btn color="amber-lighten-2" @click="$router.push('/box')">
        <v-icon class="mr-2" color="red-darken-4">mdi-gift-open</v-icon>
        <span class="text-red-darken-4">Open Box</span>
      </v-btn>
      <v-btn color="primary" @click="$router.push('/test')">
        <v-icon class="mr-2" color="yellow-darken-2">mdi-play</v-icon>
        Play Game
      </v-btn>
    </v-row>

    <!-- Loading -->
    <v-row v-if="loading">
      <v-col>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <!-- Danh sách item đang trang bị -->
    <v-row v-else>
      <v-col class="d-flex justify-center">
        <div>
          <ItemEquipped :equipped-items="equippedItems"  @unequip="unequipItem" />
        </div>
      </v-col>
    </v-row>

    <!-- Danh sách NFT sở hữu -->
    <v-row>
      <v-col>
        <h2 class="mb-4 text-center">List of NFTs owned</h2>
        <v-sheet
          v-if="nfts.length > 0"
          class="scrollable-section wh-box"
          max-height="400px"
          elevation="2"
        >
          <v-row>
            <v-col v-for="(nft, index) in nfts" :key="index" cols="6" sm="3" md="2">
              <v-card :class="getRarityBorderClass(nft.rarity)" class="nft-card">
                <v-img :src="getItemImage(nft.itemType)" height="120px" class="ma-4"></v-img>
                <v-card-title class="bd-top text-red-darken-4">ID: {{ nft.tokenId }}</v-card-title>
                <v-card-text>
                  <p class="text-red-darken-4"><strong>Type:</strong> {{ itemTypeToString(nft.itemType) }}</p>
                  <p class="text-red-darken-4"><strong>Rarity:</strong> {{ rarityToString(nft.rarity) }}</p>
                  <v-btn
                    @click="equipItem(nft.tokenId)"
                    color="primary"
                    :disabled="isEquipped(nft.tokenId) || isTypeEquipped(nft.itemType)"
                    small
                    class="mt-4 w-100"
                  >
                    Equip
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
        <v-alert v-else-if="!loading && walletAddress" type="info">
          Không tìm thấy NFT nào cho địa chỉ này.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemEquipped from '@/components/ItemEquipped.vue'
import { ethers } from "ethers";
import { store } from "@/store/store"; // Import store
import contractABI from '@/assets/abi/RandomBoxNFT.json';
import WingGunImg from "@/assets/bag/WingGun.webp";
import MainGunImg from "@/assets/bag/MainGun.webp";
import SideGunImg from "@/assets/bag/SideGun.webp";
import HPImg from "@/assets/bag/HP.webp";
import ArmorImg from "@/assets/bag/Armor.webp";
import DefaultImg from "@/assets/bag/Armor.webp";
import {_connectWallet} from "@/store/ultil";

export default {
  components: {ItemEquipped},
  data() {
    console.log(11, store.state);
    return {
      walletAddress: "" || "", // Lấy walletAddress từ store
      nfts: [],
      equippedItems: [],
      loading: false,
      contractAddress: store.state.contractAddress, // Địa chỉ contract
      apiBaseUrl: "https://api.blast-commander.xyz/api/item", // URL của API
      itemImages: {
        0: MainGunImg,
        1: WingGunImg,
        2: SideGunImg,
        3: HPImg,
        4: ArmorImg,
      },
    };
  },
  created() {
    if (this.walletAddress) {
      this.fetchData();
    } else {
     this.connect();
    }
  },
  methods: {
    async connect() {
      const {signer} = await _connectWallet();
      this.walletAddress = signer.address;
      store.commit("setWallet", this.walletAddress);
      this.fetchData();
    },
    async fetchData() {
      if (!this.walletAddress) {
        alert("Không có địa chỉ ví để lấy dữ liệu!"); // Thay $toast bằng alert
        return;
      }
      this.loading = true;
      this.nfts = [];
      this.equippedItems = [];

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(this.contractAddress, contractABI, provider);
        const [tokenIds, items] = await contract.getNFTsByAddress(this.walletAddress);
        this.nfts = tokenIds.map((tokenId, index) => ({
          tokenId: tokenId.toString(),
          itemType: items[index].itemType,
          rarity: items[index].rarity,
        }));

        const response = await fetch(`${this.apiBaseUrl}/details/${this.walletAddress}`);
        const data = await response.json();
        this.equippedItems = data.equippedItems || [];
      } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra khi lấy dữ liệu!"); // Thay $toast bằng alert
      } finally {
        this.loading = false;
      }
    },
    async equipItem(tokenId) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/equip`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ walletAddress: this.walletAddress, tokenId }),
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.message); // Thay $toast.success bằng alert
          await this.fetchData();
        } else {
          alert(data.error); // Thay $toast.error bằng alert
        }
      } catch (error) {
        console.error(error);
        alert("Lỗi khi trang bị item!"); // Thay $toast.error bằng alert
      }
    },
    async unequipItem(itemType) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/unequip`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ walletAddress: this.walletAddress, itemType }),
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.message); // Thay $toast.success bằng alert
          await this.fetchData();
        } else {
          alert(data.error); // Thay $toast.error bằng alert
        }
      } catch (error) {
        console.error(error);
        alert("Lỗi khi tháo item!"); // Thay $toast.error bằng alert
      }
    },
    itemTypeToString(itemType) {
      const types = ["MainGun", "WingGun", "SideGun", "HP", "Armor"];
      return types[itemType] || "Unknown";
    },
    rarityToString(rarity) {
      const rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
      return rarities[rarity] || "Unknown";
    },
    getItemImage(itemType) {
      return this.itemImages[itemType] || DefaultImg;
    },
    getRarityBorderClass(rarity) {
      const rarityClasses = {
        0: "common-border",
        1: "uncommon-border",
        2: "rare-border",
        3: "epic-border",
        4: "legendary-border",
      };
      return rarityClasses[rarity] || "common-border";
    },
    isEquipped(tokenId) {
      return this.equippedItems.some((item) => item.tokenId === tokenId);
    },
    isTypeEquipped(itemType) {
      return this.equippedItems.some((item) => item.itemType === itemType);
    },
  },
};
</script>

<style scoped>
.bg-item-equipped {
  background: url("@/assets/image/bg-nft.webp");
  background-size: cover;
  font-family: "Comic Sans MS", sans-serif;
  @media (max-width: 1023px) {
    width: unset;
  }
}
.nft-card {
  margin-bottom: 16px;
  transition: transform 0.2s;
  border-radius: 8px;
  background-color: #FFD54F;
}
.nft-card:hover {
  transform: scale(1.05);
}
.bd-top {
  border-top: 1px solid #e0e0e0;
  font-size: 18px;
}
.scrollable-section {
  overflow-y: auto;
  padding: 16px;
}
.common-border {
  border: 3px solid #757575; /* Xám cho Common */
}
.uncommon-border {
  border: 3px solid #4caf50; /* Xanh lá cho Uncommon */
}
.rare-border {
  border: 3px solid #2196f3; /* Xanh dương cho Rare */
}
.epic-border {
  border: 3px solid #9c27b0; /* Tím cho Epic */
}
.legendary-border {
  border: 3px solid #ff9800; /* Cam cho Legendary */
}
.bgr-FFD54F {
  background-color: #FFD54F;
}
</style>
