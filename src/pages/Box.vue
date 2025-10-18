<template>
  <div class="bg-mint">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-yellow-darken-3">
          <v-row class="d-flex justify-center" justify="center">
            <v-col cols="12" class="d-flex ga-4 justify-center">
              <v-btn color="amber-lighten-2" @click="$router.push('/')">
                <v-icon style="font-size: 32px" class="text-red-darken-4">mdi-home</v-icon>
              </v-btn>
              <v-btn color="green-accent-3" @click="$router.push('/equipment')">
                <v-icon class="mr-2" color="indigo-darken-4">mdi-bag-personal</v-icon>
                Inventory
              </v-btn>
              <v-btn color="primary" @click="$router.push('/game')">
                <v-icon class="mr-2" color="yellow-darken-2">mdi-play</v-icon>
                Start Game
              </v-btn>
            </v-col>
            <v-col cols="12" @click="getBalance" class="text-center d-flex ga-4 justify-center">
              <span class="balance text-amber-accent-4" style="font-size: 24px">Balance: {{ balance }} MON</span>
            </v-col>

          </v-row>
          <h1 class="text-center pt-4 parallax-shadow">OPEN BOX NFT EQUIPMENT</h1>

          <!-- Connect Wallet Button -->
          <div class="text-center" v-if="!connected">
            <v-btn color="primary" @click="connectWallet" :loading="connecting" large>
              Connect Wallet
            </v-btn>
          </div>

          <!-- Main Content -->
          <div v-else>
            <div class="text-center">
              <p>Connected: {{ account.slice(0, 6) }}...{{ account.slice(-4) }}</p>

              <!-- Box Container -->
              <div class="box-container">
                <v-img src="@/assets/image/nft-demo.webp" max-width="300" class="mx-auto mb-4"
                  :class="{ 'shake-animation': opening }" />

                <v-btn class="mint-button" color="yellow-lighten-1" @click="openBox" :loading="opening" large
                  :disabled="opening">
                  OPEN BOX
                </v-btn>
              </div>

              <!-- Result -->
              <v-slide-y-transition>
                <div v-if="lastResult" class="mt-4">
                  <p class="success-text">Congratulations! You got Token ID: {{ lastResult }}</p>
                </div>
              </v-slide-y-transition>
            </div>
          </div>
        </v-col>
      </v-row>

      <!--    <WalletItems v-if="connected"-->
      <!--    :connected-account="account"-->
      <!--    :contract="contract" />-->
    </v-container>
  </div>
  <!-- Dialog -->
  <div class="dialog-overlay" v-if="showDialog" @click.self="closeDialog">
    <div class="dialog">
      <h2>{{ mintedItem.itemTypeName }}</h2>
      <img :src="getItemImage(mintedItem.itemType)" :alt="mintedItem.itemTypeName" class="dialog-image" />
      <p><strong>Rarity:</strong> {{ mintedItem.rarityName }}</p>
      <p><strong>Stats:</strong> <span class="font-weight-bold text-green-accent-3">{{ mintedItem.stats }}</span></p>
      <p><strong>Token ID:</strong> {{ mintedItem.tokenId }}</p>
      <p><strong>Stats:</strong> {{ mintedItem.tokenId }}</p>
      <div class="d-flex ga-4 justify-center">
        <v-btn @click="closeDialog">Close</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import contractABI from '@/assets/abi/RandomBoxNFT.json'
import WalletItems from "@/components/WalletItems.vue";
import { store } from "@/store/store";
import MainGunImg from "@/assets/bag/MainGun.webp";
import WingGunImg from "@/assets/bag/WingGun.webp";
import SideGunImg from "@/assets/bag/SideGun.webp";
import HPImg from "@/assets/bag/HP.webp";
import ArmorImg from "@/assets/bag/Armor.webp";

