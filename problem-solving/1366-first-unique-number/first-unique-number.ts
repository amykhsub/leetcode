/**
 * Approach: Queue (Set) and HashSet (Set)
 * 
 * Set preserves the order of insertion and optimized for manipulation with value like presence check, add, delete.
 * 
 * It is unnecessary to count occurrences of each value and enough to check if value has been seeing before
 *      because FirstUnique instance only accumulates values but never removes from its memory.
 * 
 * Time: O(n)
 *      - add() has O(1) average
 *      - constructor() has O(n)
 *      - showFirstUnique() has O(1) 
 * Space: O(m) where `m` is total number of values added to FirstUnique instance over its lifetime
 */
class FirstUnique {
    private queue: Set<number> = new Set<number>();
    private nums: Set<number> = new Set<number>()

    constructor(nums: number[]) {
        for (const num of nums) {
            this.add(num);
        }
    }

    showFirstUnique(): number {
        return this.queue.values().next().value ?? -1;
    }

    add(value: number): void {
        if (this.nums.has(value)) {
            this.queue.delete(value);
        } else {
            this.nums.add(value);
            this.queue.add(value);
        }
    }
}

/**
 * Your FirstUnique object will be instantiated and called as such:
 * var obj = new FirstUnique(nums)
 * var param_1 = obj.showFirstUnique()
 * obj.add(value)
 */
