import { ref } from "vue";

const difficulties = ["easy", "hard"];
const positionsX = ["50px", "250px", "450px"];
const shells = 3;
const shuffleCount = 10;

const animationDuration = ref(0);

export const useGameSettings = () => {
  const setDifficulty = (difficulty: "easy" | "hard") => {
    switch (difficulty) {
      case "easy":
        animationDuration.value = 500;
        break;
      case "hard":
        animationDuration.value = 200;
        break;
    }
  };

  return {
    animationDuration,
    difficulties,
    positionsX,
    setDifficulty,
    shells,
    shuffleCount,
  };
};
