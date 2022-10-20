import { shuffle } from "./shuffle";
import { getMatrix } from "./getMatrix";

//------------------------КОНСТАНТЫ---------------------------

const BODY = document.getElementById("body");
const SOUND = new Audio(
  "../images/sound/perkussiya-odinochnyiy-derevyannyiy-zvonkiy.mp3"
);

//------------------------ПЕРЕМЕННЫЕ---------------------------

let arrStart = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let shuffledArray = shuffle(arrStart);
let matrix = getMatrix(shuffledArray);
let startMatrix = getMatrix(arrStart);
console.log(startMatrix);

//------------------------СЛУШАТЕЛИ---------------------------

//------------------------загрузка страницы---------------------------
createBody(matrix);

const NEW_GAME = document.getElementById("new-game");
const GAME = document.getElementById("game");

const SOUND_BTN = document.getElementById("flexSwitchCheckReverse");

SOUND_BTN.checked = true;

// document.addEventListener("click", () => {
//   timer();
// });
timer();

// let matrixNew;

//-----клик по кнопке НОВАЯ ИГРА
NEW_GAME.addEventListener("click", () => {
  shuffledArray = shuffle(arrStart);
  matrix = getMatrix(shuffledArray);
  newPosition(matrix, GAME);
  // stopTimer();
  // startTimer();

  // timer();
});



//-----клик по кнопке c цифрой в ИГРЕ

GAME.addEventListener("click", (e) => {
  
  const CURR_BTN = e.target.closest(".square");
  const BTN_NUM = +CURR_BTN.id.slice(0, -2);
  const BTN_COORD = getPosition(BTN_NUM, matrix);
  const EMPTY_BTN_COORD = getPosition(16, matrix);
  const ableMove = isAbleToMove(BTN_COORD, EMPTY_BTN_COORD);

  

  if (ableMove) {
    moveBTN(BTN_COORD, EMPTY_BTN_COORD, matrix);
    newPosition(matrix, GAME);
    if (SOUND_BTN.checked == true) {
      SOUND.play();
    }
  }

  const COUNTER = document.getElementById('moves');
  COUNTER.value = parseInt(COUNTER.value) + 1;



  if (JSON.stringify(matrix) == JSON.stringify(startMatrix))
    alert("you're winner!"); //победил?
  // console.log(matrix);
  // console.log(startMatrix);
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

  ITEM.style.transform = `translate(${x * 100}%, ${y * 100}%)`;

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
// <div class="form-check form-switch">
//              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
//              <label class="form-check-label" for="flexSwitchCheckChecked">Sound</label>
//             </div>

function createFooter() {
  let FOOTER = document.createElement("footer");
  FOOTER.classList.add("footer");
  FOOTER.classList.add("container-fluid");
  FOOTER.innerHTML = `
        <nav class="nav">
              <p class="description">choose another size</p>
              <button class="btn-option btn btn-outline-secondary">3x3</button>
              <button class="btn-option btn btn-outline-success">4x4</button>
              <button class="btn-option btn btn-outline-secondary">5x5</button>
              <button class="btn-option btn btn-outline-success">6x6</button>
              <button class="btn-option btn btn-outline-secondary">7x7</button>
              <button class="btn-option btn btn-outline-success">8x8</button>
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
  document.getElementById("16id").style.display = "none";
}

//------------------------новая игра---------------------------
function newPosition(matr, GAME) {
  GAME.firstChild.remove();
  GAME.append(createItems(matr));
  document.getElementById("16id").style.display = "none";
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
  let hour = document.getElementById("hours");
  let minute = document.getElementById("minutes");

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

// function startTimer() {
//   window.TimerId = window.setInterval(timer, 1000);
// }

// function stopTimer() {
//   window.clearInterval(window.TimerId);

// }




