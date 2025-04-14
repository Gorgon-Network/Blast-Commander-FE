<template>
  <v-container>
    <v-btn icon @click="fetchNFTs">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-row v-if="loading">
      <v-col>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else-if="nfts.length > 0">
      <v-col v-for="(nft, index) in nfts" :key="index" cols="12" sm="4" md="3">
        <v-card :class="getRarityBorderClass(nft.rarity)" class="nft-card">

          <v-card-title>Token ID: {{ nft.tokenId }}</v-card-title>
          <v-card-text>
            <div class="d-flex align-center ga-4">
              <v-img
              :src="getItemImage(nft.itemType)"
              height="100px"
              class="nft-image"
            ></v-img>
              <div>
                <p><strong>Type:</strong> {{ itemTypeToString(nft.itemType) }}</p>
                <p><strong>Rarity:</strong> {{ rarityToString(nft.rarity) }}</p>
              </div>
            </div>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-alert type="info">No NFTs found for this address.</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ethers } from "ethers";
import contractABI from '@/assets/abi/RandomBoxNFT.json'
import WingGunImg from "@/assets/bag/WingGun.webp";
import MainGunImg from "@/assets/bag/MainGun.webp"
import SideGunImg from "@/assets/bag/SideGun.webp";
import HPImg from "@/assets/bag/HP.webp"
import ArmorImg from "@/assets/bag/Armor.webp";
import { store } from "@/store/store";
export default {
  data() {
    return {
      account: null,
      nfts: [],
      loading: false,
      contractAddress: store.state.contractAddress,
      itemImages: {
        0: MainGunImg, // MainGun
        1: WingGunImg, // WingGun
        2: SideGunImg, // SideGun
        3: HPImg, // HP
        4: ArmorImg, // Armor
      },
    };
  },
  props: {
    connectedAccount: {
      type: String, // Hoặc Object nếu chứa nhiều thông tin hơn
      required: true,
    },
    contract: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.fetchNFTs();
  },
  methods: {
    async fetchNFTs() {
      if (!this.connectedAccount) {
        this.$toast.error("Vui lòng nhập địa chỉ ví!");
        return;
      }

      this.loading = true;
      this.nfts = [];

      try {
        // Kết nối với provider (ở đây dùng MetaMask hoặc mạng public)
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(this.contractAddress, contractABI, provider);

        // Gọi hàm getNFTsByAddress từ contract
        const [tokenIds, items] = await contract.getNFTsByAddress(this.connectedAccount);

        // Kết hợp tokenIds và items thành một mảng NFT
        this.nfts = tokenIds.map((tokenId, index) => ({
          tokenId: tokenId.toString(),
          itemType: items[index].itemType,
          rarity: items[index].rarity,
        }));
      } catch (error) {
        console.error(error);
        this.$toast.error("Có lỗi xảy ra khi lấy danh sách NFT!");
      } finally {
        this.loading = false;
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
      return this.itemImages[itemType] || "https://via.placeholder.com/200?text=Unknown";
    },
    getRarityBorderClass(rarity) {
      const rarityClasses = {
        0: "common-border", // Common
        1: "uncommon-border", // Uncommon
        2: "rare-border", // Rare
        3: "epic-border", // Epic
        4: "legendary-border", // Legendary
      };
      return rarityClasses[rarity] || "common-border";
    },
  },

};
</script>

<style scoped>
.v-card {
  margin-bottom: 16px;
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
</style>
