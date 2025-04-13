/**
 * Approach: Binary Exponentiation (or 'exponentiation by squaring', 'fast powering')
 * 
 * Main idea behind Binary Exponentiation:
 * - Any positive integer exponent can be represented as a sum of powers of 2.
 * - Instead of performing linear multiplications of the base, the algorithm calculates powers by squaring the base. 
 *   The base is squared in each iteration, and the exponent is divided by 2.
 * 
 * `1e9 + 7` is a common prime number used as a modulus to prevent integer overflow.
 * 
 * Input number `n` has n/2 pairs of digits with even-odd indices.
 * Even-index position has some of these digits [0,2,4,6,8]. 5 types of digit.
 * Odd-index position has some of these digits [2,3,5,7]. 4 types of digit.
 * `20` comes from 5 even digits * 4 odd digits.
 * If length of input number is odd, there's extra even-index position. So we multiply the result by 5.
 * 
 * Time: O(log(n)) because of `binaryExp` function complexity.
 * Space: O(1)
 */
const MOD: number = 1e9 + 7;
const BIG_MOD: bigint = BigInt(MOD);

function countGoodNumbers(n: number): number {
    function binaryExp(base: bigint, exponent: number): number {
        let result: bigint = 1n;

        while (exponent > 0) {
            if (exponent & 1) {
                result = (result * base) % BIG_MOD;
            }

            base = (base * base) % BIG_MOD;
            exponent = Math.trunc(exponent / 2);
        }

        return Number(result);
    }

    return (binaryExp(20n, Math.trunc(n / 2)) * (n & 1 ? 5 : 1)) % MOD;
};
