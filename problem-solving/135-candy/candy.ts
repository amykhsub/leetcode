/**
 * Approach: Two-Pass Scan (Left-to-Right and Right-to-Left) with
 * - Greedy Approach
 * - Dynamic Programming
 * - Space Complexity Optimization
 * 
 * Two-Pass is used to satisfy the requirements about both side neighbors:
 *      - child should get at least +1 more than left-neighbor
 *      - child should get at least +1 more than right-neighbor
 * 
 * At each step it tries to satisfy the local condition with minimum possible increment (Greedy strategy).
 *      The core idea of Greedy approach is to make locally optimal choices in hope 
 *          that these choices will lead to a globally optimal solution.
 * 
 * `candyCounts` stores the number of candies for each child, 
 *      which are then used to compute subsequent values (Dynamic Programming).
 *      And `fill(1)` ensures that every child receives at least one candy.
 * 
 * Typed Array is used to optimize the memory usage.
 * 
 * Time: O(n) because all steps/loops cost no more than O(n)
 * Space: O(n) because of `candyCounts` array
 */
function candy(ratings: number[]): number {
    const n = ratings.length;
    const candyCounts = new Uint16Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candyCounts[i] = candyCounts[i - 1] + 1;
        }
    }

    let total = candyCounts[n - 1];

    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            const required = candyCounts[i + 1] + 1;

            if (required > candyCounts[i]) {
                candyCounts[i] = required;
            }
        }

        total += candyCounts[i];
    }

    return total;
};
