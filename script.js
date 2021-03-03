const colors = {
  white: "fff",
  "Paradise Pink": "ef476f",
  "Orange Yellow Crayola": "ffd166",
  "Caribbean Green": "06d6a0",
  "Blue NCS": "118ab2",
  "Midnight Green Eagle Green": "073b4c",
};

const shoeContainer = document.querySelector(".shoe");
const colorsContainer = document.querySelector(".colors");

const values = Object.values(colors);
const keys = Object.keys(colors);

let groups = [];

let activeColor = "white";

async function init() {
  const res = await fetch("./shoe4.svg");
  const svgText = await res.text();
  shoeContainer.innerHTML = svgText;

  groups = document.querySelectorAll("svg g");

  setInitalState();

  workTheShoe();

  values.forEach((color) => {
    const div = document.createElement("div");
    div.classList.add("color");
    div.style.setProperty("--color", `#${color}`);
    div.addEventListener("click", () => {
      document
        .querySelectorAll(".color")
        .forEach((c) => c.classList.remove("active"));
      div.classList.add("active");
      activeColor = `#${color}`;
    });

    colorsContainer.appendChild(div);
  });
}

init();

let iterator = 0;

function workTheShoe() {
  groups.forEach((g) => {
    g.addEventListener("click", () => {
      iterator++;
      if (iterator >= values.length) iterator = 0;
      g.style.color = activeColor;
      console.log(keys[iterator]);
    });
  });

  document.querySelector(".randomize").addEventListener("click", () => {
    groups.forEach((g) => {
      let i = Math.floor(Math.random() * values.length);
      console.log(i);
      g.style.color = `#${values[i]}`;
    });
  });
}

function setInitalState() {
  groups.forEach((g) => {
    g.style.color = "#118ab2";
  });
}
