import { shuffle } from "./shuffle";
import { getMatrix } from "./getMatrix";
import { getArray } from "./getArray";

//------------------------КОНСТАНТЫ---------------------------

const BODY = document.getElementById("body");
const SOUND = new Audio(
  "../images/sound/perkussiya-odinochnyiy-derevyannyiy-zvonkiy.mp3"
);

//------------------------ПЕРЕМЕННЫЕ---------------------------

// let arrStart = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let chosenLevel = 4;
let arrStart = getArray(chosenLevel);
let shuffledArray = shuffle(arrStart);
let matrix = getMatrix(shuffledArray, chosenLevel);
let startMatrix = getMatrix(arrStart, chosenLevel);
// console.log(startMatrix);

//------------------------СЛУШАТЕЛИ---------------------------

//------------------------загрузка страницы---------------------------
createBody(matrix);

const NEW_GAME = document.getElementById("new-game");
const GAME = document.getElementById("game");

const SOUND_BTN = document.getElementById("flexSwitchCheckReverse");
const COUNTER = document.getElementById("moves");

const CHOSEN_LEVEL = document.getElementById('footer-nav');
const LEVEL_4 = document.getElementById('level-4');
const BTNS_LEVEL_ALL = [...document.getElementsByClassName('btn-option')];

LEVEL_4.classList.add('active');

//-----выбор уровня
CHOSEN_LEVEL.addEventListener('click', (e) => {
  const chosenButton = e.target.closest('button');
  chosenLevel = +chosenButton.value;

  BTNS_LEVEL_ALL.forEach(el => el.classList.remove('active'));
  chosenButton.classList.add('active');
 
  arrStart = getArray(chosenLevel);
  console.log('start', arrStart);
  console.log('level', chosenLevel);
  
  shuffledArray = shuffle(arrStart);
  console.log('shussarray',shuffledArray);
  matrix = getMatrix(shuffledArray, chosenLevel);
  newPosition(matrix, GAME);
  COUNTER.value = "0";

  console.log('level', chosenLevel);
  
  console.log('start', arrStart);

})

let hour = document.getElementById("hours");
let minute = document.getElementById("minutes");

SOUND_BTN.checked = true;

GAME.addEventListener(
  "click",
  () => {
    timer();
  },
  { once: true }
);

//-----клик по кнопке НОВАЯ ИГРА
NEW_GAME.addEventListener("click", () => {
  shuffledArray = shuffle(arrStart);
  matrix = getMatrix(shuffledArray, chosenLevel);
  newPosition(matrix, GAME);
  COUNTER.value = "0";
});

//-----клик по кнопке c цифрой в ИГРЕ

GAME.addEventListener("click", (e) => {
  const CURR_BTN = e.target.closest(".square");
  const BTN_NUM = +CURR_BTN.id.slice(0, -2);
  const BTN_COORD = getPosition(BTN_NUM, matrix);
  const EMPTY_BTN_COORD = getPosition(arrStart.length, matrix);
  const ableMove = isAbleToMove(BTN_COORD, EMPTY_BTN_COORD);


    if (ableMove) {
      moveBTN(BTN_COORD, EMPTY_BTN_COORD, matrix);
      newPosition(matrix, GAME);
      COUNTER.value = parseInt(COUNTER.value) + 1; //счетчик ходов
  }

  if (SOUND_BTN.checked == true) { //отключение звука
        SOUND.play();
      }

  if (JSON.stringify(matrix) == JSON.stringify(startMatrix)) //проверка на выйгрыш
    alert("you're winner!"); 
});

//---------------------------------------------создание одного элемента

function createItem(i, x, y) {
  const ITEM = document.createElement("div");
  ITEM.classList.add("square");
  ITEM.id = `${i}id`;

  const ITEM_NUMBER = document.createElement("button");
  ITEM_NUMBER.type = "button";
  ITEM_NUMBER.classList.add("number");
  ITEM_NUMBER.classList.add(`btn${i}`);
  ITEM_NUMBER.innerHTML = `
      <span>${i}</span>
      `;
  ITEM.appendChild(ITEM_NUMBER);

  ITEM.style.transform = `translate3d(${x * 100}%, ${y * 100}%, 0)`;

  let w = 100/chosenLevel;
  ITEM.style.width = `${w}%`;
  ITEM.style.height = `${w}%`;

  return ITEM;
}

//---------------------------------------------создание 16 элементов

function createItems(mat) {
  const GAME_WRAPPER = document.createElement("div");
  GAME_WRAPPER.id = "game-wrapper";
  GAME_WRAPPER.classList.add("game-wrapper");

  for (let y = 0; y < mat.length; y++) {
    for (let x = 0; x < mat[y].length; x++) {
      let value = mat[y][x];
      GAME_WRAPPER.appendChild(createItem(value, x, y));
    }
  }

  return GAME_WRAPPER;
}

