"use client"

import usePathFindingStore from '@/store/usePathFindingStore'
import { COL_COUNT, ROW_COUNT } from '@/utils/constants/constants'
import { generateGrid } from '@/utils/helpers/grid'
import useWindowDimensions from '@/utils/hooks/useWindowDimensions'
import { popChildrenIn } from '@/utils/variants/variants'
import { MotionConfig, motion } from 'framer-motion'
import React, { useMemo, useState } from 'react'



const Grid = () => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions()
    const { matrix, setMatrix, resetMatrix, setStartNode, setEndNode } = usePathFindingStore(state => state)
    const [currentVisitingNode, setCurrentVisitingNode] = useState({ row: 4, col: 4 })
    // const dimension = windowHeight * windowWidth
    // const totalNodes = ROW_COUNT * COL_COUNT
    // const unitNodeArea = dimension / totalNodes
    // const unitNode = Math.round(Math.sqrt(unitNodeArea)) - 1
    const unitNode = 20

    const delay = 1000; // Adjust the delay between DFS steps (in milliseconds)

    const traverseMatrixDFS = async (row: number, col: number): Promise<void> => {
        const rowMoves = [-1, 1, 0, 0];
        const colMoves = [0, 0, -1, 1];

        const stack = [{ row, col }];

        while (stack.length > 0) {
            const { row, col } = stack.pop() as { row: number; col: number };

            setCurrentVisitingNode({ row, col });
            setMatrix(row, col);


            for (let i = 0; i < 4; i++) {
                const newRow = row + rowMoves[i];
                const newCol = col + colMoves[i];
                await new Promise((resolve) => setTimeout(resolve, delay)); // Delay animation

                if (
                    newRow >= 0 && newRow < ROW_COUNT &&
                    newCol >= 0 && newCol < COL_COUNT &&
                    !matrix[newRow][newCol].visited
                ) {
                    stack.push({ row: newRow, col: newCol });
                }
            }
        }

    }

    const traverseMatrixBFS = async (startRow: number, startCol: number): Promise<void> => {
        const rowMoves = [-1, 1, 0, 0];
        const colMoves = [0, 0, -1, 1];

        const queue = [{ row: startRow, col: startCol }];

        while (queue.length > 0) {
            const { row, col } = queue.shift() as { row: number; col: number };

            setCurrentVisitingNode({ row, col });
            setMatrix(row, col);

            await new Promise((resolve) => setTimeout(resolve, delay)); // Delay animation

            for (let i = 0; i < 4; i++) {
                const newRow = row + rowMoves[i];
                const newCol = col + colMoves[i];

                if (
                    newRow >= 0 && newRow < ROW_COUNT &&
                    newCol >= 0 && newCol < COL_COUNT &&
                    !matrix[newRow][newCol].visited
                ) {
                    queue.push({ row: newRow, col: newCol });
                }
            }
        }
    };
    return <div className='flex h-screen flex-wrap justify-center items-center'><svg

        width={COL_COUNT * unitNode}
        height={ROW_COUNT * unitNode}
    >
        {matrix.map((row, rowIdx) => {
            return row.map((col, colIdx) => {
                const isVisited = matrix[rowIdx][colIdx].visited;
                const isStartNode = matrix[rowIdx][colIdx].isStartNode;
                const isCurrent = currentVisitingNode.row === rowIdx && currentVisitingNode.col === colIdx;
                const fillColor = isVisited ? '#9999ff' : '#dd9999';
                const scale = isVisited ? 1 : 0;

                return (
                    <motion.g key={`${rowIdx}x${colIdx}`}>
                        <motion.rect
                            initial={{ scale: 0 }} // Start scale from 0 for visited cells
                            animate={{ scale: scale }}
                            transition={{ delay: 0.1 * rowIdx }}
                            width={unitNode}
                            height={unitNode}
                            x={colIdx * unitNode}
                            y={rowIdx * unitNode}
                            fill={fillColor}
                            stroke={"#007700"}
                            className={`text-xs text-emerald-700`}
                            onClick={() => { }}
                        />
                        <motion.rect
                            initial={{ scale: 1 }} // Start scale from 1 for unvisited cells
                            transition={{ duration: 0.01 * rowIdx * colIdx }}
                            key={`${rowIdx}x${colIdx}`}
                            width={unitNode}
                            height={unitNode}
                            x={colIdx * unitNode}
                            y={rowIdx * unitNode}
                            fill={isStartNode ? "#CCFFbb" : ''}
                            fillOpacity={isStartNode ? 1 : 0}
                            stroke={"#007700"}
                            className={`text-xs text-emerald-700`}
                            onClick={() => { }}
                        />
                        <text x={colIdx * unitNode + 8}
                            y={rowIdx * unitNode + 8} fontSize={8} >{rowIdx},{colIdx}</text>
                    </motion.g>
                );
            });
        })}
    </svg>
        <div className='flex gap-4 '>
            <button className='p-3 rounded-lg bg-emerald-400' onClick={() => traverseMatrixBFS(2, 2)}>Breadth First Search</button>

            <button className='p-3 rounded-lg bg-emerald-400' onClick={() => traverseMatrixDFS(2, 2)}>Depth First Search</button>
            <button className='p-3 rounded-lg bg-emerald-400' onClick={resetMatrix}>Reset Matrix</button>
        </div>
    </div>
}



export default Grid



const calculateDistanceFromStartNode = (row1: number, col1: number, row2: number, col2: number) => {
    return Math.abs(row1 - row2) + Math.abs(col1 - col2);
};
