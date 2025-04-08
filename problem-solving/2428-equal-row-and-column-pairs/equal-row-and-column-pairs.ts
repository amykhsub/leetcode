/**
 * Approach: Hash Map for frequency counting, hash key as number
 * 
 * `hash` function explanation:
 * - the main idea is to use numeric hash instead of string (stringified array) for better performance.
 * - the function converts an array of numbers into a single hash value of number type.
 * - it uses a simple polynomial rolling hash approach.
 * - `37` and `7` are random prime numbers that good enough to avoid collision and to make hash value more evenly.
 * - Bitwise AND with MAX_SAFE_INTEGER helps prevent integer overflow
 *       and ensures that the hash value stays within a manageable range.
 * 
 * Time: O(n²), where `n` is the size of grid
 * Space: O(n²), because frequency maps could store hashes for all rows and columns if they are unique.
 */
function equalPairs(grid: number[][]): number {
    const n = grid.length;
    const rowFreq = new Map<number, number>();
    const colFreq = new Map<number, number>();
    const hash = (arr: number[]): number => arr.reduce((a, e) => (a * 37 + e) & Number.MAX_SAFE_INTEGER, 7);

    for (let r = 0; r < n; r++) {
        const row: number[] = grid[r];
        let key: number = hash(row);

        rowFreq.set(key, (rowFreq.get(key) ?? 0) + 1);

        const cells = Array<number>(n);

        for (let c = 0; c < n; c++) {
            cells[c] = grid[c][r];
        }

        key = hash(cells);
        colFreq.set(key, (colFreq.get(key) ?? 0) + 1);
    }

    let pairsCount = 0;

    for (const [key, colNum] of colFreq.entries()) {
        const rowNum = rowFreq.get(key);

        if (rowNum) {
            pairsCount += colNum * rowNum;
        }
    }

    return pairsCount;
};
