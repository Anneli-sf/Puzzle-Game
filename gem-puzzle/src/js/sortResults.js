export function sortResults(arr) {
    arr.sort((a,b) => a.moves - b.moves);
    return arr.length > 10 ? arr.slice(0, 10) : arr;
}

