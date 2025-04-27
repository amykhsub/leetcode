/**
 * Approach: Binary Search with bisect_left style
 * 
 * Binary Search is used to find the boundaries of black region (first and last rows and columns 
 *      containing a black pixel) instead of iterating through the entire matrix to find them.
 * 
 * Bisect
 * "Bi-" = "two", "-sect" = "to divide". So "bisect" means "to divide it into two equal parts".
 * Bisect ("binary search") finds a position in sorted list by repeatedly halving the search space.
 * 
 * `bisectLeft`
 * When there are duplicates, it points to leftmost position 
 *      where new item can be inserted without disturbing the sorted order.
 * 
 * Time: O(m*log(n) + n*log(m))
 *      - each binary search takes O(log(n))
 *      - `doesColContainBlack` and `doesRowContainBlack` callbacks take O(n) and O(m) in worst case
 *      - `bisectLeft` takes O(m*log(n)) and O(n*log(m))
 * Space: O(1)
 */
function minArea(image: string[][], x: number, y: number): number {
    const m = image.length;
    const n = image[0].length;

    function bisectLeft(
        lo: number,
        hi: number,
        fn: (index: number) => boolean,
        fnRes: boolean
    ): number {
        while (lo < hi) {
            const mid = lo + hi >> 1;

            if (fn(mid) === fnRes) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }

        return lo;
    }

    function doesColContainBlack(j: number): boolean {
        for (let i = 0; i < m; i++) {
            if (image[i][j] === '1') {
                return true;
            }
        }

        return false;
    };

    function doesRowContainBlack(i: number): boolean {
        for (let j = 0; j < n; j++) {
            if (image[i][j] === '1') {
                return true;
            }
        }

        return false;
    };

    const loCol = bisectLeft(0, y, doesColContainBlack, true);
    const hiCol = bisectLeft(y, n, doesColContainBlack, false);
    const loRow = bisectLeft(0, x, doesRowContainBlack, true);
    const hiRow = bisectLeft(x, m, doesRowContainBlack, false);

    return (hiCol - loCol) * (hiRow - loRow);
};
