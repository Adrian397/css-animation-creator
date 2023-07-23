export const animationType = document.querySelector(".editor__animation-type");
export const animationDuration = document.querySelector(
  ".editor__animation-duration"
);
export const animationDelay = document.querySelector(
  ".editor__animation-delay"
);
export const animationTiming = document.querySelector(
  ".editor__animation-timing"
);
export const startStopButton = document.querySelector(".editor__startStop");
export const previewBox = document.querySelector(".preview-box");
export const cssPropertiesOutput = document.querySelector(
  ".css-output__properties"
);
export const cssKeyframesOutput = document.querySelector(
  ".css-output__keyframes"
);
export const copyBtns = document.querySelectorAll(".css-output__copyBtn");

export const getKeyframeCSS = (type) => {
  switch (type) {
    case "translate":
      return `@keyframes ${type} {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100px);
    }
  }`;
    case "rotate":
      return `@keyframes ${type} {
   0% {
    transform: rotate(0deg);
   }
   100% {
    transform: rotate(360deg);
   }
  }`;
    case "scale":
      return `@keyframes ${type} {
   0% {
    transform: scale(1);
   }
   100% {
    transform: scale(1.5);
   }
  }`;
    default:
      return "";
  }
};
