/**
 * Approaches: Compressed Sparse Row (CSR) with Breadth-First Search (BFS)
 * 
 * CSR is a way to store information about the connections in a network so it's efficient to look up neighbors.
 *      It's memory-efficient for sparse graphs compared to adjacency matrix.
 * 
 * BFS guarantees finding the shortest path in unweighted graphs when reachability is distance-limited.
 * 
 * `lastVisitedToken` is used to reuse `visited` array across multiple BFS runs without reinitializations.
 * 
 * Time: O(n² + m²)
 *      - CSR has O(n + m)
 *      - BFS has O(n² + m²)
 * Space: O(n + m)
 *      - CSR takes O(n + m)
 *      - BFS has O(n + m)
 */
function maxTargetNodes(edges1: number[][], edges2: number[][], k: number): number[] {
    const nodesCount1 = edges1.length + 1;
    const nodesCount2 = edges2.length + 1;

    const csr1 = getCompressedSparseRow(edges1, nodesCount1);
    const csr2 = getCompressedSparseRow(edges2, nodesCount2);
    const reachables1Count = getReachableNodesCount(csr1.offsets, csr1.neighbors, nodesCount1, k);
    const reachables2Max = getReachableNodesMax(csr2.offsets, csr2.neighbors, nodesCount2, k - 1);

    const result = new Array<number>(nodesCount1);

    for (let i = 0; i < nodesCount1; i++) {
        result[i] = reachables1Count[i] + reachables2Max;
    }

    return result;

    function getCompressedSparseRow(
        edges: number[][], nodesCount: number
    ): { offsets: Uint16Array; neighbors: Uint16Array } {
        const degree = new Uint16Array(nodesCount);

        for (const [nodeA, nodeB] of edges) {
            degree[nodeA]++;
            degree[nodeB]++;
        }

        const offsets = new Uint16Array(nodesCount + 1);

        for (let i = 0; i < nodesCount; i++) {
            offsets[i + 1] = offsets[i] + degree[i];
        }

        const neighbors = new Uint16Array(offsets[nodesCount]);
        const insertionPointers = offsets.subarray(0, nodesCount).slice();

        for (const [nodeA, nodeB] of edges) {
            neighbors[insertionPointers[nodeA]++] = nodeB;
            neighbors[insertionPointers[nodeB]++] = nodeA;
        }

        return { offsets, neighbors };
    }

    function getReachableNodesCount(
        csrOffsets: Uint16Array, csrNeighbors: Uint16Array, nodesCount: number, distanceLimit: number
    ): Int32Array {
        const reachableCount = new Int32Array(nodesCount);

        if (distanceLimit < 0) {
            return reachableCount;
        }

        const lastVisitedToken = new Uint32Array(nodesCount);
        const distances = new Int16Array(nodesCount);
        const queue = new Uint16Array(nodesCount);
        let iterationCount = 1;

        for (let i = 0; i < nodesCount; i++, iterationCount++) {
            let head = 0;
            let tail = 0;
            let nodesReached = 1;

            lastVisitedToken[i] = iterationCount;
            distances[i] = 0;
            queue[tail++] = i;

            while (head < tail) {
                const node = queue[head++];
                const distance = distances[node];

                if (distance === distanceLimit) {
                    continue;
                }

                for (let p = csrOffsets[node], end = csrOffsets[node + 1]; p < end; p++) {
                    const neighbor = csrNeighbors[p];

                    if (lastVisitedToken[neighbor] !== iterationCount) {
                        lastVisitedToken[neighbor] = iterationCount;
                        distances[neighbor] = distance + 1;
                        queue[tail++] = neighbor;
                        nodesReached++;
                    }
                }
            }

            reachableCount[i] = nodesReached;
        }

        return reachableCount;
    }

    function getReachableNodesMax(
        csrOffsets: Uint16Array, csrNeighbors: Uint16Array, nodesCount: number, distanceLimit: number
    ): number {
        if (distanceLimit < 0) {
            return 0;
        }

        const reachables = getReachableNodesCount(csrOffsets, csrNeighbors, nodesCount, distanceLimit);
        let reachedMax = 0;

        for (let i = 0; i < nodesCount; i++) {
            if (reachables[i] > reachedMax) {
                reachedMax = reachables[i];
            }
        }

        return reachedMax;
    }
}
