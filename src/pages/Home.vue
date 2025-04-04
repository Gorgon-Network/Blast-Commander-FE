<template>
    <!-- font-luckiest font-baloo font-fredoka font-lilita -->
    <!-- <div class="parallax">
        <v-parallax class="header-parallax">

        </v-parallax>
    </div> -->
    <v-app class="font-fredoka z-2 sky-bgr">
        <v-container class="un-max-width pb-15">
            <div class="cloud-container z-1">
                <img src="/src/assets/cloud-1.png" class="cloud cloud-1 z-1" />
                <img src="/src/assets/cloud-2.png" class="cloud cloud-2 z-1" />
                <img src="/src/assets/cloud-3.png" class="cloud cloud-3 z-1" />
                <img src="/src/assets/cloud-4.png" class="cloud cloud-4 z-1" />
                <img src="/src/assets/cloud-1.png" class="cloud cloud-5 z-1" />
                <img src="/src/assets/cloud-2.png" class="cloud cloud-6 z-1" />
                <img src="/src/assets/cloud-3.png" class="cloud cloud-7 z-1" />
                <img src="/src/assets/cloud-4.png" class="cloud cloud-8 z-1" />
            </div>
            <v-row class="px-4 py-4">
                <v-col col="6" md="2" class="pa-0">
                    <v-img src="/src/assets/logo.png" class="z-100 logo"></v-img>
                </v-col>
                <v-col col="6" md="10" class="d-flex justify-end align-center z-100">
                    <!-- <v-icon icon="mdi-twitter"></v-icon> -->
                    <div class="icon-twitter cursor-pointer" @click="openTwt">
                        <svg viewBox="0 0 24 24" aria-hidden="true"
                            class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-lrsllp r-1nao33i r-16y2uox r-8kz0gk">
                            <g>
                                <path
                                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <v-btn class="glow-button" @click="navigateTo('box')">Mint Box</v-btn>
                    <v-btn class="glow-button" @click="navigateTo('equipment')">Inventory</v-btn>
                </v-col>
            </v-row>

            <v-row class="hero-box">
                <v-col cols="12" md="6" order="2" order-md="1">
                    <div class="parallax-text z-100">LET'S SAVE THE WORLD!</div>
                    <v-btn @click="startGame" class="start-game-btn cursor-pointer z-100" x-large>Start
                        Game</v-btn>
                </v-col>
                <v-col cols="12" md="6" order="1" order-md="2">
                    <v-img src="/src/assets/image-1.png" class="h-100 w-100 waves z-100"></v-img>
                </v-col>
            </v-row>
        </v-container>

        <div class="my-0 my-md-15 position-relative pt-15">
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
            <v-container class="un-max-width">
                <v-row class="d-flex justify-end align-center">
                    <v-col col="6" md="6" sm="4" data-aos="zoom-in-left" data-aos-offset="300"
                        data-aos-easing="ease-in-sine">
                        <v-img src="/src/assets/item/Plane.png" class="h-100 w-100 night-image"></v-img>
                    </v-col>
                    <v-col col="6" md="6" sm="8">
                        <h1 class="parallax-shadow description-title">About Blast Commander</h1>
                        <div class="parallax-shadow description-text">Dive into an exhilarating battle
                            adventure where intense
                            action, immersive exploration, and exclusive NFT-based rewards converge to deliver a gaming
                            experience like no other. Prepare for an unforgettable journey filled with excitement,
                            strategy, and endless possibilities!</div>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <v-container class="stats-section text-center my-15 text-xl pb-8">
            <v-row align="top" justify="center">
                <v-col cols="12" sm="6" order="2" order-md="1">
                    <v-card class="wh-box pa-4" outlined data-aos="zoom-out-right" data-aos-offset="1000">
                        <div class="pa-4">
                            <h2>Acquire NFTs to obtain exclusive Equipment!!</h2>
                            <v-img src="/src/assets/image-4.png" class="gift-box"></v-img>
                            <swiper :centeredSlides="true" :autoplay="{
                                delay: 4000,
                                disableOnInteraction: true,
                            }" :pagination="{
                                clickable: true,
                            }" :modules="modules" @autoplayTimeLeft="onAutoplayTimeLeft" class="mySwiper mt-8">
                                <swiper-slide v-for="(image, index) in imageUrls" :key="index">
                                    <img :src="image.src" alt="Image" />
                                </swiper-slide>
                            </swiper>
                        </div>
                    </v-card>
                    <v-card class="wh-box pa-4 mt-6" outlined data-aos="zoom-out-right" data-aos-offset="1000">
                        <div class="pa-4">
                            <h2>Active & Passive Boost System</h2>

                            <swiper :centeredSlides="true" :autoplay="{
                                delay: 2000,
                                disableOnInteraction: true,
                            }" :pagination="{
                                clickable: true,
                            }" :modules="modules" @autoplayTimeLeft="onAutoplayTimeLeft" class="mySwiper mt-8">
                                <swiper-slide v-for="(image, index) in imageUrls2" :key="index">
                                    <img :src="image.src" alt="Image" />
                                </swiper-slide>
                            </swiper>
                        </div>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="6" order="1" order-md="2" class="d-flex align-center">
                    <div class="trailer" outlined data-aos="zoom-out-left" data-aos-offset="1000"
                        data-aos-easing="ease-in-sine">
                        <video autoplay loop muted playsinline src="/src/assets/trailer-1.mp4"></video>
                    </div>
                </v-col>
            </v-row>
        </v-container>

        <div class="my-12">
            <v-container class="stats-section text-center my-8 text-xl stats-card v-card">
                <div class="slider-wrapper">
                    <!-- Nhóm chạy bình thường -->
                    <div class="slider normal">
                        <div class="slide" v-for="(item, i) in repeatedItems" :key="'normal' + i">
                            <v-img :src="item.src" height="150" width="150" class="radius-8 mx-3"></v-img>
                        </div>
                    </div>
                </div>
            </v-container>

            <v-container class="stats-section text-center my-8 text-xl stats-card v-card">
                <div class="slider-wrapper">
                    <!-- Nhóm chạy ngược lại -->
                    <div class="slider reverse">
                        <div class="slide" v-for="(item, i) in repeatedItems2" :key="'reverse' + i">
                            <v-img :src="item.src" height="150" width="250"></v-img>
                        </div>
                    </div>
                </div>
            </v-container>
        </div>

        <v-container class="stats-section text-center my-12 text-xl">
            <v-row align="center" justify="center">
                <v-col cols="12">
                    <v-card class="stats-card pa-6">
                        <h1 class="mb-6">Project Statistics</h1>
                        <v-row dense>
                            <v-col cols="12" sm="4">
                                <v-card class="stat-box pa-4" outlined data-aos="fade-down-right" data-aos-offset="1000"
                                    data-aos-easing="ease-in-sine">
                                    <v-icon class="stat-icon mb-2" color="blue">mdi-account-multiple</v-icon>
                                    <h2 class="">{{ usersCount }}</h2>
                                    <h3 class="stat-label">Followers</h3>
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-card class="stat-box pa-4" outlined data-aos="flip-up" data-aos-offset="1000"
                                    data-aos-easing="ease-in-sine">
                                    <v-icon class="stat-icon mb-2" color="purple">mdi-cube-outline</v-icon>
                                    <h2 class="">{{ nftsMinted }}</h2>
                                    <h3 class="stat-label">NFTs Minted</h3>
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-card class="stat-box pa-4" outlined data-aos="fade-up-left" data-aos-offset="1000"
                                    data-aos-easing="ease-in-sine">
                                    <v-icon class="stat-icon mb-2" color="green">mdi-swap-horizontal</v-icon>
                                    <h2 class="">{{ transactionsCount }}</h2>
                                    <h3 class="stat-label">Transactions</h3>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <!-- Roadmap Section -->
        <!-- <v-container class="roadmap-section">
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

            <h2 class="text-center mb-8">Project Roadmap</h2>
            <v-timeline align="start">
                <v-timeline-item>
                    <template v-slot:opposite>
                    </template>
