<template>
  <v-app-bar
    color="teal-darken-4"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Chrono Vortex</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>

  <div class="content">
    <v-img  aspect-ratio="16/9" :width="1024"
            cover src="@/assets/item/background.webp"></v-img>
  </div>

  <v-footer>
    {{ new Date().getFullYear() }} — <strong>Gorgon Network</strong>
  </v-footer>
</template>
<style>
.content {
  height: calc(100vh - 100px);

}
</style>
