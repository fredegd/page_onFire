const textContainer = document.getElementById("textContainer");

const res = 24;
const step = 1;
const str1 = "This    page     is     getting     on      Fire!!";

const rowCount = Math.ceil((res * 2) / step);
let count = 0;
let m;
let toBeCleared = false;

const iter = setInterval(() => {
  textContainer.innerHTML = "";
  for (let j = 0; j <= res; j += step) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let i = 0; i <= res * 4; i += step) {
      const charIndex = Math.floor(i + j + count*1) % (str1.length - 1);
      const character = document.createElement("p");
      character.classList.add("character");
      character.textContent = str1.charAt(charIndex);
      row.appendChild(character);
    }
    textContainer.appendChild(row);
  }

  count += 1;
  const rows = textContainer.querySelectorAll(".row");
  rows.forEach((row, rowIndex) => {
    const characters = row.querySelectorAll(".character");
    characters.forEach((character, columnIndex) => {
      const x = columnIndex * step;
      const y = rowIndex * step;
      const d = Math.sqrt(Math.pow(x - res, 2) + Math.pow(y - res, 2));
      const maxDist = Math.max(Math.sqrt(Math.pow(res, 2) * 2), 1);
     
      const gray = remap(
        d,
        1,
        maxDist *
          (Math.cos(x * 0.5 +Math.cos(y)*0.1) +
            Math.cos(y*0.1-count * 0.05 - Math.abs(y * 0.2))),
        0,
        255
      );
      character.style.color = `rgb(${gray },${gray/3},${gray/10})`;
      character.style.fontSize = `${100 / res / 4}vw`;
       character.style.letterSpacing=`${100/res/20}vw`;
    });
  });
  toBeCleared = true;
}, 100);

if (toBeCleared) {
  clearInterval(iter);
}
//clearInterval(iter);

function remap(value, fromLow, fromHigh, toLow, toHigh) {
  return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
}

function radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}