<div data-aos="flip-right">
    <div class="roadmap-text-1">Phase 1: Gameplay Enhancements</div>
    <div class="roadmap-text-2 cl-ffcc00">Boss Battles and World Exploration</div>
    <ul>
        <li>Elevate the gameplay experience with the introduction of boss battle modes and immersive
            exploration
            mechanics.</li>
        <li>Allow players to delve deeper into the Blast Commander universe, uncovering challenges
            and rewards along
            the way.</li>
    </ul>
</div>
</v-timeline-item>

<v-timeline-item>
    <template v-slot:opposite>
                    </template>
    <div data-aos="flip-left">
        <div class="roadmap-text-1">Phase 2: NFT Box Opening</div>
        <div class="roadmap-text-2 cl-ffcc00">Discover Unique Items and Build Powerful Combos</div>
        <ul>
            <li>Open NFT boxes to acquire rare and unique items.</li>
            <li>Combine these items strategically to create powerful combos, enhancing your in-game
                abilities and
                overall strategy.</li>
        </ul>
    </div>
</v-timeline-item>

<v-timeline-item>
    <template v-slot:opposite>
                    </template>
    <div data-aos="flip-right">
        <div class="roadmap-text-1">Phase 3: Community Building</div>
        <div class="roadmap-text-2 cl-ffcc00">Fostering a Sustainable Ecosystem</div>
        <ul>
            <li>Focus on growing the community and establishing a long-term, sustainable ecosystem.</li>
            <li>Ensure player engagement and the longevity of Blast Commander by nurturing a vibrant and
                active player
                base.</li>
        </ul>
    </div>
