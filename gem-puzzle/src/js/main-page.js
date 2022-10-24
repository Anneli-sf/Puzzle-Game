import { shuffle } from "./shuffle";
import { getMatrix } from "./getMatrix";
import { getArray } from "./getArray";
import { sortResults } from "./sortResults";

//------------------------КОНСТАНТЫ---------------------------

const BODY = document.getElementById("body");
const SOUND = new Audio(
  "../images/sound/perkussiya-odinochnyiy-derevyannyiy-zvonkiy.mp3"
);

//------------------------ПЕРЕМЕННЫЕ---------------------------

// let arrStart = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const levels = [3, 4, 5, 6, 7, 8];
// let chosenLevel = levels[1];
let chosenLevel;
getLevelLocalStorage();
// let arrStart;
let arrStart = getArray(chosenLevel);
let shuffledArray;
let matrix;
getCurrPositionLocalStorage();

// let matrix = getMatrix(shuffledArray, chosenLevel);
let startMatrix;

// console.log(arrStart);
// let arrStart = getArray(chosenLevel);
// let shuffledArray = shuffle(arrStart);
// let matrix = getMatrix(shuffledArray, chosenLevel);
// let startMatrix = getMatrix(arrStart, chosenLevel);

// let results = [];
let results;
let winner = false;
getResultsLocalStorage();

//------------------------загрузка страницы---------------------------
// createBody(arrStart);

createBody(shuffledArray);
setPosition(matrix, arrStart);

const NEW_GAME = document.getElementById("new-game");
const GAME = document.getElementById("game");

const SOUND_BTN = document.getElementById("flexSwitchCheckReverse");
const COUNTER = document.getElementById("moves");

const CHOSEN_LEVEL = document.getElementById("footer-nav");
const LEVEL_4 = document.getElementById("level-4");
const BTNS_LEVEL_ALL = [...document.getElementsByClassName("btn-option")];
// const MODAL_WIN = document.getElementById("modal");
const RESULTS_BTN = document.getElementById("btn-results");
const SAVE_BTN = document.getElementById("btn-save");

let EMPTY_BTN_NUM = arrStart.length;
let min = document.getElementById("mins");
let sec = document.getElementById("secs");

// LEVEL_4.classList.add("active");
// SOUND_BTN.checked = true;
getSoundLocalStorage();
getLevelBtnLocalStorage(chosenLevel);
getMovesLocalStorage();
getTimeLocalStorage();
// if (!localStorage.getItem("level")) LEVEL_4.classList.add("active");


  GAME.addEventListener(
    "click",
    () => {
      startTimer();
    },
    { once: true }
  );


// SOUND_BTN.addEventListener("click", setSoundLocalStorage);

//-----выбор уровня
CHOSEN_LEVEL.addEventListener("click", (e) => {
  chooseLevel(e);
  stopTimer();
  // zeroTime();
});

//-----клик по кнопке НОВАЯ ИГРА
NEW_GAME.addEventListener("click", clickNewGame);

//-----клик по фишкам

  GAME.addEventListener("click", (e) => {
    toGame(e);
  });




//-----показать ТОП-10 результатов
RESULTS_BTN.addEventListener("click", showBestResults);

//-----сохранение результатов
SAVE_BTN.addEventListener("click", () => {
  setSoundLocalStorage();
});

//---------------------------------------------создание всего боди
function createBody(arr) {
  let mainContainer = document.createElement("div");
  mainContainer.classList.add("page-container");
  mainContainer.id = "page";
  BODY.appendChild(mainContainer);

  mainContainer.append(createMainSection(arr));
  mainContainer.prepend(createHeader());
  mainContainer.append(createFooter());
  BODY.append(createResultsTable());
  // createTableRows();
  // console.log(createTableRows());

  document.getElementById(`${arr.length}id`).style.display = "none";
}

function setPosition(mat, arr) {
  //задание позиции

  for (let y = 0; y < mat.length; y++) {
    for (let x = 0; x < mat[y].length; x++) {
      let value = mat[y][x];
      let index = arr[value - 1];
      styleItem(
        document.getElementById("game-wrapper").children[index - 1],
        x,
        y
      );
    }
  }

  // document.getElementById(`${arr.length}id`).style.display = "none";
}

function styleItem(item, x, y) {
  //задание позиции
  item.style.transform = `translate(${x * 100}%, ${y * 100}%)`;
}

function createItem(i) {
  //-----------------------------создание одного элемента
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

  // ITEM.style.transform = `translate(${x * 100}%, ${y * 100}%)`;

  let w = 100 / chosenLevel;
  ITEM.style.width = `${w}%`;
  ITEM.style.height = `${w}%`;

  return ITEM;
}

