<template>
  <div class="menu">
    <h1>Jeu du bonneteau</h1>
    <div>
      <label>Difficulté :</label>
      <select v-model="difficulty">
        <option value="easy">Facile</option>
        <option value="hard">Difficile</option>
      </select>
    </div>
    <button @click="handleClick">Commencer</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useGameSettings } from "../composables/use-game-settings";

const emit = defineEmits<{ (e: "start"): void }>();

const { setDifficulty } = useGameSettings();

const difficulty = ref<"easy" | "hard">("easy");

const handleClick = () => {
  setDifficulty(difficulty.value);
  emit("start");
};
</script>

<style scoped>
.menu {
  -webkit-backdrop-filter: blur(3px);
  align-items: center;
  backdrop-filter: blur(3px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  display: grid;
  height: 300px;
  justify-content: center;
  position: relative;
  width: 600px;
}

h1 {
  color: black;
}

select {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.25s;
  margin-left: 24px;
}
</style>