</v-timeline-item>
</v-timeline>
</v-container> -->

        <v-container class="stats-section text-center my-12 text-xl"></v-container>
        <!-- Footer -->
        <v-footer class="stats-card mt-16" app>
            <v-container>
                <v-row>
                    <v-col>
                        <div class="d-flex align-center h-100">© Blast Commander {{ year }}</div>
                    </v-col>
                    <v-col>
                        <div class="icon-twitter cursor-pointer" @click="openTwt">
                            <svg viewBox="0 0 24 24" aria-hidden="true"
                                class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-lrsllp r-1nao33i r-16y2uox r-8kz0gk">
                                <g>
                                    <path
                                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                                    </path>
                                </g>
                            </svg>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-footer>
    </v-app>
</template>

<script setup lang="ts">
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { computed } from "vue";

const progressCircle = ref<SVGCircleElement | null>(null);
const progressContent = ref<HTMLElement | null>(null);
const onAutoplayTimeLeft = (swiper: any, time: number, progress: number) => {
    if (progressCircle.value && progressContent.value) {
        progressCircle.value.style.setProperty('--progress', (1 - progress).toString());
        progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
    }
};
const modules = [Autoplay, Pagination, Navigation];
const imageUrls = [
    { src: "/src/assets/bag/HP.webp" },
    { src: "/src/assets/bag/Armor.webp" },
    { src: "/src/assets/bag/nft-1.png" },
    { src: "/src/assets/bag/nft-2.png" },
    { src: "/src/assets/bag/nft-3.png" },
];

const imageUrls2 = [
    { src: "/src/assets/item/ShopBackground.png" },
    { src: "/src/assets/item/ShopBackground-2.png" },
    { src: "/src/assets/item/ShopBackground-3.png" },
    { src: "/src/assets/item/ShopBackground-4.png" },
    { src: "/src/assets/item/ShopBackground-5.png" },
    { src: "/src/assets/item/ShopBackground-6.png" },
    { src: "/src/assets/item/ShopBackground-7.png" },
    { src: "/src/assets/item/ShopBackground-8.png" },
    { src: "/src/assets/item/ShopBackground-9.png" },
    { src: "/src/assets/item/ShopBackground-10.png" },
];