export default {
  components: { WalletItems },
  data() {
    return {
      web3: null,
      contract: null,
      account: null,
      connected: false,
      connecting: false,
      opening: false,
      lastResult: null,
      contractAddress: store.state.contractAddress,
      showDialog: false,
      mintedItem: null,
      balance: 0,
    }
  },


  computed: {
    // Chọn ảnh hiển thị dựa trên trạng thái

  },

  methods: {
    async connectWallet() {
      this.connecting = true
      try {
        if (window.ethereum) {
          this.web3 = new Web3(window.ethereum)
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          // const MONAD_CHAIN_ID = '0x279f';
          // if (chainId !== MONAD_CHAIN_ID) {
          //   alert('You are using the wrong network. Please switch to the Monad network.');
          //   this.connecting = false;
          //   return;
          // }

          const accounts = await this.web3.eth.getAccounts();
          this.account = accounts[0];
          this.connected = true;
          this.getBalance();

          this.contract = new this.web3.eth.Contract(
            contractABI,
            this.contractAddress
          )
        } else {
          alert('Please install MetaMask!')
        }
      } catch (error) {
        console.error('Error connecting wallet:', error)
      }
      this.connecting = false
    },

    async openBox() {
      if (!this.connected) {
        alert('Please connect wallet first!')
        return
      }

      // const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      // const MONAD_CHAIN_ID = '0x279f';
      // if (chainId !== MONAD_CHAIN_ID) {
      //   alert('You are using the wrong network. Please switch to the Monad network.');
      //   this.connecting = false;
      //   return;
      // }

      this.opening = true
      try {
        const result = await this.contract.methods
          .openBox()
          .send({ from: this.account })

        this.lastResult = result.events.BoxOpened.returnValues.tokenId;

        this.mintedItem = result.events.BoxOpened.returnValues;
        this.showDialog = true;

        // Delay để hiển thị animation trước khi reset
        setTimeout(() => {
          this.opening = false
        }, 2000) // Thời gian animation 2 giây
      } catch (error) {
        console.error('Error opening box:', error)
        alert('Failed to open box')
        this.opening = false
      }
    },

    closeDialog() {
      this.showDialog = false
      this.mintedItem = null
    },

    getItemImage(itemType) {
      const images = {
        0: MainGunImg, // MainGun
        1: WingGunImg, // WingGun
        2: SideGunImg, // SideGun
        3: HPImg, // HP
        4: ArmorImg, // Armor
      }
      return images[itemType] || MainGunImg
    },

    async getBalance() {
      try {
        const balanceWei = await this.web3.eth.getBalance(this.account);
        // Giả định 18 decimals
        const balance = this.web3.utils.fromWei(balanceWei, "ether");
        this.balance = this.balance = Number(balance).toFixed(4);
        this.error = null;
      } catch (err) {
        this.error = "Failed to get balance: " + err.message;
      }
    },
  },

  created() {
    if (window.ethereum && window.ethereum.selectedAddress) {
      this.connectWallet();
      this.getBalance();
    }
  }
}
</script>

<style scoped>
.bg-mint {
  background: url("@/assets/image/bg-nft.webp");
  background-size: cover;
  font-family: "Comic Sans MS", sans-serif;
  height: 100vh;
}

.balance {
  padding: 4px 8px;
  background: #78909C;
  border-radius: 4px;
  font-weight: bold;
}

.box-container {
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;

  .mint-button {
    position: absolute;
    top: 245px;
    left: calc(50% - 70px);
    border: solid 4px #827717;
    border-radius: 16px;
    font-size: 16px;
    font-family: fantasy;
  }
}

.shake-animation {
  animation: shake 0.5s infinite;
}

.success-text {
  color: #FFFFFF;
  font-weight: bold;
  text-align: center;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }

  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }

  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }

  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }

  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }

  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }

  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }

  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }

  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }

  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }

  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  /* Darker overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.dialog {
  border: solid 5px #F57F17;
  border-radius: 16px;
  background: #1e1e1e;
  /* Dark theme background */
  color: #e0e0e0;
  /* Light text */
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
  background-color: #3a5fc6;
  /* Dark theme button */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dialog button:hover {
  background-color: #2a4a9e;
  /* Darker hover */
}
</style>
