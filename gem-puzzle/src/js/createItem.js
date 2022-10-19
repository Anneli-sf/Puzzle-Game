// let matrix = getMatrix();

import { shuffle } from "./shuffle";

let arrStart = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

let shuffledArray = shuffle(arrStart);

let matrix = getMatrix(shuffledArray);
console.log(matrix);

function createItems(matr) {
  const GAME = document.createElement("div");
  GAME.classList.add("game");

//   for (let i = 0; i < arrStart.length; i++) {
//     GAME.appendChild(createItem(arrStart[i], 2, 2));
//   }

for (let y = 0; y < matr.length; y++) {
    for (let x = 0; x < matr[y].length; x++) {
        let value = matr[y][x];
        // console.log('value', value);
        // console.log('x', x);
        // console.log('y', y);
        GAME.appendChild(createItem(value, x, y));
    }
}

// document.getElementById('id16').style.display = 'none';
  console.log('16', document.getElementById('id16'));

  return GAME;
}

function createItem(i, x, y) {
  const ITEM = document.createElement("div");
  ITEM.classList.add("square");
  ITEM.id = `id${i}`;

  const ITEM_NUMBER = document.createElement("button");
  ITEM_NUMBER.type = "button";
  ITEM_NUMBER.classList.add("number");
  ITEM_NUMBER.classList.add(`btn${i}`);
  ITEM_NUMBER.innerHTML = `
    <span>${i}</span>
    `;
  ITEM.appendChild(ITEM_NUMBER);

  ITEM.style.transform = `translate(${x * 100}%, ${y * 100}%)`;

  return ITEM;
}

function getMatrix(arr) {
  let matrix = [[], [], [], []];
  let x = 0;
  let y = 0;

  for (let i = 0; i < arr.length; i++) {
    if (x >= 4) {
      y++;
      x = 0;
    }
    matrix[y][x] = arr[i];
    x++;
  }

  return matrix;
}





export { createItem, createItems, getMatrix, matrix };