const items = [
    { src: "/src/assets/slides/a1.jpeg" },
    { src: "/src/assets/slides/a2.jpeg" },
    { src: "/src/assets/slides/a3.jpeg" },
    { src: "/src/assets/slides/a4.jpeg" },
    { src: "/src/assets/slides/a5.jpeg" },
    { src: "/src/assets/slides/a6.jpeg" },
    { src: "/src/assets/slides/a7.jpeg" },
    { src: "/src/assets/slides/a8.jpeg" },
    { src: "/src/assets/slides/a9.jpeg" },
    { src: "/src/assets/slides/a10.jpeg" },
    { src: "/src/assets/slides/a11.jpeg" },
    // { src: "/src/assets/slides/bgr-1.jpeg" },
    // { src: "/src/assets/slides/bgr-2.jpeg" },
];

const items2 = [
    { src: "/src/assets/slides/Enemies.png" },
    { src: "/src/assets/slides/gun-1.png" },
    { src: "/src/assets/slides/gun-2.png" },
    { src: "/src/assets/slides/gun-3.png" },
    { src: "/src/assets/slides/Plane-2.png" },
    { src: "/src/assets/slides/Plane-3.png" },
    { src: "/src/assets/slides/Plane-4.png" },
    { src: "/src/assets/slides/Plane-5.png" },
    { src: "/src/assets/slides/Plane.png" },
    { src: "/src/assets/slides/PlaneShadow.png" }
];

const repeatedItems = computed(() => [...items, ...items]);
const repeatedItems2 = computed(() => [...items2, ...items2]);

const router = useRouter()
const year = new Date().getFullYear();
const usersCount = ref('2000+');
const nftsMinted = ref('3000+');
const transactionsCount = ref('12000+');
const features = ref([
    { title: 'Blockchain-Based', description: 'Built on the robust foundation of the Linea zkEVM network, this platform leverages the power of web3 dApps, delivering rapid processing speeds and minimal transaction fees. It’s a seamless blend of efficiency and innovation, making it the perfect choice for blockchain gaming.' },
    { title: 'NFT Gaming', description: 'Experience immersive space combat gameplay brought to life on the blockchain platform. Engage in thrilling battles, unlock exclusive NFT rewards, and conquer challenging levels designed to test your skills and strategy.' },
    { title: 'Community and Ecosystem', description: 'Join a vibrant community of gamers and blockchain enthusiasts, where collaboration and competition drive innovation. With regular updates, exclusive events, and opportunities to trade or showcase NFTs, the ecosystem ensures an engaging and ever-evolving experience.' },
],);

const startGame = () => {
    router.push('/');
}

function openTwt() {
    window.open('https://x.com/GorgonNetwork1?s=21&t=tRdIv6yO9Anvj96R5LwmBw', '_blank');
}
const navigateTo = (section) => {
    router.push(`/${section}`);
};

onMounted(() => {
    setRandomCloudSizes();
});

const setRandomCloudSizes = () => {
    // Lấy tất cả các đám mây trong container
    const clouds = document.querySelectorAll('.cloud');

    clouds.forEach((cloud: any) => {
        // Tạo một kích thước ngẫu nhiên cho mỗi đám mây
        const randomSize = Math.random() * (300 - 100) + 100; // Giới hạn từ 100px đến 300px
        cloud.style.width = `${randomSize}px`;
    });
};
</script>

<style scoped lang="scss">
/* Bọc ngoài slider */
.slider-wrapper {
    overflow: hidden;
    width: 100%;
    position: relative;
}

/* Dòng trượt */
.slider {
    display: flex;
    width: max-content;
    /* Đảm bảo nội dung không bị ngắt dòng */
}

/* Mỗi phần tử slide */
.slide {
    flex: 0 0 auto;
    margin-right: 10px;
}

