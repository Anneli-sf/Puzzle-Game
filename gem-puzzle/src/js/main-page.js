import { shuffle } from "./shuffle";
import { getMatrix } from "./getMatrix";

//------------------------КОНСТАНТЫ---------------------------

const BODY = document.getElementById("body");

//------------------------ПЕРЕМЕННЫЕ---------------------------

let arrStart = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
// let shuffledArray = shuffle(arrStart);
// let matrix = getMatrix(shuffledArray);

//------------------------СЛУШАТЕЛИ---------------------------

//------------------------загрузка страницы---------------------------

window.addEventListener("load", () => {
    let shuffledArray = shuffle(arrStart);
    let matrix = getMatrix(shuffledArray);

  createBody(matrix);

  const NEW_GAME = document.getElementById("new-game");
  const GAME = document.getElementById("game");

    
    let matrixNew;

//-----клик по кнопке НОВАЯ ИГРА
  NEW_GAME.addEventListener("click", () => {
    shuffledArray = shuffle(arrStart);
    // matrixNew = getMatrix(shuffledArray);
    matrix = getMatrix(shuffledArray);
    newGame(matrix, GAME);

    // return matrixNew;
  });

  console.log('matrix', matrix);


  //-----клик по кнопке c цифрой

  const EMPTY_BTN = 'id16';
  GAME.addEventListener('click', (e) => {
    const CURR_BTN = e.target.closest('.square');
    const BTN_NUM = +CURR_BTN.id.slice(0,-2);
    const BTN_COORD = getCoordinates(BTN_NUM, matrix);
    
    // const EMPTY_BTN_COORD = getCoordinates(BTN_NUM, matrixNew);
    console.log(BTN_COORD);
    
  })
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

{/* <button type="button" class="btn-nav btn btn-outline-danger">Stop</button> */}

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
function newGame(matrixNew, GAME) {
    
    GAME.firstChild.remove();
    GAME.append(createItems(matrixNew));
    document.getElementById("16id").style.display = "none";

    
}

//------------------------игра---------------------------

function getCoordinates(number, mat) {
    for (let y=0; y < mat.length; y++) {
        for (let x=0; y< mat[y].length; x++) {
            if (mat[y][x] == number) return {x, y};
        }
    } return null;
};
