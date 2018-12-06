
function dist(p1: number[], p2: number[]) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

interface PointWithDist {
    point: number[];
    dist: number;
}

function day6(input: string) {
    let strings = input.split('\n');
    let coords = strings.map((s) => {
        let [x, y] = s.split(',')
        return [parseInt(x, 10), parseInt(y, 10)];
    });

    
    let xes = coords.map((c2) => c2[0]);
    let ys = coords.map((c2) => c2[1]);
    let minX = Math.min(...xes);
    let minY = Math.min(...ys);
    let maxX = Math.max(...xes);
    let maxY = Math.max(...ys);

    let grid: PointWithDist[][] = new Array(maxY);
    for (let y = 0; y < maxY; ++y) {
        grid[y] = new Array(maxX);
    }

    let regionSize = 0;

    for (let y = minY; y < maxY; ++y) {
        let yDists = coords.map((c) => Math.abs(c[1] - y));
        for (let x = minX; x < maxX; ++x) {
            let totalDistance = 0;
            let closest: number[] = null;
            let closestDist = Number.MAX_SAFE_INTEGER;
            coords.forEach((c, i) => {
                let distToPoint = yDists[i] + Math.abs(c[0] - x);
                if (distToPoint < closestDist) {
                    closest = c;
                    closestDist = distToPoint;
                } else if (distToPoint === closestDist) {
                    closest = null;
                }
                totalDistance += distToPoint;
            });
            grid[y][x] = { dist: closestDist, point: closest};
            if (totalDistance < 10000) {
                regionSize++;
            }
        }
    }

    let areas = new Map<number[], number>();
    coords.forEach((c) => {
        areas.set(c, 0);
    });

    for (let y = minY; y < maxY; ++y) {
        for (let x = minX; x < maxX; ++x) {
            if (grid[y][x] && grid[y][x].point) {
                areas.set(grid[y][x].point, areas.get(grid[y][x].point) + 1);
            }
        }
    }

    let maxArea = Number.MIN_SAFE_INTEGER;
    coords.forEach((c) => {
        if (c[0] === minX || c[1] === minY || c[0] === maxX || c[1] === maxY) {
            return;
        }
        if (areas.get(c) > maxArea) {
            maxArea = areas.get(c);
        }
    });

    console.log('maxArea', maxArea);
    console.log('regionSize', regionSize);
}


day6(`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`);


day6(`355, 246
259, 215
166, 247
280, 341
54, 91
314, 209
256, 272
149, 313
217, 274
299, 144
355, 73
70, 101
266, 327
51, 228
274, 123
342, 232
97, 100
58, 157
130, 185
135, 322
306, 165
335, 84
268, 234
173, 255
316, 75
79, 196
152, 71
205, 261
275, 342
164, 95
343, 147
83, 268
74, 175
225, 130
354, 278
123, 206
166, 166
155, 176
282, 238
107, 295
82, 92
325, 299
87, 287
90, 246
159, 174
295, 298
260, 120
203, 160
72, 197
182, 296`);
