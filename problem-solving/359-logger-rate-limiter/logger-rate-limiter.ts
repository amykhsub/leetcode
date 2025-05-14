/**
 * Approach: Hash Map for State Management
 * 
 * `Map` is optimized to check value presence by key, to get value by key, and to accumulate unique values.
 * `messages` map acts as internal state of Logger
 * 
 * Time: O(1)
 * Space: O(n) where n is the number of messages
 */
class Logger {
    private messages: Map<string, number> = new Map<string, number>();

    constructor() {}

    shouldPrintMessage(timestamp: number, message: string): boolean {
        if (this.messages.has(message)) {
            if (timestamp - this.messages.get(message)! < 10) {
                return false;
            }
        }

        this.messages.set(message, timestamp);

        return true;
    }
}

/**
 * Your Logger object will be instantiated and called as such:
 * var obj = new Logger()
 * var param_1 = obj.shouldPrintMessage(timestamp,message)
 */
