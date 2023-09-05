"use client"

import { COL_COUNT, ROW_COUNT } from '@/utils/constants/constants'
import { generateGrid } from '@/utils/helpers/grid'
import useWindowDimensions from '@/utils/hooks/useWindowDimensions'
import { motion } from 'framer-motion'
import React, { useMemo, useState } from 'react'



const Grid = () => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions()
    const [visited, setVisited] = useState<boolean[][]>(Array(ROW_COUNT).fill(Array(COL_COUNT).fill(false)));

    const grid = useMemo(() => generateGrid(ROW_COUNT, COL_COUNT), [])
    const dimension = windowHeight * windowWidth
    const totalNodes = ROW_COUNT * COL_COUNT
    const unitNodeArea = dimension / totalNodes
    const unitNode = Math.round(Math.sqrt(unitNodeArea)) - 1

    const traverseMatrixDFS = (row: number, col: number): void => {
        // Define the possible moves (up, down, left, right)
        const rowMoves = [-1, 1, 0, 0];
        const colMoves = [0, 0, -1, 1];

        // Update visited status for the current cell
        const newVisited = [...visited];
        newVisited[row][col] = true;
        setVisited(newVisited);

        // Process the current cell
        console.log(`Visiting matrix[${row}][${col}]: ${grid[row][col]}`);

        // Explore all possible neighbor cells
        for (let i = 0; i < 4; i++) {
            const newRow = row + rowMoves[i];
            const newCol = col + colMoves[i];

            if (
                newRow >= 0 && newRow < ROW_COUNT &&
                newCol >= 0 && newCol < COL_COUNT &&
                !visited[newRow][newCol]
            ) {
                traverseMatrixDFS(newRow, newCol);
            }
        }
    };
    return <div className='flex flex-wrap justify-center items-center'>
        {grid.map((row, rowIdx) => {
            return row.map((col, colIdx) => {
                return <motion.div animate={{ backgroundColor: visited[rowIdx][colIdx] ? "#00ff00" : "#eeee" }}
                    transition={{ delay: 0.01 * colIdx * rowIdx }} style={{ height: unitNode, width: unitNode }} key={`${rowIdx}x${colIdx}`} className={`text-xs text-emerald-700 flex justify-center items-center  border-emerald-700`}>{rowIdx}{colIdx}</motion.div>
            })
        })}
    </div>
}



export default Grid


