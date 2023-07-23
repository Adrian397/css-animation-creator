import {
  addKeyframeRule,
  animationDelay,
  animationDuration,
  animationTiming,
  animationType,
  copyBtns,
  cssKeyframesOutput,
  cssPropertiesOutput,
  loadDefaultKeyframes,
  previewBox,
  startStopButton,
} from "./main.util";
import "./style.scss";

const styleElement = document.createElement("style");
document.head.appendChild(styleElement);
const styleSheet = styleElement.sheet;

const START = "Start";
const STOP = "Stop";
let isAnimationRunning = false;

const updateAnimation = () => {
  const type = animationType.value;
  const duration = animationDuration.value;
  const delay = animationDelay.value;
  const timing = animationTiming.value;

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
  }, 0);
};

const handleStartStopBtn = () => {
  isAnimationRunning = !isAnimationRunning;

  addKeyframeRule(styleSheet, cssKeyframesOutput.value);
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

animationType.addEventListener("change", () => {
  loadDefaultKeyframes(animationType.value);
});
[animationType, animationDuration, animationDelay, animationTiming].forEach(
  (input) => input.addEventListener("change", updateAnimation)
);
startStopButton.addEventListener("click", handleStartStopBtn);
previewBox.addEventListener("animationend", onAnimationEnd);
copyBtns.forEach((button) =>
  button.addEventListener("click", () => handleCopyBtn(button))
);

loadDefaultKeyframes(animationType.value);
updateAnimation();
