/**
 * Approach: Hash Map with
 * - Greedy approach forms a group for each color
 * - Frequency Map counts the occurrences of each reported group size
 * - Reminder operator checks if there's no incomplete group of rabbits
 * 
 * Answer `x` means group of x+1 rabbits.
 * According to problem example explanation, each rabbit knows all rabbits in forest with the same color.
 *      Thus it's inconsistent to group rabbits with different answers together.
 * At the same time it's not limited how many rabbits answered with the same number. E.g. 10 rabbits can answer 3.
 *      It's possible only if they have different colors.
 *      The max number of rabbits is 40 { =10*4 } where 30 rabbits didn't answer.
 *      The min number of rabbits is 12 { =ceil(10/4)*4 } where 2 rabbits didn't answer.
 * 
 * Let's look at example if the same answer `3` received:
 *  rabbit 1 means 4 rabbits (absent group before, add group)
 *  rabbit 2 means 4 rabbits
 *  rabbit 3 means 4 rabbits
 *  rabbit 4 means 4 rabbits
 *  rabbit 5 means 8 rabbits (full group before, add group)
 *  rabbit 6 means 8 rabbits
 *  rabbit 7 means 8 rabbits
 *  rabbit 8 means 8 rabbits
 *  rabbit 9 means 12 rabbits (full group before, add group)
 *  rabbit 10 means 12 rabbits
 * 
 * Note: if group is full or absent, for the next answer we add new group of rabbits.
 *      In other words, new group of size 4 is created 
 *          once the number of previous same answers is divisible by group size.
 * 
 * Time: O(n)
 * Space: O(n)
 */
function numRabbits(answers: number[]): number {
    const freqMap = new Map<number, number>();
    let count = 0;

    for (let groupSize of answers) {
        groupSize++;

        let f = freqMap.get(groupSize) ?? 0;

        if (f % groupSize === 0) {
            count += groupSize;
        }

        freqMap.set(groupSize, ++f);
    }

    return count;
};
