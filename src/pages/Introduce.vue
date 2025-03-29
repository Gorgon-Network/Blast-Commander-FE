<template>
  <v-app>
    <!-- Header Section with Start Game Button -->
    <v-parallax height="600" class="header-parallax">
      <v-container class="text-center d-flex flex-column align-center justify-center mt-10">
        <h1 class="display-2 white--text animate-title title-big">Blast</h1>
        <v-btn @click="startGame" class="start-game-btn cursor-pointer mt-4" color="primary" x-large>Start Game</v-btn>
        <h2 class="white--text mt-4">Conquer the Cosmos, Earn Rewards.</h2>
      </v-container>
    </v-parallax>

    <v-container>
      <div class="night">
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
      </div>
      <!-- About Section -->
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>About Blast</h2>
            <p>Embark on an epic space battle adventure on the Linea blockchain, where thrilling action, captivating
              exploration, and unique NFT-based rewards come together to create an unforgettable gaming experience.</p>
          </v-col>
          <v-col cols="12" md="6">
            <!-- Add image or interactive graphic here -->
          </v-col>
        </v-row>
      </v-container>

      <!--    High light-->
      <v-container class="stats-section text-center my-12">
        <v-row align="center" justify="center">
          <v-col cols="12">
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
            <v-card outlined class="feature-card min-h-full">
              <v-card-title>{{ feature.title }}</v-card-title>
              <v-card-text>{{ feature.description }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <v-container>
      <div class="container-plane">
        <div class="view-plane">
          <div class="plane main">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </v-container>

    <!-- Roadmap Section -->
    <v-container class="roadmap-section">
      <h2 class="text-center mb-8">Project Roadmap</h2>
      <v-timeline align="start">
        <v-timeline-item>
          <template v-slot:opposite>
          </template>
          <div>
            <div class="roadmap-text-1">Phase 1: Gameplay Enhancements</div>
            <div class="roadmap-text-2 cl-ffcc00">Boss Battles and World Exploration</div>
            <ul>
              <li>Elevate the gameplay experience with the introduction of boss battle modes and immersive exploration
                mechanics.</li>
              <li>Allow players to delve deeper into the Blast universe, uncovering challenges and rewards along
                the way.</li>
            </ul>
          </div>
        </v-timeline-item>

        <v-timeline-item>
          <template v-slot:opposite>
          </template>
          <div>
            <div class="roadmap-text-1">Phase 2: NFT Box Opening</div>
            <div class="roadmap-text-2 cl-ffcc00">Discover Unique Items and Build Powerful Combos</div>
            <ul>
              <li>Open NFT boxes to acquire rare and unique items.</li>
              <li>Combine these items strategically to create powerful combos, enhancing your in-game abilities and
                overall strategy.</li>
            </ul>
          </div>
        </v-timeline-item>

        <v-timeline-item>
          <template v-slot:opposite>
          </template>
          <div>
            <div class="roadmap-text-1">Phase 3: Community Building</div>
            <div class="roadmap-text-2 cl-ffcc00">Fostering a Sustainable Ecosystem</div>
            <ul>
              <li>Focus on growing the community and establishing a long-term, sustainable ecosystem.</li>
              <li>Ensure player engagement and the longevity of Blast by nurturing a vibrant and active player
                base.</li>
            </ul>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-container>

    <!-- Footer -->
    <v-footer class="stats-card" app>
      <v-container>
        <v-row>
          <v-col>© Blast {{ year }}</v-col>
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
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()
const year = new Date().getFullYear();
const usersCount = ref(1250);
const nftsMinted = ref(3400);
const transactionsCount = ref(12000);
const features = ref([
  { title: 'Blockchain-Based', description: 'Built on the robust foundation of the Linea zkEVM network, this platform leverages the power of web3 dApps, delivering rapid processing speeds and minimal transaction fees. It’s a seamless blend of efficiency and innovation, making it the perfect choice for blockchain gaming.' },
  { title: 'NFT Gaming', description: 'Experience immersive space combat gameplay brought to life on the blockchain platform. Engage in thrilling battles, unlock exclusive NFT rewards, and conquer challenging levels designed to test your skills and strategy.' },
  { title: 'Community and Ecosystem', description: 'Join a vibrant community of gamers and blockchain enthusiasts, where collaboration and competition drive innovation. With regular updates, exclusive events, and opportunities to trade or showcase NFTs, the ecosystem ensures an engaging and ever-evolving experience.' },
],);

const resources = import.meta.glob('@/assets/item/**/*.{png,jpg,jpeg,gif,svg,mp4}', { eager: true });
const getFileUrl = (filename) => {
  const filePath = Object.keys(resources).find((path) => path.includes(filename));
  if (filePath) {
    return new URL(filePath, import.meta.url).href;
  } else {
    console.error(`File not found: ${filename}`);
    return null;
  }
};
const ship = getFileUrl('5_all.png');

const startGame = () => {
  router.push('/');
}

function openTwt() {
  window.open('https://x.com/lineanftSword', '_blank');
}

</script>

<style scoped lang="scss">
.min-h-full {
  min-height: 100%;
}

.v-container {
  position: relative;
}

.header-parallax {
  position: relative;
  overflow: hidden;
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(1.1);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.header-parallax::before,
.header-parallax::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.15), transparent 70%),
    radial-gradient(circle at 50% 50%, rgba(173, 216, 230, 0.4), rgba(25, 25, 112, 0.1) 80%);
  opacity: 0.4;
  mix-blend-mode: screen;
  animation: rotateVortex 30s linear infinite;
  transform: translate(-50%, -50%) scale(1.5);
}

