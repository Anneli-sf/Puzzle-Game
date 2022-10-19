import {createItems, createItem, getMatrix, matrix} from './createItem';

const BODY = document.getElementById("body");

// let arrStart = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
// let matrix = getMatrix(arrStart);
// console.log(matrix);

function createBody() {
  let mainContainer = document.createElement("div");
  mainContainer.classList.add("page-container");
  BODY.appendChild(mainContainer);

  mainContainer.prepend(createHeader());
  mainContainer.append(createMainSection());
  mainContainer.append(createFooter());

  document.getElementById('id16').style.display = 'none';

// console.log(document.getElementsByClassName('game'));
// console.log([...document.getElementsByClassName('square')]);

}

function createHeader() {
  let HEADER = document.createElement("header");
  HEADER.classList.add("header");
  HEADER.classList.add("container-fluid");
  HEADER.innerHTML = `
      <nav class="nav">
            <button type="button" class="btn btn-outline-primary">New Game</button>
            <button type="button" class="btn-nav btn btn-outline-danger">Stop</button>
            <button type="button" class="btn-nav btn btn-outline-secondary">Save</button>
            <button type="button" class="btn-nav btn btn-outline-success">Results</button>
          </nav>
      `;
  return HEADER;
}

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

function createMainSection() {
  let mainSection = document.createElement("main");
  mainSection.classList.add("main");
  mainSection.classList.add("container-fluid");

//   let GAME = document.createElement("div");
//   GAME.classList.add("game");
//   mainSection.append(GAME);
mainSection.append(createItems(matrix));


  return mainSection;
}

export {createBody, createFooter, createHeader, createMainSection};