//---------------------------------------------создание хедера и футера

function createHeader() {
  let HEADER = document.createElement("header");
  HEADER.classList.add("header");
  HEADER.classList.add("container-fluid");
  HEADER.innerHTML = `
        <nav class="nav">
              <button type="button" class="btn-nav btn btn-outline-primary" id="new-game">New Game</button>
              <button type="button" class="btn-nav btn btn-outline-secondary">Save</button>
              <button type="button" class="btn-nav btn btn-outline-success">Results</button>
        </nav>
        `;
  return HEADER;
}

/* <button type="button" class="btn-nav btn btn-outline-danger">Stop</button> */

function createFooter() {
  let FOOTER = document.createElement("footer");
  FOOTER.classList.add("footer");
  FOOTER.classList.add("container-fluid");
  FOOTER.innerHTML = `
        <nav class="nav" id="footer-nav">
              <p class="description">choose another size</p>
              <button class="btn-option btn btn-outline-secondary" id="level-3" value="3">3x3</button>
              <button class="btn-option btn btn-outline-success" id="level-4" value="4">4x4</button>
              <button class="btn-option btn btn-outline-secondary"  id="level-5" value="5">5x5</button>
              <button class="btn-option btn btn-outline-success" id="level-6" value="6">6x6</button>
              <button class="btn-option btn btn-outline-secondary"  id="level-7" value="7">7x7</button>
              <button class="btn-option btn btn-outline-success" id="level-8" value="8">8x8</button>
            </nav>
        `;
  return FOOTER;
}

//---------------------------------------------создание основной части страницы

function createMainSection() {
  const mainSection = document.createElement("main");
  mainSection.classList.add("main");
  mainSection.classList.add("container-fluid");
  mainSection.id = "main";
  mainSection.innerHTML = `
  <div class="game-info">
      <div class="form-check form-switch form-check-reverse">
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckReverse">
          <label class="form-check-label" for="flexSwitchCheckReverse">Sound</label>
      </div>

      <div class="timer">
          <p class="timer-title">Time</p>
          <input class="time" type="text" value="00" id="hours">
          <span>min</span>
          <p>:</p>
          <span>sec</span>
          <input class="time" type="text" value="00" id="minutes">
      </div>

      <div class="moves">
          <p class="moves-title">Moves</p>
          <input class="move" type="text" value="0" id="moves">
      </div>
  </div>   
  `;

  const GAME = document.createElement("div");
  GAME.id = "game";
  GAME.classList.add("game");
  mainSection.append(GAME);

  return mainSection;
}

//---------------------------------------------создание всего боди

function createBody(matrix) {
  let mainContainer = document.createElement("div");
  mainContainer.classList.add("page-container");
  BODY.appendChild(mainContainer);

  mainContainer.prepend(createHeader());
  mainContainer.append(createMainSection());
  mainContainer.append(createFooter());

  document.querySelector("#game").append(createItems(matrix));
  document.getElementById(`${arrStart.length}id`).style.display = "none";
}

//------------------------новая игра---------------------------
function newPosition(matr, GAME) {
  GAME.firstChild.remove();
  GAME.append(createItems(matr));
  document.getElementById(`${arrStart.length}id`).style.display = "none";
}

//------------------------ИГРА---------------------------

function getPosition(number, mat) {
  //получение координат
  for (let y = 0; y < mat.length; y++) {
    for (let x = 0; x < mat[y].length; x++) {
      if (mat[y][x] == number) return { x, y };
    }
  }
}

function isAbleToMove(pos1, pos2) {
  //проверка есть ли ход
  let differenceX = Math.abs(pos1.x - pos2.x);
  let differenceY = Math.abs(pos1.y - pos2.y);

  return (
    (differenceX == 1 || differenceY == 1) &&
    (pos1.x == pos2.x || pos1.y == pos2.y)
  );
}

function moveBTN(pos1, pos2, matr) {
  //перемещение кнопки
  const itemPos = matr[pos1.y][pos1.x];
  matr[pos1.y][pos1.x] = matr[pos2.y][pos2.x];
  matr[pos2.y][pos2.x] = itemPos;
  
}

//---------------ТАЙМЕР--------------
function timer() {
   minute.value = parseInt(minute.value) + 1;

  if (minute.value > 59) {
    hour.value = parseInt(hour.value) + 1;
    minute.value = "00";
  }

  if (hour.value < 30) {
    window.setTimeout(timer, 1000);
  } else alert("sorry. time is out");

  NEW_GAME.addEventListener("click", () => {
    minute.value = "00";
    hour.value = "00";
  });
}
