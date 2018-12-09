
interface Circle {
    value: number;
    next: Circle;
    prev: Circle;
}

function stepClockwise(circle: Circle, offset: number) {
    let current = circle;
    for (let i = 0; i < offset; ++i) {
        current = current.next;
    }
    return current;
}

function stepCounterClockwise(circle: Circle, offset: number) {
    let current = circle;
    for (let i = 0; i < offset; ++i) {
        current = current.prev;
    }
    return current;
}

function day9(input: string, isPart2: boolean = false) {
    let regex = /^(\d+) players; last marble is worth (\d+) points$/;

    let result = regex.exec(input);

    let numPlayers = parseInt(result[1], 10);
    let numMarbles = parseInt(result[2], 10);

    if (isPart2) {
        numMarbles *= 100;
    }

    let circleStart: Circle = { value: 0, next: null, prev: null };
    circleStart.next = circleStart;
    circleStart.prev = circleStart;

    let players = new Array(numPlayers).fill(0);

    let currentMarble = circleStart;
    let currentPlayer = 0;
    for (let i = 1; i <= numMarbles; ++i) {
        if (i % 23 !== 0) {
            let offset1 = stepClockwise(currentMarble, 1);
            let offset2 = stepClockwise(currentMarble, 2);
            let newMarble: Circle = { value: i, prev: offset1, next: offset2 };
            offset1.next = newMarble;
            offset2.prev = newMarble;
            currentMarble = newMarble;
        } else {
            let offset7 = stepCounterClockwise(currentMarble, 7);
            players[currentPlayer] += offset7.value;
            offset7.prev.next = offset7.next;
            offset7.next.prev = offset7.prev;
            currentMarble = offset7.next;
            players[currentPlayer] += i;
        }

        ++currentPlayer;
        if (currentPlayer == players.length) {
            currentPlayer = 0;
        }
    }

    console.log(Math.max(...players));
}

day9(`9 players; last marble is worth 25 points`);

day9(`10 players; last marble is worth 1618 points`);
day9(`13 players; last marble is worth 7999 points`);
day9(`17 players; last marble is worth 1104 points`);
day9(`21 players; last marble is worth 6111 points`);
day9(`30 players; last marble is worth 5807 points`);
day9(`486 players; last marble is worth 70833 points`);
