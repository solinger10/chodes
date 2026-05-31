(function () {
  "use strict";

  const LABEL = "Chodes";
  const ITEM_COUNT = 49;
  const STYLE_COUNT = 22;
  const BACKGROUNDS = {
    cron: "cron.png",
    tanvir: "tanvir.jpeg",
    daniel: "daniel.webp",
    default: "trump.webp",
  };
  const REDUCED_MOTION =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createChode() {
    const style = randomInt(1, STYLE_COUNT);
    const runner = document.createElement("div");
    const outer = document.createElement("div");
    const inner = document.createElement("div");
    const speed = REDUCED_MOTION ? 1 : randomInt(1, 80);
    const duration = REDUCED_MOTION ? 60 : Math.max(4, 42 - speed * 0.45);

    runner.className = "chode-runner";
    runner.style.left = `${randomInt(-12, 87)}%`;
    runner.style.fontSize = `${Math.random() * 100 + 2}pt`;
    runner.style.setProperty("--duration", `${duration}s`);
    runner.style.setProperty("--delay", `${Math.random() * -duration}s`);

    outer.className = `style-${style} outer chode-text`;
    outer.dataset.content = LABEL;

    inner.className = `style-${style} inner`;
    inner.textContent = LABEL;

    outer.appendChild(inner);
    runner.appendChild(outer);

    return runner;
  }

  function addAll() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < ITEM_COUNT; i += 1) {
      fragment.appendChild(createChode());
    }

    document.body.appendChild(fragment);
  }

  function setCustomImage() {
    const params = new URLSearchParams(window.location.search);
    const requestedBackground = params.get("p");
    const background = BACKGROUNDS[requestedBackground] || BACKGROUNDS.default;

    document.body.style.backgroundImage = `url('${background}')`;
  }

  function main() {
    addAll();
    setCustomImage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main, { once: true });
  } else {
    main();
  }
})();
