

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function isValid(array2D) {
    for (let i = 0; i < 9; i++) {
        if (array2D[0][i] === array2D[1][i] && array2D[1][i] === array2D[2][i]) {
            return false;
        }
    }
    return true;
}

function randIntExcluding(min, max, ...exclude) {
    let num;
    do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (exclude.includes(num));
    return num;
}


function genRandomGrid() {
    const grid = Array.from({ length: 3 }, () => Array(5).fill(true).concat(Array(4).fill(false)));

    shuffle(grid[0]);

    do {
        shuffle(grid[1]);
        shuffle(grid[2]);
    } while (!isValid(grid));

    for (let i = 0; i < 9; i++) {
        if (grid[0][i]) {
            grid[0][i] = randIntExcluding(10*i + 1, 10*i + 9);
        }
        if (grid[1][i]) {
            grid[1][i] = randIntExcluding(10*i + 1, 10*i + 9, grid[0][i]);
        }
        if (grid[2][i]) {
            grid[2][i] = randIntExcluding(10*i + 1, 10*i + 9, grid[0][i], grid[1][i]);
        }
    }

    return grid;
}
