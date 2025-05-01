/**
 * Approach: Binary Search with:
 * - Sorting
 * - Greedy Approach
 * - Simulation feasibility
 * - Two Pointers
 * - Queue
 * 
 * Sorting allows matching of tasks to workers. We can quickly determine if a worker is strong enough for a task.
 *      `TypedArray.prototype.sort()` sorts the values numerically (instead of as strings) by default.
 * 
 * `countAssignments()` implements greedy strategy. It iterates tasks from strongest to weakest 
 *      and counts possible assignments to the strongest available worker. 
 *      The matching tasks with the strongest worker first 
 *          maximizes the chances of assigning a greater number of tasks overall.
 * 
 * Two Pointers Greedy for special cases:
 *      - there are no pills or effective strength  `if (pills === 0 || strength === 0)`
 *      - enough pills to boost every worker        `if (pills >= m)`
 * 
 * Binary search. 
 *      If `k` tasks can be assigned, than any number of tasks less than `k` can also be assigned. Monotonicity. 
 *          This allows us to search number of assignments with range [0, min(n, m)].
 *      Binary search loop simulates the assignment process to check feasibility. 
 *          It assigns the `mid` strongest tasks to `mid` workers 
 *              using boosted strength of workers for more difficult tasks.
 *      `workersQueue` maintains the queue of workers who can handle the tasks without pills.
 *      A pill is applied only when original strength is insufficient.
 *      Early exit if no workers found with/without pill usage.
 *      Workers in queue are considered for assignment in the order they were added (`nextAvailableWorkerP` pointer).
 *      The case with `workerInsertP--` means that the worker can't be used for the task without a pill. 
 *          And the number of available workers in `workersQueue` for future tasks is decreased by one.
 * 
 * Time: O(n*log(n)+m*log(m))
 *      - sorting O(n*log(n)) and O(m*log(m))
 *      - `countAssignments` iterates arrays at most once -- O(min(n, m))
 *      - special case for absent pills/extra-strength takes O(min(n, m))
 *      - `boostedStrengths` creation takes O(m)
 *      - special case for full pills check (`pills >= m`) takes O(min(n, m))
 *      - binary search `while` outer loop takes O(log(min(n, m)))
 *      -- inner `for` loop iterates at most `mid` times (up to min(n, m))
 *      -- inner `while` loop inside the `for` loop can take up to m times in total (for outer `for` loop for `mid`)
 *      -- all operations inside binary search loop can take O(m) in the worst case
 *      - sorting steps and binary search give dominant factor
 *          with complexity O(max(n * log(n) + m * log(m) + min(n, m) * log(min(n, m)) * m))
 *          which can be simplified to O(n * log(n) + m * log(m)) because of comparable magnitude of `n` and `m`
 * Space: O(m) because of dominated `boostedStrengths` and `workersQueue`
 */
function maxTaskAssign(tasks: number[], workers: number[], pills: number, strength: number): number {
    const n = tasks.length;
    const m = workers.length;
    const requiredStrengths: Uint32Array<ArrayBuffer> = new Uint32Array(tasks);
    const existingStrengths: Uint32Array<ArrayBuffer> = new Uint32Array(workers);

    requiredStrengths.sort();
    existingStrengths.sort();

    function countAssignments<T>(tasks: T, workers: T): number {
        let count = 0;

        for (let i = n - 1, j = m - 1; i >= 0 && j >= 0; i--) {
            if (tasks[i] <= workers[j]) {
                count++;
                j--;
            }
        }

        return count;
    }

    if (pills === 0 || strength === 0) {
        return countAssignments<Uint32Array<ArrayBuffer>>(requiredStrengths, existingStrengths);
    }

    const boostedStrengths: Uint32Array<ArrayBuffer> = Uint32Array.from(
        { length: m },
        (_, i) => existingStrengths[i] + strength
    );

    if (pills >= m) {
        return countAssignments<Uint32Array<ArrayBuffer>>(requiredStrengths, boostedStrengths);
    }

    const workersQueue: Uint32Array<ArrayBuffer> = new Uint32Array(m);
    let assignmentsCount = 0;
    let low = 0;
    let high = Math.min(n, m);

    while (low <= high) {
        const mid = (low + high) >>> 1;

        const leftP = m - mid;
        let rightP = m - 1;
        let workerInsertP = 0;
        let nextAvailableWorkerP = 0;
        let pillCount = pills;
        let feasible = true;

        for (let i = mid - 1; i >= 0; i--) {
            const requirement = requiredStrengths[i];

            while (leftP <= rightP && boostedStrengths[rightP] >= requirement) {
                workersQueue[workerInsertP++] = existingStrengths[rightP--];
            }

            if (workerInsertP === 0) {
                feasible = false;
                break;
            }

            if (workersQueue[nextAvailableWorkerP] >= requirement) {
                nextAvailableWorkerP++;
            } else {
                workerInsertP--;

                if (pillCount-- === 0) {
                    feasible = false;
                    break;
                }
            }
        }

        if (feasible) {
            assignmentsCount = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return assignmentsCount;
}
