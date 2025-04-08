/**
 * Approach: Bit Manipulation
 * 
 * XOR (^) returns a 1 in each bit position for which the corresponding bits of either but not both operands are 1, e.g.:
 * 101 ^ 011 = 110
 * 
 * The result of XOR for all subsets of [5,1,6]:
 * (0).toString(2)          //     '0' or 0
 * (5).toString(2)          //   '101' or 5
 * (1).toString(2)          //     '1' or 1
 * (6).toString(2)          //   '110' or 6
 * (5 ^ 1).toString(2)      //   '100' or 4
 * (5 ^ 6).toString(2)      //    '11' or 3
 * (5 ^ 1 ^ 6).toString(2)  //    '10' or 2
 * (1 ^ 6).toString(2)      //   '111' or 7
 * XOR of all combo         // '11100' or 28 and subsets.length = 8
 * 
 * Compare:
 * XOR for [3,4]            //   '1110' or 14 and subsets.length = 4
 * XOR for [5,1,6]          //  '11100' or 28 and subsets.length = 8
 * XOR for [3,4,5,6]        // '111000' or 56 and subsets.length = 16
 * 
 * Number of 0 in those results is (nums.length - 1).
 * Number of subsets for each array is 2 ** (nums.length - 1). E.g. 8 subsets for [5,1,6] and 16 subsets for [3,4,5,6].
 * We are interested in how many times each bit will be present in the final sum.
 * 
 * Bitwise OR assignment (|=) accumulates all active bits.
 * (3|4).toString(2)        // '111'
 * (5|1|6).toString(2)      // '111'
 * (3|4|5|6).toString(2)    // '111'
 * 
 * A left bit shift by X positions is equivalent to multiplying by (2 ** X).
 * So, if a result of XOR sum of [5,1,6] subsets is 28, then:
 * (28).toString(2) === ((5|1|6) * (2 ** 2)).toString(2)
 * where '(2 ** 2)' is '(2 ** ([5,1,6].length - 1))'
 * 
 * Validation with nums [5,1,6]:
 * [5,1,6] = ['101','001','110'];
 * [5|1|6] = '111' = 7
 * shiftCount = nums.length - 1 = 3 - 1 = 2;
 * 7 << 2 = '111' << 2 = '11100' = 28
 * 
 * Time: O(n)
 * Space: O(1)
 */
function subsetXORSum(nums: number[]): number {
    return nums.reduce((acc, num) => acc |= num, 0) << (nums.length - 1);
};