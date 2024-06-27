<template>
  <img src="./assets/background.jpg" class="background" />
  <game v-if="gameStarted" />
  <start v-else @start="gameStarted = true" />
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useGameSettings } from "./composables/use-game-settings";

import Game from "./components/Game.vue";
import Start from "./components/Start.vue";

const gameStarted = ref(false);

const { setDifficulty } = useGameSettings();

setDifficulty("easy");
</script>

<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  margin: 0;
  flex-direction: column;
}

.background {
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