function createGameWrapper(arr) {
  //----------------------создание 16 элементов
  const GAME_WRAPPER = document.createElement("div");
  GAME_WRAPPER.id = "game-wrapper";
  GAME_WRAPPER.classList.add("game-wrapper");

  for (let i = 1; i < arr.length + 1; i++) {
    let ITEM = createItem(i);
    setPosition(ITEM);
    GAME_WRAPPER.append(ITEM);
  }
  return GAME_WRAPPER;
}

function createMainSection(arr) {
  //------------создание основной части страницы
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
          <input class="time" type="text" value="00" id="mins">
          <span>min</span>
          <p>:</p>
          <span>sec</span>
          <input class="time" type="text" value="00" id="secs">
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
  GAME.append(createGameWrapper(arr));
  mainSection.append(GAME);

  return mainSection;
}

function createHeader() {
  //---------------------------------------------создание хедера
  let HEADER = document.createElement("header");
  HEADER.classList.add("header");
  HEADER.classList.add("container-fluid");
  HEADER.innerHTML = `
        <nav class="nav">
              <button type="button" class="btn-nav btn btn-outline-primary" id="new-game">New Game</button>
              <button type="button" class="btn-nav btn btn-outline-secondary" id="btn-save">Save</button>
              <button type="button" class="btn-nav btn btn-outline-success" id="btn-results" data-bs-toggle="modal" data-bs-target="#resultsModul">Results</button>
        </nav>
        `;
  return HEADER;
}
/* <button type="button" class="btn-nav btn btn-outline-danger">Stop</button> */
function createFooter() {
  //---------------------------------------------создание футера
  let FOOTER = document.createElement("footer");
  FOOTER.classList.add("footer");
  FOOTER.classList.add("container-fluid");
  FOOTER.innerHTML = `
        <nav class="nav" id="footer-nav">
              <p class="description">choose another size</p>
              <button class="btn-option btn btn-outline-secondary" id="level-3" value="${levels[0]}">3x3</button>
              <button class="btn-option btn btn-outline-success" id="level-4" value="${levels[1]}">4x4</button>
              <button class="btn-option btn btn-outline-secondary"  id="level-5" value="${levels[2]}">5x5</button>
              <button class="btn-option btn btn-outline-success" id="level-6" value="${levels[3]}">6x6</button>
              <button class="btn-option btn btn-outline-secondary"  id="level-7" value="${levels[4]}">7x7</button>
              <button class="btn-option btn btn-outline-success" id="level-8" value="${levels[5]}">8x8</button>
            </nav>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">
            </button>
        `;
  return FOOTER;
}

//---------создание окна о выйгрыше
function createWinModal() {
  const MODAL = document.createElement("div");
  MODAL.classList.add("modal", "fade");
  MODAL.id = "modal";
  MODAL.tabIndex = "-1";
  MODAL.ariaLabelledby = "modalLabel";
  MODAL.ariaHidden = "true";
  MODAL.innerHTML = `
  <div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="modalLabel">You win!</h1>
      <button type="button" class="btn-close btn-close-win" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <p>"Hooray! You solved the puzzle in ${min.value} min ${sec.value} sec and  ${COUNTER.value} moves!".</p>
    </div>
  </div>
</div>
  `;
  return MODAL;
}

//---------создание модала результатов
function createResultsTable() {
  const RESULTS = document.createElement("div");
  RESULTS.classList.add("modal", "fade", "modal-table");
  RESULTS.id = "resultsModul";
  RESULTS.tabIndex = "-1";
  RESULTS.ariaLabelledby = "resultsModulLabel";
  RESULTS.ariaHidden = "true";
  RESULTS.innerHTML = `
 
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="resultsModulLabel">Best Results</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
      <div class="modal-body">
      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Level</th>
          <th scope="col">Moves</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
      </div>
    </div>
  </div>
  `;
  return RESULTS;
}

//-------------отрисовка таблицы с результатами
function createTableRows() {
  for (let i = 0; i < 10; i++) {
    const TR = document.createElement("tr");

    // TR.innerHTML = `
    //     <td>${i + 1}</td>
    //     <td class="td-level"></td>
    //     <td class="td-moves"></td>
    //     <td class="td-time"></td>
    // `;

    for (let j = 0; j < 4; j++) {
      const TD = document.createElement("td");
      if (j == 0) TD.innerHTML = `${i + 1}`; //номер позиции
      if (results[i]) {
        if (j == 1) TD.innerHTML = `${results[i].level}x${results[i].level}`;
        if (j == 2) TD.innerHTML = `${results[i].moves}`;
        if (j == 3) TD.innerHTML = `${results[i].mins}:${results[i].secs}`;
      }
      TR.append(TD);
    }
    switch (i) {
      case 0:
        TR.classList.add("table-primary");
        break;
      case 2:
        TR.classList.add("table-success");
        break;
      case 4:
        TR.classList.add("table-danger");
        break;
      case 6:
        TR.classList.add("table-warning");
        break;
      case 8:
        TR.classList.add("table-info");
        break;
      default:
        TR.classList.add("table-secondary");
    }
    // if (results.moves) {
    //   document.querySelector('td-moves').innerHTML = `${results.moves[0]}`
    // }
    document.querySelector("tbody").append(TR);
  }
}