.header-parallax::after {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 2px, transparent 4px),
    radial-gradient(circle, rgba(255, 255, 255, 0.1) 2px, transparent 4px);
  background-size: 100px 100px;
  opacity: 0.6;
  animation: moveStars 20s linear infinite;
}

@keyframes rotateVortex {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1.5);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg) scale(1.5);
  }
}

@keyframes moveStars {
  0% {
    transform: translate(0px, 0px);
  }

  100% {
    transform: translate(80px, 80px);
  }
}

.animate-title {
  animation: slideIn 1.5s ease-out;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Start Game Button Styling */
.start-game-btn {
  z-index: 999;
  display: flex;
  align-items: center;
  font-size: clamp(24px, 3vw, 48px);
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 50px;
  height: fit-content;
  width: fit-content;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }

  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
}

.roadmap-section {
  background-color: rgba(33, 33, 33, 0.5);
  color: #fff;
  padding: 32px 32px 70px 32px;
  border-radius: 8px;
  margin-top: 48px;
  margin-bottom: 96px;
}

h2 {
  color: #ffcc00;
}

.cl-ffcc00 {
  color: #ffcc00;
}

.v-card-title,
.v-card-subtitle {
  color: #fff;
}

.v-timeline-item__dot {
  border: 2px solid #fff;
}

.title-big {
  font-size: clamp(32px, 5vw, 72px);
  margin-top: 48px;
}

.stats-card {
  background-color: rgba(0, 0, 0, 0.2);
}

.stat-box,
.feature-card {
  background-color: rgba(33, 33, 33, 0.5);
}

// night ======================================================================
$shooting-time: 3000ms;

.night {
  position: absolute;
  width: 130%;
  height: 100%;
  left: -15%;
  transform: rotateZ(25deg);
}

.shooting_star {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 2px;
  background: linear-gradient(-45deg, rgba(38, 42, 44, 1), rgba(0, 0, 255, 0));
  border-radius: 999px;
  filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
  animation:
    tail $shooting-time ease-in-out infinite,
    shooting $shooting-time ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    height: 2px;
    background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
    transform: translateX(50%) rotateZ(45deg);
    border-radius: 100%;
    animation: shining $shooting-time ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    height: 2px;
    background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
    transform: translateX(50%) rotateZ(45deg);
    border-radius: 100%;
    animation: shining $shooting-time ease-in-out infinite;
    transform: translateX(50%) rotateZ(-45deg);
  }

  @for $i from 1 through 20 {
    &:nth-child(#{$i}) {
      $delay: random(9999) + 0ms;
      top: calc(40% - #{random(400) - 200px});
      left: calc(10% - #{random(800) - 800px});
      animation-delay: $delay;
      // opacity: random(50) / 100 + 0.5;

      &::before,
      &::after {
        animation-delay: $delay;
      }
    }
  }
}

@keyframes tail {
  0% {
    width: 0;
  }

  30% {
    width: 100px;
  }

  100% {
    width: 0;
  }
}

@keyframes shining {
  0% {
    width: 0;
  }

  50% {
    width: 60px;
  }

  100% {
    width: 0;
  }
}

@keyframes shooting {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(400px);
  }
}

@keyframes sky {
  0% {
    transform: rotate(45deg);
  }

  100% {
    transform: rotate(45 + 360deg);
  }
}

// night ======================================================================

.roadmap-text-1 {
  font-size: 48px;
}

.roadmap-text-2 {
  font-size: 32px;
}

@media (max-width: 600px) {
  .roadmap-text-1 {
    font-size: 32px;
  }

  .roadmap-text-2 {
    font-size: 24px;
  }

  .night {
    display: none;
  }
}

// view-plane ======================================================================
.container-plane {
  position: relative;
  width: 100%;
  height: 700px;
  margin: 48px 0px;
}

$l: 90px;
$num: 10;
$dur: 10s;

@mixin center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.view-plane {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  perspective: 400px;
}

.plane {
  width: 500px;
  height: 500px;
  transform-style: preserve-3d;

  &.main {
    @include center;
    transform: rotateX(60deg) rotateZ(-30deg);
    animation: rotate 20s infinite linear;

    .circle {
      width: 500px;
      height: 500px;
      position: absolute;
      transform-style: preserve-3d;
      border-radius: 100%;
      box-sizing: border-box;
      box-shadow: 0 0 60px rgba(95, 145, 255, 1), inset 0 0 60px rgba(95, 145, 255, 1);

      &::before,
      &::after {
        content: '';
        display: block;
        @include center;
        width: 2%;
        height: 2%;
        border-radius: 100%;
        background: rgba(95, 145, 255, 1);
        box-sizing: border-box;
        box-shadow: 0 0 60px 2px rgba(95, 145, 255, 1);
      }

      &::before {
        transform: translateZ(-$l);
      }

      &::after {
        transform: translateZ($l);
      }

      @for $i from 1 through 5 {
        &:nth-child(#{$i}) {
          transform: rotateZ(calc(#{$i} / 5 * 360deg)) rotateX(63.435deg);
        }
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotateX(0) rotateY(0) rotateZ(0);
  }

  100% {
    transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
  }
}

@media (max-width: 600px) {
  .container-plane {
    position: relative;
    width: 100%;
    height: 250px;
    margin: 24px 0px;
  }

  .box {
    width: 200px;
    height: 200px;
  }

  .plane {
    width: 200px;
    height: 200px;

    &.main {
      .circle {
        width: 200px;
        height: 200px;
      }
    }
  }
}
</style>
