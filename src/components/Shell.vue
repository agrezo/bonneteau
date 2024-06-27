<template>
  <div
    class="shell"
    :class="animationName"
    :style="{
      animationDuration: `${animationDuration}ms`,
      left: leftPxPosition,
    }"
    @click="selectShell"
  >
    <img src="../assets/shell.png" class="shell-image" ref="shellImageRef" />
    <img v-if="hasPearl" src="../assets/pearl.png" class="pearl-image" />
  </div>
</template>

<script setup lang="ts">
import { defineModel, onMounted, ref, watch } from "vue";

import { useGameSettings } from "../composables/use-game-settings";

const emit = defineEmits<{ (e: "select"): void }>();

const props = defineProps<{
  allowedToSelect: boolean;
  hasPearl: boolean;
}>();

const { animationDuration, positionsX } = useGameSettings();

const position = defineModel<number>();

const shellImageRef = ref<HTMLElement>();
const lastPosition = ref<number | null>();
const leftPxPosition = ref("");
const animationName = ref("");

const selectShell = () => {
  if (shellImageRef.value && props.allowedToSelect) {
    shellImageRef.value.style.top = "-60px";
    emit("select");
  }
};

watch(position, (newPosition) => {
  leftPxPosition.value = positionsX[newPosition as number];
  animationName.value = `from-${lastPosition.value}-to-${newPosition}`;
  lastPosition.value = newPosition;
});

onMounted(() => {
  lastPosition.value = position.value;
  leftPxPosition.value = positionsX[position.value as number];
  if (props.hasPearl) {
    setTimeout(() => {
      if (shellImageRef.value) shellImageRef.value.style.top = "-60px";
    }, 600);
    setTimeout(() => {
      if (shellImageRef.value) shellImageRef.value.style.top = "0px";
    }, 2500);
  }
});
</script>

<style scoped>
.shell {
  border-radius: 50%;
  cursor: pointer;
  height: 100px;
  position: absolute;
  width: 100px;
}

.shell-image {
  left: 0;
  position: absolute;
  top: 0;
  transform: rotate(180deg);
  width: 100px;
  transition: top 0.5s;
  z-index: 2;
}

.pearl-image {
  height: 32px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 55%;
  width: 32px;
}
</style>
