<template>
  <v-container class="game-tutorial">
    <!-- Game Instructions -->
    <v-row>
      <v-col class="text-center">
        <v-card elevation="4" class="pa-4">
          <v-card-title class="headline">How to Play the Spaceship Shooter Game</v-card-title>
          <v-card-text>
            <v-list dense>
              <!-- Move Controls -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Move Your Spaceship:
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Use the <kbd>Up</kbd> and <kbd>Down</kbd> arrow keys to navigate your spaceship vertically.
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- Shooting Controls -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Shoot Your Lasers:
                  </v-list-item-title>
                  <v-card-text>
                    Click anywhere on the screen or press the <kbd>Space</kbd> key to fire at the enemies.
                  </v-card-text>
                </v-list-item-content>
              </v-list-item>

              <!-- Points Information -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Earn Points:
                  </v-list-item-title>
                  <v-card-text>
                    After completing levels, you earn points. These points can be used in the in-game store to purchase items such as spaceship parts, gift boxes, and other rewards. In the future, you will also be able to exchange points for tokens.
                  </v-card-text>
                </v-list-item-content>
              </v-list-item>

              <v-img src="@/assets/item/info.webp"></v-img>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  methods: {
    connectWallet() {
      // Implement wallet connection logic here
      alert("Connecting wallet to manage and use your earned points!");
      // This could involve calling a smart contract using ethers.js or web3.js
    }
  }
};
</script>

<style scoped>
.game-tutorial {
  max-width: 600px;
  margin: 0 auto;
}
.kbd {
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: bold;
}
</style>