//------------------------ИГРА---------------------------
//-----клик по кнопке НОВАЯ ИГРА
function clickNewGame() {
  shuffledArray = shuffle(arrStart);
  matrix = getMatrix(shuffledArray, chosenLevel);
  setPosition(matrix, arrStart);
  
  stopTimer();
  zeroTime();
  

  if (+COUNTER.value) {
    GAME.addEventListener(
      "click",
      () => {
        startTimer();
      },
      { once: true }
    );
  } 

  COUNTER.value = "0";

  
}

//---------------------выбор уровня
function chooseLevel(e) {
  const chosenButton = e.target.closest("button");
  chosenLevel = +chosenButton.value;

  SAVE_BTN.addEventListener("click", () => {
    setLevelBtnLocalStorage(chosenLevel);
    setLevelLocalStorage(chosenLevel);
  });

  // setLevelLocalStorage(chosenLevel);
  // setLevelBtnLocalStorage(chosenLevel);
  console.log("chosenLevel", chosenLevel);

  BTNS_LEVEL_ALL.forEach((el) => el.classList.remove("active"));
  chosenButton.classList.add("active");

  arrStart = getArray(chosenLevel);
  EMPTY_BTN_NUM = arrStart.length;
  console.log("arrStart", arrStart);
  shuffledArray = shuffle(arrStart);
  console.log("shuffledArray", shuffledArray);
  matrix = getMatrix(shuffledArray, chosenLevel);
  console.log("matrix", matrix);
  startMatrix = getMatrix(arrStart, chosenLevel);

  GAME.firstChild.remove();
  GAME.append(createGameWrapper(shuffledArray));
  setPosition(matrix, arrStart);
  

  document.getElementById(`${shuffledArray.length}id`).style.display = "none";

  stopTimer();
  zeroTime()

  if (+COUNTER.value) {
    GAME.addEventListener(
      "click",
      () => {
        startTimer();
      },
      { once: true }
    );
  }
  COUNTER.value = "0";
}

//-----клик по фишкам
function toGame(e) {
  
  const CURR_BTN = e.target.closest(".square");
  const BTN_NUM = +CURR_BTN.id.slice(0, -2);
  const BTN_COORD = getPosition(BTN_NUM, matrix);
  const EMPTY_BTN_COORD = getPosition(EMPTY_BTN_NUM, matrix);
  const ableMove = isAbleToMove(BTN_COORD, EMPTY_BTN_COORD);

  if (ableMove) {
    moveBTN(BTN_COORD, EMPTY_BTN_COORD, matrix);
    setPosition(matrix, arrStart);
    // setCurrPositionLocalStorage();
    COUNTER.value = parseInt(COUNTER.value) + 1; //счетчик ходов

    SAVE_BTN.addEventListener("click", () => {
      setMovesLocalStorage();
      setCurrPositionLocalStorage();
    });
  }

  if (SOUND_BTN.checked == true) {
    //отключение звука
    SOUND.play();
  }

  isWin(matrix, startMatrix);
}

//------------------------получение координат
function getPosition(number, mat) {
  for (let y = 0; y < mat.length; y++) {
    for (let x = 0; x < mat[y].length; x++) {
      if (mat[y][x] == number) return { x, y };
    }
  }
}

//----------------------------проверка есть ли ход
function isAbleToMove(pos1, pos2) {
  let differenceX = Math.abs(pos1.x - pos2.x);
  let differenceY = Math.abs(pos1.y - pos2.y);

  return (
    (differenceX == 1 || differenceY == 1) &&
    (pos1.x == pos2.x || pos1.y == pos2.y)
  );
}

//-----------------------------перемещение кнопки
function moveBTN(pos1, pos2, matr) {
  const itemPos = matr[pos1.y][pos1.x];
  matr[pos1.y][pos1.x] = matr[pos2.y][pos2.x];
  matr[pos2.y][pos2.x] = itemPos;
}

//---------------ТАЙМЕР--------------
function timer() {
  sec.value = parseInt(sec.value) + 1;

  if (sec.value > 59) {
    min.value = parseInt(min.value) + 1;
    sec.value = "00";
  }

  SAVE_BTN.addEventListener("click", () => {
    setTimeLocalStorage();
    // stopTimer();
  });

  // setTimeLocalStorage();

  // NEW_GAME.addEventListener("click", () => {
  //   stopTimer();
  // });

  // CHOSEN_LEVEL.addEventListener("click", (e) => {
  //   if (e.target.closest("button")) {
  //     stopTimer();
  //   }
  // });
}

