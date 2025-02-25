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

<script>
export default {
  name: "TestGame",
  mounted() {
    const script = document.createElement("script");
    script.src = "/my-unity-game/Build/mygame.loader.js";
    script.onload = () => {
      createUnityInstance(document.querySelector("#unity-canvas"), {
        dataUrl: "/my-unity-game/Build/mygame.data",
        frameworkUrl: "/my-unity-game/Build/mygame.framework.js",
        codeUrl: "/my-unity-game/Build/mygame.wasm",
        loaderUrl: "/my-unity-game/Build/mygame.loader.js",
      })
        .then((unityInstance) => {
          console.log("Unity loaded successfully:", unityInstance);
        })
        .catch((error) => {
          console.error("Error loading Unity:", error);
        });
    };
    script.onerror = () => {
      console.error("Failed to load loader script");
    };
    document.body.appendChild(script);
  },
};
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
