
function calculatePowerLevel(x: number, y: number, serial: number) {
    let rackId = x + 1 + 10;
    let powerLevel = rackId * (y + 1);
    powerLevel += serial;
    powerLevel *= rackId;
    powerLevel = Math.floor((powerLevel % 1000) / 100);
    powerLevel -= 5;
    return powerLevel;
}

function day11(serial: number) {
    let grid: number[][] = new Array(300);
    let gridSumX: number[][] = new Array(300);
    for (let y = 0; y < grid.length; ++y) {
        grid[y] = new Array(300).fill(0);
        gridSumX[y] = new Array(298).fill(0);

        for (let x = 0; x < grid[y].length; ++x) {
            grid[y][x] = calculatePowerLevel(x, y, serial);

            if (x >= 2) {
                gridSumX[y][x] = grid[y][x - 2] + grid[y][x - 1] + grid[y][x];
            }
        }
    }

    let maxSum = Number.MIN_SAFE_INTEGER;
    let maxSumCoordinate = null;
    for (let y = 0; y < gridSumX.length - 2; ++y) {
        for (let x = 0; x < gridSumX[y].length; ++x) {
            let sum = gridSumX[y][x] + gridSumX[y + 1][x] + gridSumX[y + 2][x];

            if (sum > maxSum) {
                maxSum = sum;
                maxSumCoordinate = [x - 1, y + 1];
            }
        }
    }

    console.log(maxSum, maxSumCoordinate);
}


console.log(calculatePowerLevel(2, 4, 8));

day11(18);

day11(42);

day11(7315);