function startTimer() {
  zeroTime();
  window.timerId = window.setInterval(timer, 1000);

  // NEW_GAME.addEventListener("click", () => {
  //   stopTimer();
  //   // zeroTime();
  // });

  // CHOSEN_LEVEL.addEventListener("click", (e) => {
  //   if (e.target.closest("button")) {
  //     stopTimer();
  //     // zeroTime();
  //   }
  // });
}

function stopTimer() {
  window.clearInterval(window.timerId);
}

function zeroTime() {
  sec.value = "00";
  min.value = "00";
}

//------------------------------проверка на выйгрыш
function isWin(mat, startMat) {
  if (JSON.stringify(mat) == JSON.stringify(startMat) || COUNTER.value == 3) {
    BODY.append(createWinModal());
    setTimeout(() => {
      document.getElementById("modal").classList.add("show");
      document.querySelector(".btn-close-win").addEventListener("click", () => {
        document.getElementById("modal").remove("show");
      });
      stopTimer();
    }, 1000);

    results.push({
      level: chosenLevel,
      mins: min.value,
      secs: sec.value,
      moves: COUNTER.value,
    });

    setResultsLocalStorage();
  }
}

function setResultsLocalStorage() {
  localStorage.setItem("results", JSON.stringify(results));
}

function getResultsLocalStorage() {
  if (localStorage.getItem("results")) {
    results = JSON.parse(localStorage.getItem("results"));
  } else {
    results = [];
  }
}

//--------------------показать ТОП-10 результатов
function showBestResults() {
  document.querySelector("tbody").innerHTML = ``;
  sortResults(results);
  createTableRows();
}

//---------------------------------LOCAL STORAGE
//-----------------звук
function setSoundLocalStorage() {
  localStorage.setItem("sound", SOUND_BTN.checked);
}

function getSoundLocalStorage() {
  if (localStorage.getItem("sound")) {
    SOUND_BTN.checked = JSON.parse(localStorage.getItem("sound"));
  } else {
    SOUND_BTN.checked = true;
  }
}
//-----------------уровень
function setLevelLocalStorage(chosenLevel) {
  localStorage.setItem("level", chosenLevel);
}

function getLevelLocalStorage() {
  if (localStorage.getItem("level")) {
    chosenLevel = localStorage.getItem("level");
  } else {
    chosenLevel = levels[1];
  }
}

//-----------------время
function setTimeLocalStorage() {
  localStorage.setItem("min", min.value);
  localStorage.setItem("sec", sec.value);
}

function getTimeLocalStorage() {
  if (localStorage.getItem("min")) {
    min.value = localStorage.getItem("min");
  } else min.value = "00";

  if (localStorage.getItem("sec")) {
    sec.value = localStorage.getItem("sec");
  } else sec.value = "00";
}

//-------------кнопка уровня
function setLevelBtnLocalStorage(chosenLevel) {
  localStorage.setItem("chosenLevelBtn", chosenLevel);
  BTNS_LEVEL_ALL.forEach((el) => el.classList.remove("active"));
  BTNS_LEVEL_ALL.forEach((el) => {
    if (el.value == chooseLevel) el.classList.add("active");
  });
}

function getLevelBtnLocalStorage(choseLevel) {
  if (localStorage.getItem("chosenLevelBtn")) {
    BTNS_LEVEL_ALL.forEach((el) => el.classList.remove("active"));
    BTNS_LEVEL_ALL.forEach((el) => {
      if (el.value == choseLevel) el.classList.add("active");
    });
  } else LEVEL_4.classList.add("active");
}

//--------------ходы
function setMovesLocalStorage() {
  localStorage.setItem("moves", COUNTER.value);
}

function getMovesLocalStorage() {
  if (localStorage.getItem("moves"))
    COUNTER.value = localStorage.getItem("moves");
  else COUNTER.value = 0;
}

//--------------состояние ходов
function setCurrPositionLocalStorage() {
  localStorage.setItem("shuffledArray", JSON.stringify(shuffledArray));
  localStorage.setItem("matrix", JSON.stringify(matrix));
}

function getCurrPositionLocalStorage() {
  if (localStorage.getItem("shuffledArray")) {
    shuffledArray = JSON.parse(localStorage.getItem("shuffledArray"));
  } else {
    shuffledArray = shuffle(arrStart);
  }

  if (localStorage.getItem("matrix")) {
    matrix = JSON.parse(localStorage.getItem("matrix"));
  } else matrix = getMatrix(shuffledArray, chosenLevel);
}

//------------------------------/ Local Storage
