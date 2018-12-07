
interface Step {
    name: string;
    children: Step[];
}

interface Task {
    name: string;
    remainingTime: number;
}

function day7(input: string) {
    let rows = input.split('\n');

    let regex = /^Step (\S) must be finished before step (\S) can begin.$/

    let steps = new Map<String, Step>();
    let childOf = new Map<String, String[]>();

    rows.forEach((r) => {
        let result = regex.exec(r);
        let step: Step = null;
        if (steps.has(result[1])) {
            step = steps.get(result[1]);
        } else {
            step = { name: result[1], children: [] };
        }

        let child: Step = null;
        if (steps.has(result[2])) {
            child = steps.get(result[2]);
        } else {
            child = { name: result[2], children: [] };
            steps.set(result[2], child);
        }
        
        step.children.push(child);
        if (childOf.has(result[2])) {
            childOf.get(result[2]).push(step.name);
        } else {
            childOf.set(result[2], [step.name]);
        }
        steps.set(result[1], step);
    });

    let roots = Array.from(steps.keys()).filter((k) => !childOf.has(k)).sort();

    let completed = new Set<String>();
    let order = [];

    let currentNode: Step = null;
    let availableTasks = roots.map((r) => steps.get(r));

    while (true) {
        if (availableTasks.length === 0) {
            break;
        }
        currentNode = availableTasks[0];
        availableTasks = availableTasks.slice(1);
        if (completed.has(currentNode.name)) {
            continue;
        }
        availableTasks = availableTasks.concat([...currentNode.children]).sort((a, b) => a.name.localeCompare(b.name));
        let prereq = childOf.get(currentNode.name);
        if (prereq && !prereq.every((c) => completed.has(c))) {
            continue;
        }
        order.push(currentNode.name);
        completed.add(currentNode.name);
    }

    console.log(order.join(''));
    completed.clear();
    order = [];
    currentNode = null;
    availableTasks = roots.map((r) => steps.get(r));

    let inProgress = new Set<String>();
    let workers: Task[] = [null, null, null, null, null];

    let stepLog = [];

    let second = 0;
    while (true) {
        if (availableTasks.length === 0 && workers.every((s) => s === null)) {
            break;
        }
        for (let i = 0; i < workers.length; ++i) {
            if (workers[i]) {
                --workers[i].remainingTime;
                if (workers[i].remainingTime < 0) {
                    completed.add(workers[i].name);
                    inProgress.delete(workers[i].name);
                    let completedStep = steps.get(workers[i].name);
                    availableTasks = availableTasks.concat([...completedStep.children]).sort((a, b) => a.name.localeCompare(b.name));
                    workers[i] = null;
                }
            }
        }
        for (let i = 0; i < workers.length; ++i) {
            if (!workers[i]) {
                currentNode = availableTasks[0];
                availableTasks = availableTasks.slice(1);
                if (availableTasks.length === 0 && (!currentNode || completed.has(currentNode.name) || inProgress.has(currentNode.name))) {
                    continue;
                }
                while (availableTasks.length > 0 && (completed.has(currentNode.name) || inProgress.has(currentNode.name))) {
                    currentNode = availableTasks[0];
                    availableTasks = availableTasks.slice(1);
                }
                if (!currentNode) {
                    continue;
                }
                let shouldContinue = false;
                let prereq = childOf.get(currentNode.name);
                while (prereq && !prereq.every((c) => completed.has(c))) {
                    if (availableTasks.length === 0) {
                        shouldContinue = true;
                        break;
                    }
                    currentNode = availableTasks[0];
                    availableTasks = availableTasks.slice(1);
                    prereq = childOf.get(currentNode.name);
                }
                if (shouldContinue) {
                    continue;
                }
                order.push(currentNode.name);
                workers[i] = { name: currentNode.name, remainingTime: currentNode.name.charCodeAt(0) - 65 + 60 };
                inProgress.add(currentNode.name);
            }
        }

        stepLog.push({
            second: second,
            'worker 0': workers[0] ? workers[0].name : '-',
            'worker 1': workers[1] ? workers[1].name : '-',
            'worker 2': workers[2] ? workers[2].name : '-',
            'worker 3': workers[3] ? workers[3].name : '-',
            'worker 4': workers[4] ? workers[4].name : '-',
            done: Array.from(completed.values()).join('')
        });
        ++second;
    }
    
    //stepLog.forEach((s) => console.log(s.second, s['worker 0'], s['worker 1'], s['worker 2'], s['worker 3'], s['worker 4'], s.done));
    console.log(second-1);
    //console.log(childOf);
}

