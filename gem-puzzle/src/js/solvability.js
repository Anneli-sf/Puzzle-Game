function shuffle(arr) {
  const shuffledArray = [...arr];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

function countInversions(array) {
  let numberInverions = 0;
  const length = array.length - 1;
  for (let i = 0; i <= length; i++) {
    if (array[i] !== 0) {
      for (let j = i + 1; j <= length; j++) {
        if (array[j] !== 0 && array[i] > array[j]) {
          numberInverions++;
        }
      }
    }
  }

  return numberInverions;
}

function GetRowNumber(size, emptyTilePosition) {
  return Math.floor(emptyTilePosition / size);
}

function isFieldSolvable(numberOfInversions, size, emptyTilePosition) {
  const rowNumber = GetRowNumber(size, emptyTilePosition);

  if (size % 2 === 1) {
    return numberOfInversions % 2 === 0;
  }

  return (numberOfInversions + rowNumber) % 2 === 1;
}

function SwapTilesForSolvable(array) {
  const { length: len } = array;

  if (len < 2) return;

  if (array[0] !== 0 && array[1] !== 0) {
    swapTwoElements(array, 0, 1);
  } else {
    swapTwoElements(array, len - 1, len - 2);
  }
}

function getTileIndex(array, id) {
  return array.findIndex((el) => el === id);
}

function solvableShufle(array, size) {
  const result = shuffle(array);
  const numberInverions = countInversions(result);
  const emptyTilePosition = getTileIndex(result, array.length);
  const isSolvable = isFieldSolvable(numberInverions, size, emptyTilePosition);

  if (!isSolvable) {
    SwapTilesForSolvable(result);
  }

  return result;
}

function swapTwoElements(array, indexFirst, indexSecond) {
  const arr = array;
  [arr[indexFirst], arr[indexSecond]] = [arr[indexSecond], arr[indexFirst]];
}

export { solvableShufle };
