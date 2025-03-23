<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h1 class="text-center">Random Box NFT</h1>

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
                :src="currentImage"
                max-width="300"
                class="mx-auto mb-4"
                :class="{ 'shake-animation': opening }"
              />

              <v-btn
                color="primary"
                @click="openBox"
                :loading="opening"
                large
                :disabled="opening"
              >
                Open Random Box
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
  </v-container>
</template>

<script>
import Web3 from 'web3'
import contractABI from '@/assets/abi/RandomBoxNFT.json'

export default {
  data() {
    return {
      web3: null,
      contract: null,
      account: null,
      connected: false,
      connecting: false,
      opening: false,
      lastResult: null,
      contractAddress: '0x6830797e6Ee711CEAa83970Fad3f164A417BAe9f',
      // Images
      closedBox: 'https://as2.ftcdn.net/jpg/10/59/31/07/1000_F_1059310793_vzlepkAxaODyOzQ1XWVY91ec00Ub17B3.webp', // Thay bằng URL ảnh hộp đóng
      openingBox: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExanAzZTBwbm41Z2ZxdnI2MHp1ZmlkNnF4bnM2ZnliaWM5aDRpd20zYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vRebb6HyeIgvmQ8/giphy.gif', // Thay bằng URL ảnh động khi mở
      currentImage: ''
    }
  },

  computed: {
    // Chọn ảnh hiển thị dựa trên trạng thái
    currentImage() {
      return this.opening ? this.openingBox : this.closedBox
    }
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
.box-container {
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
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
