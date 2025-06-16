/**
 * Approach: Greedy with
 * - Digit Extraction and Reversal
 * - Number Reconstruction
 * - Bitwise Manipulation with Modulo Operator (%)
 * 
 * `while` loop extracts digits from `num` using modulo operator (%) and stores them in revers order.
 * 
 * `if (d < 9) { fromMax = d; }` finds the first digit LTR of original `num` which is not 9.
 *      With this digit we can achieve the maximum number after remapping it with 9. 
 * 
 * `for` loop iterates through `digits` in reverse order to minimize the number.
 *      If `digits[i] > 1` we potentially can make it smaller. 
 *          If it's the most significant digit (`i === lastIndex`), we replace it with '1' (`minCandidate = 1`) 
 *              to avoid leading zeros and make it as small as possible.
 *          If it's not the most significant digit, we replace it with '0' (`minCandidate = 0`) 
 *              to make it as small as possible.
 *      If `digits[i] <= 1` we don't want to change it.
 * 
 * We iterate digits in reverse order to ensure that digits are processed from most significant to least significant.
 * 
 * `value = value * 10 + digit` technique is used to reconstruct number from digits.
 * 
 * Time: O(log₁₀(n)) for digit extraction and number reconstruction
 * Space: O(log₁₀(n)) because of `digits` array
 */
function maxDiff(num: number): number {
    const digits: number[] = [];
    let fromMax = 0;

    while (num > 0) {
        const d = num % 10;

        if (d < 9) {
            fromMax = d;
        }

        digits.push(d);
        num = (num - d) / 10;
    }

    let fromMin = 0;
    let minCandidate = 0;
    const lastIndex = digits.length - 1;

    for (let i = lastIndex; i >= 0; i--) {
        if (digits[i] > 1) {
            fromMin = digits[i];
            minCandidate = i === lastIndex ? 1 : 0;
            break;
        }
    }

    let max = 0;
    let min = 0;

    for (let i = lastIndex; i >= 0; i--) {
        const d = digits[i];

        max = max * 10 + (d === fromMax ? 9 : d);
        min = min * 10 + (d === fromMin ? minCandidate : d);
    }

    return max - min;
};
