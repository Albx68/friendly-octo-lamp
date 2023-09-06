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
    const { visitedMatrix, setVisitedMatrix } = usePathFindingStore(state => state)
    const grid = useMemo(() => generateGrid(ROW_COUNT, COL_COUNT), [])
    const [startNode, setStartNode] = useState({ row: 0, col: 0 })
    // const dimension = windowHeight * windowWidth
    // const totalNodes = ROW_COUNT * COL_COUNT
    // const unitNodeArea = dimension / totalNodes
    // const unitNode = Math.round(Math.sqrt(unitNodeArea)) - 1
    const unitNode = 80
    const traverseMatrixDFS = (row: number, col: number): void => {
        // Define the possible moves (up, down, left, right)
        const rowMoves = [-1, 1, 0, 0];
        const colMoves = [0, 0, -1, 1];

        // Update visited status for the current cell

        setVisitedMatrix(row, col);

        // Process the current cell
        console.log(`Visiting matrix[${row}][${col}]: ${grid[row][col]}`);

        // Explore all possible neighbor cells
        for (let i = 0; i < 4; i++) {
            const newRow = row + rowMoves[i];
            const newCol = col + colMoves[i];

            if (
                newRow >= 0 && newRow < ROW_COUNT &&
                newCol >= 0 && newCol < COL_COUNT &&
                !visitedMatrix[newRow][newCol]
            ) {
                traverseMatrixDFS(newRow, newCol);
            }
        }
    };
    return <div className='flex h-screen flex-wrap justify-center items-center'><svg

        width={COL_COUNT * unitNode}
        height={ROW_COUNT * unitNode}
    >
        {grid.map((row, rowIdx) => {
            return row.map((col, colIdx) => {
                const isVisited = visitedMatrix[rowIdx][colIdx];
                const isStartNode = startNode.row == rowIdx && startNode.col == colIdx
                const fillColor = isStartNode ? "#ff99" : isVisited ? '#99ff99' : '#eeee';
                const scale = isVisited ? 1 : 0;

                return (
                    <g key={`${rowIdx}x${colIdx}`}
                    >
                        <motion.rect
                            initial={{ scale: 0 }}
                            animate={{ fill: fillColor, scale }}
                            transition={{ delay: 0.01 * rowIdx + colIdx * 0.1 }}
                            width={unitNode}
                            height={unitNode}
                            x={colIdx * unitNode}
                            y={rowIdx * unitNode}
                            fill={fillColor}
                            stroke={"#007700"}
                            className={`text-xs text-emerald-700`}
                            onClick={() => setStartNode({ row: rowIdx, col: colIdx })}
                        />
                        <motion.rect
                            transition={{ duration: 0.01 * rowIdx * colIdx }}
                            key={`${rowIdx}x${colIdx}`}
                            width={unitNode}
                            height={unitNode}
                            x={colIdx * unitNode}
                            y={rowIdx * unitNode}
                            fillOpacity={isStartNode ? 1 : 0}
                            stroke={"#007700"}
                            className={`text-xs text-emerald-700`}
                            onClick={() => setStartNode({ row: rowIdx, col: colIdx })}

                        />
                    </g>
                );
            });
        })}
    </svg>
        <button onClick={() => traverseMatrixDFS(startNode.row, startNode.col)}>dfs</button>
    </div>
}



export default Grid




