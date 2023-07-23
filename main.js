import {
  animationDelay,
  animationDuration,
  animationTiming,
  animationType,
  copyBtns,
  cssKeyframesOutput,
  cssPropertiesOutput,
  getKeyframeCSS,
  previewBox,
  startStopButton,
} from "./main.util";
import "./style.scss";

const START = "Start";
const STOP = "Stop";
let isAnimationRunning = false;

const updateAnimation = () => {
  const type = animationType.value;
  const duration = animationDuration.value;
  const delay = animationDelay.value;
  const timing = animationTiming.value;

  const cssKeyframes = getKeyframeCSS(type);

  previewBox.style.animation = "none";

  setTimeout(() => {
    previewBox.style.animationName = type;
    previewBox.style.animationDuration = `${duration}s`;
    previewBox.style.animationDelay = `${delay}s`;
    previewBox.style.animationTimingFunction = timing;
    previewBox.style.animationPlayState = isAnimationRunning
      ? "running"
      : "paused";

    cssPropertiesOutput.value =
      `animation-name: ${type};\n` +
      `animation-duration: ${duration}s;\n` +
      `animation-delay: ${delay}s;\n` +
      `animation-timing-function: ${timing};`;

    cssKeyframesOutput.value = cssKeyframes;
  }, 0);
};

const handleStartStopBtn = () => {
  isAnimationRunning = !isAnimationRunning;

  const insertedValues = cssPropertiesOutput.value;
  insertedValues.split(";").forEach((style) => {
    const [key, value] = style.split(":");

    if (key && value) {
      switch (key.trim()) {
        case "animation-name":
          animationType.value = value.trim();
          break;
        case "animation-duration":
          animationDuration.value = value.trim().replace("s", "");
          break;
        case "animation-delay":
          animationDelay.value = value.trim().replace("s", "");
          break;
        case "animation-timing-function":
          animationTiming.value = value.trim();
          break;
      }
    }
  });

  updateAnimation();
  startStopButton.textContent = isAnimationRunning ? STOP : START;
  startStopButton.style.backgroundColor = isAnimationRunning
    ? "#dc143c"
    : "#50b0dd";
};

const handleCopyBtn = async (btn) => {
  const cssOutput = document.querySelector(`.${btn.dataset.target}`);
  try {
    await navigator.clipboard.writeText(cssOutput.value);
    alert("Code successfully copied!");
  } catch (err) {
    alert("Failed to copy the code");
    console.log(err);
  }
};

const onAnimationEnd = () => {
  isAnimationRunning = false;
  startStopButton.textContent = START;
  startStopButton.style.backgroundColor = "#50b0dd";
};

[animationType, animationDuration, animationDelay, animationTiming].forEach(
  (input) => input.addEventListener("change", updateAnimation)
);
startStopButton.addEventListener("click", handleStartStopBtn);
previewBox.addEventListener("animationend", onAnimationEnd);
copyBtns.forEach((button) =>
  button.addEventListener("click", () => handleCopyBtn(button))
);

updateAnimation();
