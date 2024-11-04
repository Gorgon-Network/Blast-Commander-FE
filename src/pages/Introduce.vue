<template>
  <v-app>
    <!-- Header Section with Start Game Button -->
    <v-parallax height="600" class="header-parallax">
      <v-container class="text-center d-flex flex-column align-center justify-center">
        <h1 class="display-2 white--text animate-title">ChronoVortex: Space Conquest</h1>
        <v-btn @click="startGame" class="start-game-btn cursor-pointer mt-4" color="primary" x-large>Start Game</v-btn>
        <p class="white--text mt-4">Conquer the Cosmos, Earn Rewards.</p>
      </v-container>
    </v-parallax>

    <!-- About Section -->
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h2>About ChronoVortex</h2>
          <p>Discover an epic space battle game on the Linea blockchain, combining action, exploration, and NFT-based rewards.</p>
        </v-col>
        <v-col cols="12" md="6">
          <!-- Add image or interactive graphic here -->
        </v-col>
      </v-row>
    </v-container>

  <!--    High light-->
    <v-container class="stats-section text-center my-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="8">
          <v-card class="stats-card pa-6">
            <h2 class="mb-6">Project Statistics</h2>
            <v-row dense>
              <!-- Number of Users -->
              <v-col cols="12" sm="4">
                <v-card class="stat-box pa-4" outlined>
                  <v-icon class="stat-icon mb-2" color="blue">mdi-account-multiple</v-icon>
                  <h3 class="stat-value">{{ usersCount }}</h3>
                  <p class="stat-label">Total Users</p>
                </v-card>
              </v-col>

              <!-- NFTs Minted -->
              <v-col cols="12" sm="4">
                <v-card class="stat-box pa-4" outlined>
                  <v-icon class="stat-icon mb-2" color="purple">mdi-cube-outline</v-icon>
                  <h3 class="stat-value">{{ nftsMinted }}</h3>
                  <p class="stat-label">NFTs Minted</p>
                </v-card>
              </v-col>

              <!-- Transactions -->
              <v-col cols="12" sm="4">
                <v-card class="stat-box pa-4" outlined>
                  <v-icon class="stat-icon mb-2" color="green">mdi-swap-horizontal</v-icon>
                  <h3 class="stat-value">{{ transactionsCount }}</h3>
                  <p class="stat-label">Transactions</p>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Features Section -->
    <v-container>
      <v-row>
        <v-col v-for="feature in features" :key="feature.title" cols="12" md="4">
          <v-card outlined class="feature-card">
            <v-card-title>{{ feature.title }}</v-card-title>
            <v-card-text>{{ feature.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Roadmap Section -->
    <v-container class="roadmap-section my-12">
      <h2 class="text-center mb-8">Project Roadmap</h2>
      <v-timeline align-top dense>
        <!-- Phase 1 -->
        <v-timeline-item color="indigo" icon="mdi-rocket" fill-dot>
          <v-card class="pa-4">
            <v-card-title class="text-h5">Phase 1: Gameplay Enhancements</v-card-title>
            <v-card-subtitle>Boss Battles and Exploration</v-card-subtitle>
            <v-card-text>
              Upgrade the gameplay experience by introducing boss battle modes and exploration elements, allowing players to dive deeper into the universe of ChronoVortex.
            </v-card-text>
          </v-card>
        </v-timeline-item>

        <!-- Phase 2 -->
        <v-timeline-item color="purple" icon="mdi-gift-outline" fill-dot>
          <v-card class="pa-4">
            <v-card-title class="text-h5">Phase 2: NFT Box Opening</v-card-title>
            <v-card-subtitle>New Items and Combo Creation</v-card-subtitle>
            <v-card-text>
              Open NFT boxes to discover unique items. Combine items to create powerful combos and enhance your in-game capabilities.
            </v-card-text>
          </v-card>
        </v-timeline-item>

        <!-- Phase 3 -->
        <v-timeline-item color="green" icon="mdi-account-group-outline" fill-dot>
          <v-card class="pa-4">
            <v-card-title class="text-h5">Phase 3: Community Building</v-card-title>
            <v-card-subtitle>Long-Term Ecosystem Development</v-card-subtitle>
            <v-card-text>
              Focus on community growth and establish a sustainable ecosystem, ensuring the longevity and engagement of ChronoVortex’s player base.
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>

    <!-- Footer -->
    <v-footer color="grey darken-3" app>
      <v-container>
        <v-row>
          <v-col>© ChronoVortex 2024</v-col>
          <v-col>
            <v-icon @click="openTwt">mdi-twitter</v-icon>
            <v-icon>mdi-discord</v-icon>
            <!-- Add more icons as needed -->
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import {ref} from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()

const usersCount = ref(1250);
const nftsMinted = ref(3400);
const transactionsCount = ref(12000);
const features = ref([
  { title: 'Blockchain-Based', description: 'Built on the foundational network of Linea zkEVM, with the strength of web3 dapps, fast processing speeds, and low transaction fees, this is an ideal choice.'},
  { title: 'NFT Gaming', description: 'With familiar space combat gameplay, we bring users an experience on the blockchain platform, featuring exciting rewards and challenging difficulty levels' },
  // Add more features as needed
],);
const startGame = ()=> {
  router.push('/');
}

function openTwt() {
  window.open('https://x.com/lineanftSword','_blank');
}

</script>

<style scoped>
.header-parallax {
  position: relative;
  overflow: hidden;
  animation: fadeIn 2s ease-in-out;
}

/* Fade-in effect */
@keyframes fadeIn {
  0% { opacity: 0; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}

/* Galaxy Vortex and Stars */
.header-parallax::before,
.header-parallax::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%; /* Larger size for a prominent galaxy swirl */
  height: 100%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.15), transparent 70%),
  radial-gradient(circle at 50% 50%, rgba(173, 216, 230, 0.4), rgba(25, 25, 112, 0.1) 80%);
  opacity: 0.4;
  mix-blend-mode: screen;
  animation: rotateVortex 30s linear infinite;
  transform: translate(-50%, -50%) scale(1.5);
}

/* Moving Stars Layer */
.header-parallax::after {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 2px, transparent 4px),
  radial-gradient(circle, rgba(255, 255, 255, 0.1) 2px, transparent 4px);
  background-size: 100px 100px; /* Larger stars */
  opacity: 0.6;
  animation: moveStars 20s linear infinite;
}

/* Galaxy Swirl Animation */
@keyframes rotateVortex {
  0% { transform: translate(-50%, -50%) rotate(0deg) scale(1.5); }
  100% { transform: translate(-50%, -50%) rotate(360deg) scale(1.5); }
}

/* Stars Movement */
@keyframes moveStars {
  0% { transform: translate(0px, 0px); }
  100% { transform: translate(80px, 80px); }
}

/* Animate Title */
.animate-title {
  animation: slideIn 1.5s ease-out;
}

@keyframes slideIn {
  0% { opacity: 0; transform: translateY(-30px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Start Game Button Styling */
.start-game-btn {
  z-index: 999;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
  50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
}

.roadmap-section {
  background-color: #1a1a2e; /* Dark background for contrast */
  color: #fff; /* White text */
  padding: 2rem;
  border-radius: 8px;
}

h2 {
  color: #ffcc00; /* Highlight color for the title */
}

/* Card Styling */
.v-card-title, .v-card-subtitle {
  color: #fff;
}

/* Timeline Dot Styling */
.v-timeline-item__dot {
  border: 2px solid #fff;
}
</style>
