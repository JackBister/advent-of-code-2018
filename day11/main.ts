
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
    let summedAreaTable = new Array(300);
    for (let y = 0; y < summedAreaTable.length; ++y) {
        summedAreaTable[y] = new Array(300);
        for (let x = 0; x < summedAreaTable[y].length; ++x) {
            let value = calculatePowerLevel(x, y, serial);
            let down1 = y === 0 ? 0 : summedAreaTable[y - 1][x];
            let back1 = x === 0 ? 0 : summedAreaTable[y][x - 1];
            let back1down1 = (x == 0 || y == 0) ? 0 : summedAreaTable[y - 1][x - 1];
            summedAreaTable[y][x] = value + down1 + back1 - back1down1;
        }
    }

    let maxSum3 = Number.MIN_SAFE_INTEGER;
    let maxSum3Coordinate = null;

    let maxSum = Number.MIN_SAFE_INTEGER;
    let maxSumCoordinate = null;
    let maxSumSize = 0;
    for (let i = 0; i < 300; ++i) {
        for (let y = 0; y < summedAreaTable.length; ++y) {
            if (y - i < 0) {
                continue;
            }
            for (let x = 0; x < summedAreaTable[y].length; ++x) {
                if (x - i < 0) {
                    continue;
                }
                let topLeft = summedAreaTable[y - i][x - i];
                let topRight = summedAreaTable[y - i][x];
                let bottomLeft = summedAreaTable[y][x - i];
                let bottomRight = summedAreaTable[y][x];
                let sum = bottomRight + topLeft - topRight - bottomLeft;
                if (sum > maxSum) {
                    maxSum = sum;
                    maxSumCoordinate = [x - i + 2, y - i + 2];
                    maxSumSize = i;
                }
                if (i === 3 && sum > maxSum3) {
                    maxSum3 = sum;
                    maxSum3Coordinate = [x - i + 2, y - i + 2];
                }
            }
        }
    }
    console.log(maxSum3, maxSum3Coordinate);
    console.log(maxSum, maxSumCoordinate, maxSumSize);
}

day11(18);

day11(42);

day11(7315);
