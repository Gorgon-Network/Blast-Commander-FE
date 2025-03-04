<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <div id="unity-container" style="width: 360px; height: 640px;">
          <canvas id="unity-canvas" style="width: 360px; height: 640px;"></canvas>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted, onUnmounted } from "vue";
import { _connectWallet } from "@/store/ultil";
import * as _ from "lodash";

let unityInstance = null; // Biến toàn cục lưu instance của Unity

// 🔹 Khởi tạo Unity WebGL
function setUpGame() {
  const script = document.createElement("script");
  script.src = "/my-unity-game/Build/mygame.loader.js";
  script.onload = () => {
    createUnityInstance(document.querySelector("#unity-canvas"), {
      dataUrl: "/my-unity-game/Build/mygame.data",
      frameworkUrl: "/my-unity-game/Build/mygame.framework.js",
      codeUrl: "/my-unity-game/Build/mygame.wasm",
      loaderUrl: "/my-unity-game/Build/mygame.loader.js",
    })
      .then((instance) => {
        unityInstance = instance; // Lưu lại để dùng sau
        console.log("✅ Unity WebGL đã tải thành công!");
      })
      .catch((error) => {
        console.error("❌ Lỗi tải Unity:", error);
      });
  };
  document.body.appendChild(script);
}

// 🔹 Xử lý sự kiện từ Vue gửi đến Unity
const handleGameMessage = async (event) => {
  if (!unityInstance) {
    console.warn("⏳ Unity chưa sẵn sàng! Chờ khởi tạo...");
    return;
  }

  switch (event.data.type) {
    case "connectWallet":
      console.log("🔗 Đang gửi sự kiện connectWallet đến Unity...");
      unityInstance.SendMessage("WebGLEvents", "ReceiveMessage", "Hello from Web!");
      break;

    case "mintNFTSuccess":
      console.log("🎨 Gửi sự kiện mintNFTSuccess đến Unity:", event.data.txHash);
      unityInstance.SendMessage("WebGLBridge", "OnNFTMinted", event.data.txHash);
      break;

    default:
      console.warn("⚠ Sự kiện không xác định:", event.data.type);
      break;
  }
};

// 🔹 Gắn và gỡ bỏ sự kiện khi component mount/unmount
onMounted(() => {
  setUpGame();
  window.addEventListener("message", handleGameMessage);
});

onUnmounted(() => {
  window.removeEventListener("message", handleGameMessage);
});
</script>


<style scoped>
#unity-container {
  width: 360px;
  max-width: 360px;
  margin: auto;
}
#unity-canvas {
  display: block;
}
</style>
