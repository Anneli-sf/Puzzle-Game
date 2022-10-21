export function getMatrix(arr, n) {
  let matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push([]);
  }

  let x = 0;
  let y = 0;

  for (let i = 0; i < arr.length; i++) {
    if (x >= n) {
      y++;
      x = 0;
    }
    matrix[y][x] = arr[i];
    x++;
  }

  return matrix;
}
