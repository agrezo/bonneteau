<template>
  <div class="game">
    <shell
      v-for="(, index) in shells"
      :key="`${index}-${gameId}`"
      v-model="currentShellsPositions[index]"
      :has-pearl="shellWithPearl === index"
      :allowed-to-select="isShuffleDone && !shellSelected"
      @select="shellSelected = index"
    />
    <result
      v-if="shellSelected !== null"
      :win="shellSelected === shellWithPearl"
      @restart="restart"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useGameSettings } from "../composables/use-game-settings";
import Shell from "../components/Shell.vue";
import Result from "../components/Result.vue";

const gameId = ref(0);
const previousShellsPositions = ref<number[]>([]);
const currentShellsPositions = ref([0, 1, 2]);
const shellWithPearl = ref(Math.floor(Math.random() * (2 - 0 + 1) + 0));
const shellSelected = ref<number | null>(null);
const isShuffleDone = ref(false);

const { animationDuration, shells, shuffleCount } = useGameSettings();

const startShuffle = () => {
  let count = 0;
  const interval = setInterval(() => {
    if (count < shuffleCount) {
      shuffleShells();
      count += 1;
    } else {
      clearInterval(interval);
      isShuffleDone.value = true;
    }
  }, animationDuration.value);
};

const shuffleShells = () => {
  currentShellsPositions.value = generateUniqueArray(
    previousShellsPositions.value
  );
  previousShellsPositions.value = [...currentShellsPositions.value];
};

const generateUniqueArray = (previousShellsPositions: number[]) => {
  const values = [0, 1, 2];
  const newArray = [];

  do {
    let tempValues = [...values];
    newArray.length = 0;

    while (tempValues.length > 0) {
      const randomIndex = Math.floor(Math.random() * tempValues.length);
      newArray.push(tempValues.splice(randomIndex, 1)[0]);
    }
  } while (!isValidNewArray(previousShellsPositions, newArray));

  return newArray;
};

const isValidNewArray = (
  previousShellsPositions: number[],
  newArray: number[]
) => {
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i] === previousShellsPositions[i]) {
      return false;
    }
  }
  return true;
};

const restart = () => {
  gameId.value += 1;
  shellWithPearl.value = Math.floor(Math.random() * (2 - 0 + 1) + 0);
  shellSelected.value = null;
  isShuffleDone.value = false;
  previousShellsPositions.value = [];
  setTimeout(() => {
    startShuffle();
  }, 3000);
};

onMounted(() => {
  setTimeout(() => {
    startShuffle();
  }, 3000);
});
</script>

<style>
.game {
  -webkit-backdrop-filter: blur(3px);
  align-items: center;
  backdrop-filter: blur(3px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  height: 300px;
  position: relative;
  width: 600px;
}

@keyframes from0to1 {
  0% {
    transform: translateY(0);
    left: 50px;
  }
  50% {
    transform: translateY(-40px);
    left: 155px;
  }
  100% {
    transform: translateY(0);
    left: 250px;
  }
}

@keyframes from0to2 {
  0% {
    transform: translateY(0);
    left: 50px;
  }
  50% {
    transform: translateY(-80px);
    left: 250px;
  }
  100% {
    transform: translateY(0);
    left: 450px;
  }
}

@keyframes from1to2 {
  0% {
    transform: translateY(0);
    left: 250px;
  }
  50% {
    transform: translateY(-40px);
    left: 350px;
  }
  100% {
    transform: translateY(0);
    left: 450px;
  }
}

@keyframes from1to0 {
  0% {
    transform: translateY(0);
    left: 250px;
  }
  50% {
    transform: translateY(40px);
    left: 155px;
  }
  100% {
    transform: translateY(0);
    left: 50px;
  }
}

@keyframes from2to0 {
  0% {
    transform: translateY(0);
    left: 450px;
  }
  50% {
    transform: translateY(80px);
    left: 250px;
  }
  100% {
    transform: translateY(0);
    left: 50px;
  }
}

@keyframes from2to1 {
  0% {
    transform: translateY(0);
    left: 450px;
  }
  50% {
    transform: translateY(50px);
    left: 350px;
  }
  100% {
    transform: translateY(0);
    left: 250px;
  }
}

.from-0-to-1 {
  animation-name: from0to1;
}

.from-0-to-2 {
  animation-name: from0to2;
}

.from-1-to-2 {
  animation-name: from1to2;
}

.from-1-to-0 {
  animation-name: from1to0;
}

.from-2-to-0 {
  animation-name: from2to0;
}

.from-2-to-1 {
  animation-name: from2to1;
}
</style>
