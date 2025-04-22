/**
 * Approach: Combinations with
 * - Prime Factorization
 * - Dynamic Programming
 * - Modular Arithmetic
 * 
 * ? why PRIME_FACTORS_SIZE = 14
 * Look at constrains `1 <= maxValue <= 1e4`
 * Let's list the prime numbers less than or equal to 1e4:
 *      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, ...
 * The first reason:
 *      The number of distinct prime factors of any single number within this range [1, 10000] is relatively small.
 *      Let's list the smallest primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43. 
 *          If we multiply these first 14 prime numbers together, the product is significantly larger than 10000.
 *          And the number up to 1e4 cannot have more than 14 distinct prime factors.
 * The second reason:
 *      When calculating the binomial coefficients, 
 *          any number up to 10000 can have at most 13 distinct prime factors (since 2^13 = 8192 and 2^14 = 16384).
 * We consider a number with many small prime factors with small exponents. 
 *      Hence, `14` is the biggest number of prime factors needed for specified constraint.
 * 
 * Prime Factorization:
 * `initPrimeFactors()` pre-calculates the minimum prime factor for each number up to `MAX_N` 
 *          using sieve-like approach (similar to Sieve of Eratosthenes).
 * `countPrimeFactorsInFactorization()`
 *      for each number in [2, 1e4] determines the counts of each prime factor in its prime factorization. 
 *      The results are stored in the `primeFactorCounts` array, 
 *          where `primeFactorCounts[i]` is an array of the exponents of the prime factors of `i`. 
 *          For example, if `i = 12 = 2^2 * 3^1`, then `primeFactorCounts[12]` would be `[2, 1]`.
 * 
 * Dynamic Programming for Binomial Coefficients:
 * `computeBinomialCoefficients()` pre-computes binomial coefficients using Pascal's identity 
 *      and stores them in the `binomialCoefs` 2D array.
 * 
 * Combinations:
 * The core logic within the inner loop calculates the number of ways to construct the rest of the ideal array 
 *      given the prime factorization of the first element `sv` (`starting value`). 
 *      For each prime factor with a count `pfc`, the problem of distributing these `pfc` factors 
 *          across the remaining `n - 1` positions is equivalent to a 'stars and bars' combinatorial problem. 
 *      For each prime factor we need to choose how many times that prime factor's power increases 
 *          as we move through the remaining `n - 1` elements.
 *      This is equivalent to choosing `pfc` positions out of `n - 1 + pfc` total positions, 
 *          where `n-1` represents the 'bars' separating the elements 
 *            and `pfc` represents the 'stars' - the increments of the prime factor's exponent.
 *      For a given starting value `sv`, the number of ways to form the rest of the ideal array 
 *          is the product of the number of ways to distribute each of its prime factors.
 * The outer loop sums up the number of ideal arrays that can be formed starting with each possible value of `sv`.
 * 
 * Modular Arithmetic
 * All calculations involving the count of ideal arrays are performed modulo `10^9 + 7` to prevent integer overflow.
 * 
 * Time: O(mx * log(mx)), where `mx` is max(n, maxValue) as `MAX_N` and `maxValue` are in the same order of magnitude
 *      - `initPrimeFactors()` - Sieve of Eratosthenes has complexity O(MAX_N * log(log(MAX_N)))
 *      - `countPrimeFactorsInFactorization()` - O(MAX_N * log(MAX_N))
 *      - `computeBinomialCoefficients()` - O(MAX_N * PRIME_FACTORS_SIZE) simplifying to O(MAX_N)
 *      - `idealArrays()` O(maxValue * log(maxValue)) as complexity of the inner loop is O(log(maxValue))
 * Space: O(MAX_N):
 *      - `binomialCoefs` takes O(MAX_N * PRIME_FACTORS_SIZE) which is simplified to O(MAX_N)
 *      - `minPrimeFactors` takes O(MAX_N)
 *      - `primeFactorCounts` takes O(MAX_N * PRIME_FACTORS_SIZE), simplifying to O(MAX_N)
 */
const MOD = 1e9 + 7;
const MAX_N = 10001;
const PRIME_FACTORS_SIZE = 14;

const binomialCoefs: number[][] = Array.from({ length: MAX_N + PRIME_FACTORS_SIZE }, () =>
    Array(PRIME_FACTORS_SIZE + 1).fill(0),
);

const minPrimeFactors: number[] = Array(MAX_N).fill(0);
const primeFactorCounts: number[][] = Array.from({ length: MAX_N }, () => []);

initPrimeFactors();
countPrimeFactorsInFactorization();
computeBinomialCoefficients();

function idealArrays(n: number, maxValue: number): number {
    let ans = 0n;

    for (let sv = 1; sv <= maxValue; sv++) {
        let primeFactorCombsCount = 1n;

        for (const pfc of primeFactorCounts[sv]) {
            primeFactorCombsCount = (primeFactorCombsCount * BigInt(binomialCoefs[n - 1 + pfc][pfc])) % BigInt(MOD);
        }

        ans = (ans + primeFactorCombsCount) % BigInt(MOD);
    }

    return Number(ans);
}

function initPrimeFactors(): void {
    for (let i = 2; i < MAX_N; i++) {
        if (minPrimeFactors[i] === 0) {
            for (let j = i; j < MAX_N; j += i) {
                if (minPrimeFactors[j] === 0) {
                    minPrimeFactors[j] = i;
                }
            }
        }
    }
}

function countPrimeFactorsInFactorization(): void {
    for (let i = 2; i < MAX_N; i++) {
        let x = i;

        while (x > 1) {
            const p = minPrimeFactors[x];
            let cnt = 0;

            while (x % p === 0) {
                x = Math.floor(x / p);
                cnt++;
            }

            primeFactorCounts[i].push(cnt);
        }
    }
}

function computeBinomialCoefficients(): void {
    binomialCoefs[0][0] = 1;

    for (let i = 1; i < MAX_N + PRIME_FACTORS_SIZE; i++) {
        binomialCoefs[i][0] = 1;

        for (let j = 1; j <= Math.min(i, PRIME_FACTORS_SIZE); j++) {
            const prev = binomialCoefs[i - 1];

            binomialCoefs[i][j] = (prev[j] + prev[j - 1]) % MOD;
        }
    }
}
