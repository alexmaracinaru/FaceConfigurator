const headContainer = document.querySelector(".head");
const colorsContainer = document.querySelector(".colors");

let options = [];

const features = {
  hair: false,
  beard: false,
  mustache: false,
};

async function init() {
  const res = await fetch("./head.svg");
  const svgText = await res.text();
  headContainer.innerHTML = svgText;

  options = document.querySelectorAll(".option");

  document
    .querySelectorAll(".option")
    .forEach((option) => option.addEventListener("click", toggleOption));

  const colors = document.querySelectorAll(".color");
  colors.forEach((color) => {
    const feature = color.dataset.feature;
    color.addEventListener("click", () => {
      document
        .querySelectorAll(`.color[data-feature=${feature}]`)
        .forEach((c) => c.classList.remove("active"));
      color.classList.add("active");
      const activeColor = color.computedStyleMap().get("--color");
      document.querySelectorAll(`svg [data-color=${feature}]`).forEach((c) => {
        c.style.color = activeColor;
      });
    });
  });
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;
  const featureElement = document.querySelector(
    `svg [data-feature=${feature}]`
  );
  console.log(feature);

  features[feature] = !features[feature];

  if (features[feature]) {
    console.log(`Feature ${feature} is turned on!`);

    featureElement.style.display = "block";

    const selectedFeature = createFeatureElement(feature);
    document.querySelector(".selectedFeatures").appendChild(selectedFeature);

    const startPos = target.getBoundingClientRect();
    console.log(startPos);

    const endPos = selectedFeature.getBoundingClientRect();

    const difX =
      startPos.left - endPos.left + startPos.width / 2 - endPos.width / 2;
    const difY =
      startPos.top - endPos.top + startPos.height / 2 - endPos.height / 2;

    selectedFeature.style.transform = `translate(${difX}px, ${difY}px)`;

    requestAnimationFrame(() => {
      selectedFeature.style.transition = `all 0.5s linear`;
      selectedFeature.style.transform = `translate(0, 0)`;
    });
  } else {
    console.log(`Feature ${feature} is turned off!`);

    featureElement.style.display = "none";

    document
      .querySelector(`.selectedFeature[data-feature=${feature}]`)
      .remove();
  }
}

function createFeatureElement(feature) {
  const div = document.createElement("div");
  div.classList.add("selectedFeature");
  div.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `./${feature}.svg`;
  img.alt = feature;

  div.append(img);

  return div;
}

function runAnimationOnce(element, className, callback = () => {}) {
  if (!element) return;
  element.classList.add(className);
  element.addEventListener("animationend", () => {
    element.classList.remove(className);
    callback();
  });
}

init();
