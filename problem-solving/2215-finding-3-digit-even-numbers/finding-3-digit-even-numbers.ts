/**
 * Approach: Iterative Generation with:
 * - Backtracking
 * - Frequency Counting
 * 
 * `freq` accumulates the frequency of each digit in input array. E.g. [2,4,4] => [0,0,1,0,2,0,0,0,0,0]
 * 
 * Triple `for` loop iterates through digits for hundreds (`left`), tens (`mid`) and units (`right`) places of integer.
 *      It temporary decrements the frequency for digit used to build integer.
 *      If valid combination of digits is found, the loop generates and saves 3-digit even number to `integers` array.
 *      After the inner loops complete, the frequency value is restored in `freq` array.
 * 
 * Time: O(n) for digits frequency counting
 * Space: O(1)
 */
function findEvenNumbers(digits: number[]): number[] {
    const freq = new Array<number>(10).fill(0);

    for (let i = 0; i < digits.length; i++) {
        freq[digits[i]]++;
    }

    const integers: number[] = [];

    for (let left = 1; left < 10; left++) {
        if (freq[left] > 0) {
            freq[left]--;

            for (let mid = 0; mid < 10; mid++) {
                if (freq[mid] > 0) {
                    freq[mid]--;

                    for (let right = 0; right < 10; right += 2) {
                        if (freq[right] > 0) {
                            integers.push(left * 100 + mid * 10 + right);
                        }
                    }

                    freq[mid]++;
                }
            }

            freq[left]++;
        }
    }

    return integers;
};
