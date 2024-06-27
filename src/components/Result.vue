<template>
  <div class="result" :class="`${win ? 'win' : 'lose'}`">
    <h2>
      {{ win ? "Gagné !" : "Perdu !" }}
    </h2>
    <button @click="$emit('restart')">Rejouer</button>
  </div>
</template>

<script setup lang="ts">
import JSConfetti from "js-confetti";

const props = defineProps<{ win: boolean }>();

defineEmits<{ (e: "restart"): void }>();

const jsConfetti = new JSConfetti();

if (props.win) {
  jsConfetti.addConfetti();
}
</script>

<style scoped>
.result {
  border-radius: 8px;
  padding: 16px 20px;
  position: absolute;
  top: calc(100% + 32px);
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.win {
  background-color: #4cd137;
  /* border: 1px solid rgb(76, 209, 55, 0.3); */
}

.lose {
  background-color: #f00;
}

h2 {
  color: #fff;
  margin: 0;
}
</style>
