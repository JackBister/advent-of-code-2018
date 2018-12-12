
// Requires Node v10.4 or higher
declare function BigInt(n: number): number;

function day12(initialState: string, transitionsInput: string) {

    let state = ['.', '.', '.', '.'].concat(...Array.from(initialState), '.', '.', '.', '.');

    let transitions = new Map<string, string>();

    let tr = transitionsInput.split('\n');

    tr.forEach((r) => {
        let key = r.slice(0, 5);
        let value = r[r.length - 1];
        transitions.set(key, value);
    });

    let indexOfPosition0 = 4;

    let gen = 0;
    let lastDiffs = new Array(100);
    let lastSum = 0;
    while (true) {
        let newState = ['.', '.', '.', '.'].concat(...state, '.', '.', '.', '.');
        indexOfPosition0 += 4;
        let diffs = 0;
        for (let x = 2; x < state.length - 3; ++x) {
            let sstr = state.slice(x - 2, x + 3);
            if (transitions.has(sstr.join(''))) {
                let news = transitions.get(sstr.join(''));
                newState[x + 4] = news;
                if (news !== state[x]) {
                    diffs++;
                }
            } else {
                newState[x + 4] = '.';
                if (state[x] !== '.') {
                    diffs++;
                }
            }
        }
        if (diffs === 0) {
            break;
        }
        state = newState;
        let sum = 0;
        for (let x = 0; x < state.length; ++x) {
            if (state[x] === '#') {
                sum += x - indexOfPosition0;
            }
        }

        lastDiffs[gen % 100] = sum - lastSum;
        
        ++gen;

        let allDiffsAreSame = true;
        for (let i = 0; i < 100; ++i) {
            if (lastDiffs[i] !== lastDiffs[0]) {
                allDiffsAreSame = false;
            }
        }
        if (allDiffsAreSame) {
            let calculated = BigInt(sum) + BigInt(lastDiffs[0]) * (BigInt(50000000000) - BigInt(gen));
            console.log(gen, calculated);
            break;
        }

        lastSum = sum;
        
        if (gen === 20) {
            console.log(sum);
        }
    }
}


day12('#..#.#..##......###...###',
`...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`);

day12('#....##.#.#.####..#.######..##.#.########..#...##...##...##.#.#...######.###....#...##..#.#....##.##',
`.#.## => #
.#.#. => #
#.#.# => .
.#### => .
.#... => .
#..## => .
..#.# => #
#.#.. => .
##### => .
....# => .
...## => .
..##. => .
##.#. => #
##..# => .
##... => #
..### => #
.##.. => #
###.. => .
#..#. => .
##.## => .
..#.. => #
.##.# => #
####. => #
#.### => .
#...# => #
###.# => #
...#. => #
.###. => .
.#..# => #
..... => .
#.... => .
#.##. => #`);