/* Slide chạy bình thường (trái -> phải) */
.normal {
    animation: scroll-left 50s linear infinite;
}

/* Slide chạy ngược lại (phải -> trái) */
.reverse {
    animation: scroll-right 50s linear infinite;
}

/* Trượt từ trái sang phải */
@keyframes scroll-left {
    from {
        transform: translateX(0%);
    }

    to {
        transform: translateX(-50%);
    }
}

/* Trượt từ phải sang trái */
@keyframes scroll-right {
    from {
        transform: translateX(-50%);
    }

    to {
        transform: translateX(0%);
    }
}

/* Dừng khi hover */
.slider-wrapper:hover .slider {
    animation-play-state: paused;
}

@keyframes shake {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(-5deg);
    }

    50% {
        transform: rotate(5deg);
    }

    75% {
        transform: rotate(-5deg);
    }

    100% {
        transform: rotate(0deg);
    }
}

.gift-box {
    margin: 34px 0px;
    height: 200px;
    animation: shake 0.5s infinite ease-in-out;
}

.bgr-gradient {
    background: linear-gradient(45deg, #ff416c, #ff4b2b);
}

.mySwiper {
    height: 100px;
    padding: 0px;
    padding-bottom: 24px;

    .swiper-slide {
        display: flex;
        justify-content: center;
    }

    .swiper-pagination-bullets {
        bottom: -8px;
    }
}

.gradient-text {
    background: linear-gradient(to bottom, #FED84D, #E26130);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.stat-icon {
    font-size: 48px;
}

@keyframes waveAnimation {
    0% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(-50px);
    }

    100% {
        transform: translateX(0);
    }
}

.waves {
    animation: waveAnimation 4s infinite linear;
}

.header-btn {
    z-index: 999;
    display: flex;
    align-items: center;
    font-size: clamp(12px, 1vw, 24px);
    font-weight: bold;
    padding: 8px 16px;
    margin: 0px 8px;
    border-radius: 50px;
    height: fit-content;
    width: fit-content;
    animation: pulse 1.5s infinite;
    background-color: #11437E;
    cursor: pointer;
}

.logo {
    @media (max-width: 600px) {
        height: 100%;
        width: 100%;
    }
}

.glow-button {
    position: relative;
    padding: 8px 16px;
    margin: 0px 8px;
    font-size: clamp(12px, 1vw, 24px);
    color: white;
    background: linear-gradient(45deg, #ff416c, #ff4b2b);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 15px rgba(255, 65, 108, 0.4);

    @media (max-width: 600px) {
        padding: 4px 8px;
        font-size: 12px;
        margin: 0px 4px;
    }
}

.glow-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 25px rgba(255, 65, 108, 0.6);
}

.hero-box {
    padding: 16px 60px;

    @media (max-width: 600px) {
        padding: 16px;
    }
}

.start-game-btn {
    display: flex;
    align-items: center;
    font-size: clamp(24px, 3vw, 48px);
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 50px;
    height: fit-content;
    width: fit-content;
    animation: pulse 1.5s infinite;
    background-color: #FB7939;
    margin-top: 48px;

    @media (max-width: 600px) {
        margin-top: 16px;
    }
}

.icon-twitter {
    background: linear-gradient(45deg, #ff416c, #ff4b2b);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    margin: 0px 8px;
    width: 36px;
    height: 36px;
    padding: 4px;
    display: flex;
    align-items: center;
}

.icon-twitter:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 25px rgba(255, 65, 108, 0.6);
}

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
    background-color: #50BEF9;
    height: 100%;
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.description-title {
    @media (max-width: 600px) {
        font-size: 16px;
    }
}

.description-text {
    font-size: 24px;

    @media (max-width: 600px) {
        font-size: 14px;
    }
}

.parallax-text {
    font-size: 80px;
    font-weight: 600;
    position: relative;
    color: #FFFFFF;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

    @media (max-width: 600px) {
        font-size: 48px;
    }
}

.parallax-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.roadmap-section {
    background-color: rgba(33, 33, 33, 0.5);
    color: #fff;
    padding: 32px 32px 70px 32px;
    border-radius: 8px;
    margin-top: 48px;
    margin-bottom: 96px;
}

h1,
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

.trailer {
    width: 100%;
    max-height: 755px;
    position: relative;
    display: flex;
    justify-content: center;

    video {
        display: block;
        pointer-events: none;
        border-radius: 8px;
        width: 100%;
    }
}

.wh-box {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
}

.radius-8 {
    border-radius: 8px;
}

.stat-box,
.feature-card {
    background-color: rgba(33, 33, 33, 0.5);
}

.z-2 {
    z-index: 2;
}

.z-100 {
    z-index: 100;
}

.z-1 {
    z-index: 1;
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

// night ======================================================================

.night-image {
    transform: rotate(-90deg);
}

$shooting-time: 3000ms;

.night {
    position: absolute;
    width: calc(100% - 120px);
    height: 100%;
    left: 120px;
    top: 60px;

    @media (max-width: 600px) {
        left: -120px;
    }
}

.shooting_star {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 2px;
    background: linear-gradient(-45deg, #FB7939, rgba(0, 0, 255, 0));
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
        background: linear-gradient(-45deg, #FB7939, rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
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
}

// Định dạng đám mây ======================================================================
.un-max-width {
    max-width: unset !important;
    padding: 16px 60px;

    @media (max-width: 600px) {
        padding: 8px;
    }
}

.cloud-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
    left: 0;
}

.cloud {
    position: absolute;
    opacity: 0.9;
    filter: drop-shadow(5px 5px 15px rgba(0, 0, 0, 0.2));
    /* Bóng mờ mạnh hơn */
    animation: floating 4s ease-in-out infinite alternate;
}

/* Các đám mây */
.cloud-1 {
    top: 10%;
    left: -250px;
    width: 250px;
    animation: floating 3s ease-in-out infinite alternate, moveClouds 35s linear infinite;
}

.cloud-2 {
    top: 30%;
    left: -300px;
    width: 180px;
    animation: floating 4s ease-in-out infinite alternate, moveClouds 40s linear infinite;
}

.cloud-3 {
    top: 50%;
    left: -220px;
    width: 150px;
    animation: floating 5s ease-in-out infinite alternate, moveClouds 25s linear infinite;
}

.cloud-4 {
    top: 70%;
    left: -180px;
    width: 220px;
    animation: floating 4s ease-in-out infinite alternate, moveClouds 30s linear infinite;
}

.cloud-5 {
    top: 20%;
    left: -300px;
    width: 280px;
    animation: floating 4s ease-in-out infinite alternate, moveCloudsReverse 50s linear infinite;
}

.cloud-6 {
    top: 40%;
    left: -350px;
    width: 130px;
    animation: floating 3s ease-in-out infinite alternate, moveCloudsReverse 45s linear infinite;
}

.cloud-7 {
    top: 60%;
    left: -200px;
    width: 100px;
    animation: floating 5s ease-in-out infinite alternate, moveCloudsReverse 60s linear infinite;
}

.cloud-8 {
    top: 70%;
    left: -250px;
    width: 230px;
    animation: floating 4s ease-in-out infinite alternate, moveCloudsReverse 55s linear infinite;
}

/* Hiệu ứng mây bay ngang từ trái sang phải */
@keyframes moveClouds {
    from {
        left: -300px;
    }

    to {
        left: 100vw;
    }
}

/* Mây bay ngang từ phải sang trái */
@keyframes moveCloudsReverse {
    from {
        left: 100vw;
    }

    to {
        left: -300px;
    }
}

/* Hiệu ứng bay lơ lửng */
@keyframes floating {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(10px);
    }
}

// view-plane ======================================================================
.container-plane {
    position: absolute;
    width: 100%;
    height: 100%;
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