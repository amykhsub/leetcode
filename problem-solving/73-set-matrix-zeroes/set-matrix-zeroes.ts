/**
 Do not return anything, modify matrix in-place instead.
 */
/**
 * Approach: Two-Pass with Space Optimization
 * 
 * The first row and the first column are used for markers.
 * The first column is used without top cell, which is moved out to `isFirstCellZero` variable to avoid overlapping.
 * Zeroes for 1st column and 1st row are applied separately.
 * 
 * Time: O(m*n)
 * Space: O(1)
 */
function setZeroes(matrix: number[][]): void {
    const m = matrix.length;
    const n = matrix[0].length;
    let isFirstCellZero = false;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[0][j] = 0;

                if (i > 0) {
                    matrix[i][0] = 0;
                } else {
                    isFirstCellZero = true;
                }
            }
        }
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    if (matrix[0][0] === 0) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }

    if (isFirstCellZero) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }
};
