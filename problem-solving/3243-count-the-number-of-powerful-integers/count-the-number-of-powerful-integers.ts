/**
 * Approach: Combinatorics with techniques:
 * - String Manipulation to compare and process digits inside string and length of string instead of value of number 
 * - Radix-based Arithmetic to calculate count of integers based on the digit and its position
 * - Prefix-Suffix Decomposition divides the number into the prefix and suffix for the scenarios 
 * - Greedy Approach calculates remaining possible values once digit exceeds the limit
 * - Inclusion-Exclusion for counting integers in ranges
 * 
 * The main idea: the number of powerful integers for range [`start` ... `finish`]
 *   is equal to the number of the integers for range [0 ... `finish`] without them in range [0 ... `start - 1`]
 * 
 * Base cases for early exit:
 * - no integers possible when string ('s') is longer than number (stringified) length
 * - single integer possible when number is greaten than suffix with the same length
 * 
 * The radix is used in prefix to count the maximum number of integers for each digit position in prefix.
 *   For example, if `limit` = 3, than for each digit position we can only have 0-based values [0,1,2,3]
 *   and radix is 4 (limit+1), which is the same as we use for binary or decimal representation.
 * If a digit ('d') exceeds the limit, it means all values from this point onward are valid (greedy).
 *      E.g., for number 2865432 with prefix '28654' and limit 6 for position 2 (prefixLen[1])
 *          we have 7*7*7*7 combinations of integers,
 *          that can be represented as: min(prefixLen[1], radix) * radix * radix * radix
 *                                   or radix ** 4 or `radix ** (prefixLen - i)` 
 *   Otherwise we count possible integers of remaining part of prefix after the current digit position.
 *      E.g., for number 234567 with prefix '2345' and limit 6 for position 1 (prefixLen[0])
 *          we have 2*7*7*7 combinations of integers or `2 * 7**3` or `d * radix ** (prefixLen - i - 1)`
 *   We add one more integer if suffix of number is greater than string `s` like we did for base case above.
 * 
 * Time: O(log(finish)), as simplified from O(log(finish))+O(log(start−1))
 * Space: O(log(finish))
 */
function numberOfPowerfulInt(start: number, finish: number, limit: number, s: string): number {
    return count(finish, limit, s) - count(start - 1, limit, s);
};

function count(val: number, limit: number, s: string): number {
    const sLen = s.length;
    const valStr = String(val);
    const valStrLen = valStr.length;

    if (valStrLen < sLen) {
        return 0;
    }

    if (valStrLen === sLen) {
        return Number(valStr >= s);
    }

    const radix = limit + 1;
    let result = 0;
    let prefixLen = valStrLen - sLen;

    for (let i = 0; i < prefixLen; i++) {
        const d = Number(valStr[i]);

        if (d > limit) {
            return result + radix ** (prefixLen - i);
        }

        result += d * radix ** (prefixLen - i - 1);
    }

    return valStr.slice(-sLen) >= s ? result + 1 : result;
};
