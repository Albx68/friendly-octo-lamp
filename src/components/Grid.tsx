"use client"

import { COL_COUNT, ROW_COUNT } from '@/utils/constants/constants'
import { generateGrid } from '@/utils/helpers/grid'
import React, { useMemo } from 'react'



const Grid = () => {

    const grid = useMemo(() => generateGrid(ROW_COUNT, COL_COUNT), [])

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


