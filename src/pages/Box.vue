<template>
  <v-container>
    <v-row class="pa-4 d-flex justify-center ga-4" justify="center">
      <v-btn color="green-accent-3" @click="$router.push('/equipment')">
        <v-icon>mdi-bag-personal</v-icon>
        Equipment
      </v-btn>
      <v-btn color="primary" @click="$router.push('/test')">
        <v-icon>mdi-play</v-icon>
        Play Game
      </v-btn>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6" class=" bg-mint text-yellow-darken-3">
        <h1 class="text-center">OPEN BOX NFT EQUIPMENT</h1>

        <!-- Connect Wallet Button -->
        <div class="text-center" v-if="!connected">
          <v-btn
            color="primary"
            @click="connectWallet"
            :loading="connecting"
            large
          >
            Connect Wallet
          </v-btn>
        </div>

        <!-- Main Content -->
        <div v-else>
          <div class="text-center">
            <p>Connected: {{ account.slice(0,6) }}...{{ account.slice(-4) }}</p>

            <!-- Box Container -->
            <div class="box-container">
              <v-img
                src="@/assets/image/nft-demo.webp"
                max-width="300"
                class="mx-auto mb-4"
                :class="{ 'shake-animation': opening }"
              />

              <v-btn
                class="mint-button"
                color="yellow-lighten-1"
                @click="openBox"
                :loading="opening"
                large
                :disabled="opening"
              >
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

</template>

<script>
import Web3 from 'web3'
import contractABI from '@/assets/abi/RandomBoxNFT.json'
import WalletItems from "@/components/WalletItems.vue";
import { store } from "@/store/store";

export default {
  components: {WalletItems},
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
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          const accounts = await this.web3.eth.getAccounts()
          this.account = accounts[0]
          this.connected = true

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

      this.opening = true
      try {
        const result = await this.contract.methods
          .openBox()
          .send({ from: this.account })

        this.lastResult = result.events.BoxOpened.returnValues.tokenId

        // Delay để hiển thị animation trước khi reset
        setTimeout(() => {
          this.opening = false
        }, 2000) // Thời gian animation 2 giây
      } catch (error) {
        console.error('Error opening box:', error)
        alert('Failed to open box')
        this.opening = false
      }
    }
  },

  created() {
    this.currentImage = this.closedBox
    if (window.ethereum && window.ethereum.selectedAddress) {
      this.connectWallet()
    }
  }
}
</script>

<style scoped>
.bg-mint {
  background: url("@/assets/image/bg-nft.webp");
  background-size: cover;
  font-family: "Comic Sans MS", sans-serif;
}
.box-container {
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;

  .mint-button {
    position: absolute;
    top: 251px;
    left: calc(50% - 50px);
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
  color: #4CAF50;
  font-weight: bold;
  text-align: center;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
