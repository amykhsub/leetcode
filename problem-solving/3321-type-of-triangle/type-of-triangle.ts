/**
 * Approach: Sort and Switch
 * 
 * Time: O(1) because the length of nums is always 3
 * Space: O(1)
 */
function triangleType(nums: number[]): string {
    const [a, b, c] = nums.sort((i, j) => i - j);

    switch (true) {
        case a + b <= c: return 'none';
        case a === c: return 'equilateral';
        case a === b || b === c: return 'isosceles';
        default: return 'scalene';
    }
};
