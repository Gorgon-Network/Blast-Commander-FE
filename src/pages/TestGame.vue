<template>
  <v-container fluid class="pa-0 ma-0 pa-md-4">
    <v-row justify="center" class="pa-0 ma-0">
      <v-col cols="12" class="pa-0 ma-0 fisrt-container">
        <!-- Game nền mờ (bản sao) -->
        <div id="unity-container" style="width: 360px; height: 523px;">
          <canvas id="unity-canvas" style="width: 360px; height: 523px;"></canvas>
          <div class="bottom-navigate">
            <div class="item-navigate" v-ripple @click="router.push('equipment')">
              <v-icon  color="green-darken-4"
                       size="large"
                       icon="mdi-bag-personal-outline"></v-icon>
              <p>Inventory</p>
            </div>

            <div class="item-navigate" v-ripple @click="router.push('box')">
              <v-icon  color="yellow-darken-3"
                       size="large"
                       icon="mdi-gift"></v-icon>
              <p>Mint Item</p>
            </div>
            <img src="@/assets/Sale/ship-2.webp" alt="Buy Ship" class="ship-button sparkle" />
            <div class="sale-text">Coming Soon</div>
          </div>
        </div>
      </v-col>
      <div id="unity-container-blurred" class="blurred">
        <canvas id="unity-canvas-blurred"></canvas>
      </div>
    </v-row>

    <!-- Overlay loading -->
    <v-overlay v-model="isLoading" z-index="100" class="overlay-loading-game">
      <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
      <p class="mt-4">Loading game, please wait..</p>
    </v-overlay>
  </v-container>
</template>
<script setup>
import { ref, nextTick, onMounted, onUnmounted } from "vue";
import { _connectWallet, _disconnectWallet } from "@/store/ultil";
import * as _ from "lodash";
import { useRouter } from "vue-router";
let unityInstance = null; // Biến toàn cục lưu instance của Unity
const isLoading = ref(true); // Trạng thái loading

const router = useRouter();
// 🔹 Khởi tạo Unity WebGL
function setUpGame() {
  const script = document.createElement("script");
  script.src = "/mygame/Build/mygame.loader.js";
  script.onload = () => {
    createUnityInstance(document.querySelector("#unity-canvas"), {
      dataUrl: "/mygame/Build/mygame.data",
      frameworkUrl: "/mygame/Build/mygame.framework.js",
      codeUrl: "/mygame/Build/mygame.wasm",
      loaderUrl: "/mygame/Build/mygame.loader.js",
    })
      .then((instance) => {
       isLoading.value = false;
        unityInstance = instance; // Lưu lại để dùng sau
        nextTick(() => cloneCanvas());
      })
      .catch((error) => {
        isLoading.value = false;
      });
  };
  document.body.appendChild(script);
}

// 🔹 Xử lý sự kiện từ Vue gửi đến Unity
const handleGameMessage = async (event) => {
  if (!unityInstance) {
    return;
  }

  switch (event.data.type) {
    case "connectWallet":
      console.log("Connect Wallet");
      const { signer } = await _connectWallet();
      unityInstance.SendMessage("WebGLEvents", "SetConnectedWallet", signer.address);
      break;

    case "disconnectWallet":
      await _disconnectWallet();
      unityInstance.SendMessage("WebGLEvents", "OnWalletDisconnected", "wallet disconnected");
      break;

    case "mintNFT":
      router.push('/box');
      break;
    case "Inventory":
      router.push('/equipment');
      break;


    default:
      break;
  }
};

function cloneCanvas() {
  const originalCanvas = document.querySelector("#unity-canvas");
  const blurredCanvas = document.querySelector("#unity-canvas-blurred");

  if (originalCanvas && blurredCanvas) {
    const ctx = blurredCanvas.getContext("2d");
    blurredCanvas.width = originalCanvas.width;
    blurredCanvas.height = originalCanvas.height;

    function updateBlurredCanvas() {
      ctx.clearRect(0, 0, blurredCanvas.width, blurredCanvas.height);
      ctx.drawImage(originalCanvas, 0, 0, blurredCanvas.width, blurredCanvas.height);
      requestAnimationFrame(updateBlurredCanvas);
    }

    updateBlurredCanvas(); // Chạy vòng lặp cập nhật nền mờ
  }
}

// 🔹 Dọn dẹp Unity khi rời trang
function cleanupUnity() {
  if (unityInstance) {
    unityInstance.Quit() // Tắt instance Unity nếu được hỗ trợ
      .then(() => {

      })
      .catch((error) => {

      });
    unityInstance = null; // Đặt lại biến toàn cục
  }

  // Xóa canvas gốc và canvas mờ khỏi DOM
  const originalCanvas = document.querySelector("#unity-canvas");
  const blurredCanvas = document.querySelector("#unity-canvas-blurred");
  if (originalCanvas) originalCanvas.remove();
  if (blurredCanvas) blurredCanvas.remove();

  // Xóa script Unity loader nếu cần
  const unityScript = document.querySelector('script[src="/my-unity-game/Build/mygame.loader.js"]');
  if (unityScript) unityScript.remove();
}

// 🔹 Gắn và gỡ bỏ sự kiện khi component mount/unmount
onMounted(() => {
  setUpGame();
  window.addEventListener("message", handleGameMessage);
});

onUnmounted(() => {
  window.removeEventListener("message", handleGameMessage);
  cleanupUnity(); // Gọi hàm dọn dẹp khi component bị unmounted
});
</script>


<style scoped>
#unity-container-blurred {
  position: absolute;
  width: 70%;
  height: calc(100% - 32px);
  filter: blur(10px);
  opacity: 0.2;
  z-index: 0;
  margin: auto;
  left: 15%;
}

#unity-canvas-blurred {
  width: 100%;
  height: 100%;
}

#unity-container {
  width: 360px;
  max-width: 360px;
  margin: auto;
}

.fisrt-container {
  z-index: 10;
}

#unity-canvas {
  display: block;
}

@media (max-width: 660px) {
  .v-container {
    padding: 8px 0px !important;
  }
}
.overlay-loading-game {
  left: 50%;
  top: 50%;
  text-align: center;
}
.bottom-navigate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  position: relative;

  .item-navigate {
    background: #E0E0E0;
    border: solid 1px #757575;
    border-radius: 8px;
    text-align: center;
    padding: 8px;
    color: #424242;
    cursor: pointer;
  }

  /* ship as button */
  .ship-button {
    width: 80px;
    height: auto;
    cursor: pointer;
    border-radius: 12px;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.45);
  }

  /* hover effect */
  .ship-button:hover {
    transform: translateY(-6px) scale(1.05);
    box-shadow: 0 8px 22px rgba(56,183,255,0.55);
  }

  /* engine glow */
  .ship-button::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 12px;
    background: radial-gradient(circle, rgba(56,183,255,0.6), transparent 70%);
    filter: blur(8px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  /* glow visible when hover */
  .ship-button:hover::after {
    opacity: 1;
  }

  .sale-text {
    position: absolute;
    right: 0;
    color: red;
    bottom: 0;
    font-size: 16px;
    font-weight: bold;
  }
}

.banner-mainnet {
  cursor: pointer;
  img {
    width: 360px;
  }
}

.sparkle {
  animation: sparkle 1.2s infinite ease-in-out;
}

@keyframes sparkle {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(2.2) contrast(1.4); }
}
</style>
