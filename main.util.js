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

export const loadDefaultKeyframes = (type) => {
  const stylesheet = Array.from(document.styleSheets).find(
    (sheet) =>
      sheet.href === null || sheet.href.startsWith(window.location.origin)
  );
  const keyframesRule = Array.from(stylesheet.cssRules).find(
    (rule) => rule.type === CSSRule.KEYFRAMES_RULE && rule.name === type
  );

  cssKeyframesOutput.value = keyframesRule ? keyframesRule.cssText : "";
};

export const addKeyframeRule = (stylesheet, rule) => {
  if (rule.trim() !== "") {
    while (stylesheet.cssRules.length > 0) {
      stylesheet.deleteRule(0);
    }
    try {
      stylesheet.insertRule(rule, stylesheet.cssRules.length);
    } catch (err) {
      console.error("Failed to insert rule:", err);
    }
  }
};
