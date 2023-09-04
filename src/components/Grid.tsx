"use client"

import { generateGrid } from '@/utils/helpers/grid'
import React, { useMemo } from 'react'



const Grid = () => {

    const grid = useMemo(() => generateGrid(10, 10), [])

    return <div>
        {grid.map((row, rowIdx) => {
            console.log("row", row)
            return row.map((col, colIdx) => {
                return <div key={`${rowIdx}x${colIdx}`}>{rowIdx}x{colIdx}</div>
            })
        })}
    </div>
}



export default Grid