/*
day7(`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`);
*/

day7(`Step F must be finished before step R can begin.
Step I must be finished before step P can begin.
Step C must be finished before step O can begin.
Step H must be finished before step K can begin.
Step Y must be finished before step N can begin.
Step M must be finished before step J can begin.
Step D must be finished before step W can begin.
Step B must be finished before step N can begin.
Step T must be finished before step A can begin.
Step R must be finished before step L can begin.
Step P must be finished before step S can begin.
Step O must be finished before step J can begin.
Step X must be finished before step N can begin.
Step A must be finished before step K can begin.
Step N must be finished before step G can begin.
Step W must be finished before step U can begin.
Step Q must be finished before step U can begin.
Step V must be finished before step U can begin.
Step J must be finished before step G can begin.
Step G must be finished before step S can begin.
Step Z must be finished before step U can begin.
Step U must be finished before step S can begin.
Step E must be finished before step L can begin.
Step K must be finished before step L can begin.
Step L must be finished before step S can begin.
Step M must be finished before step N can begin.
Step T must be finished before step E can begin.
Step J must be finished before step U can begin.
Step G must be finished before step L can begin.
Step D must be finished before step P can begin.
Step T must be finished before step Z can begin.
Step U must be finished before step L can begin.
Step Z must be finished before step K can begin.
Step Q must be finished before step V can begin.
Step G must be finished before step K can begin.
Step Z must be finished before step E can begin.
Step Q must be finished before step Z can begin.
Step J must be finished before step S can begin.
Step G must be finished before step U can begin.
Step I must be finished before step M can begin.
Step W must be finished before step K can begin.
Step Y must be finished before step V can begin.
Step B must be finished before step Q can begin.
Step Y must be finished before step D can begin.
Step I must be finished before step G can begin.
Step A must be finished before step S can begin.
Step X must be finished before step S can begin.
Step O must be finished before step N can begin.
Step M must be finished before step X can begin.
Step V must be finished before step Z can begin.
Step W must be finished before step Z can begin.
Step C must be finished before step L can begin.
Step Q must be finished before step G can begin.
Step A must be finished before step U can begin.
Step G must be finished before step Z can begin.
Step P must be finished before step Q can begin.
Step C must be finished before step Z can begin.
Step U must be finished before step K can begin.
Step Q must be finished before step L can begin.
Step X must be finished before step U can begin.
Step A must be finished before step N can begin.
Step N must be finished before step S can begin.
Step Z must be finished before step L can begin.
Step F must be finished before step D can begin.
Step D must be finished before step A can begin.
Step J must be finished before step K can begin.
Step W must be finished before step Q can begin.
Step T must be finished before step J can begin.
Step T must be finished before step W can begin.
Step E must be finished before step K can begin.
Step P must be finished before step U can begin.
Step O must be finished before step Z can begin.
Step D must be finished before step B can begin.
Step R must be finished before step J can begin.
Step O must be finished before step A can begin.
Step N must be finished before step E can begin.
Step D must be finished before step G can begin.
Step M must be finished before step Q can begin.
Step F must be finished before step W can begin.
Step T must be finished before step L can begin.
Step U must be finished before step E can begin.
Step X must be finished before step L can begin.
Step M must be finished before step G can begin.
Step Z must be finished before step S can begin.
Step F must be finished before step Y can begin.
Step N must be finished before step Z can begin.
Step T must be finished before step U can begin.
Step D must be finished before step O can begin.
Step H must be finished before step X can begin.
Step V must be finished before step E can begin.
Step M must be finished before step T can begin.
Step Y must be finished before step O can begin.
Step P must be finished before step E can begin.
Step C must be finished before step E can begin.
Step P must be finished before step L can begin.
Step M must be finished before step A can begin.
Step F must be finished before step T can begin.
Step I must be finished before step C can begin.
Step X must be finished before step Z can begin.
Step Y must be finished before step U can begin.
Step B must be finished before step E can begin.`);
