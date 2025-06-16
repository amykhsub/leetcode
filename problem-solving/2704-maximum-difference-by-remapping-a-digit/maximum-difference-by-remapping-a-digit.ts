/**
 * Approach: Greedy with
 * - Digit Extraction and Number Reconstruction
 * - Bitwise Manipulation
 * 
 * `while` loop extracts digits from `num` using modulo operator (%) and stores them in revers order.
 * 
 * `if (d < 9) { fromMax = d; }` finds the first digit LTR of original `num` which is not 9.
 *      With this digit we can achieve the maximum number after remapping it with 9. 
 * 
 * `const fromMin = digits[lastIndex];`. We should try to change the leftmost (originally) digit to 0 
 *      to get minimum value
 * 
 * We iterate digits in reverse order to ensure that digits are processed from most significant to least significant.
 * 
 * `value = value * 10 + digit` technique is used to reconstruct number from digits.
 * 
 * Time: O(log₁₀(num)) for digit extraction and number reconstruction
 * Space: O(log₁₀(num)) because of `digits` array
 */
function minMaxDifference(num: number): number {
    const digits: number[] = [];
    let fromMax = 9;

    while (num > 0) {
        const d = num % 10;

        if (d < 9) {
            fromMax = d;
        }

        digits.push(d);
        num = (num - d) / 10;
    }

    let max = 0;
    let min = 0;
    const lastIndex = digits.length - 1;
    const fromMin = digits[lastIndex];

    for (let i = lastIndex; i >= 0; i--) {
        const d = digits[i];

        max = max * 10 + (d === fromMax ? 9 : d);
        min = min * 10 + (d === fromMin ? 0 : d);
    }

    return max - min;
};
