"use client"

import { COL_COUNT, ROW_COUNT } from '@/utils/constants/constants'
import { generateGrid } from '@/utils/helpers/grid'
import useWindowDimensions from '@/utils/hooks/useWindowDimensions'
import { motion } from 'framer-motion'
import React, { useMemo } from 'react'



const Grid = () => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions()

    const grid = useMemo(() => generateGrid(ROW_COUNT, COL_COUNT), [])
    const dimension = windowHeight * windowWidth
    const totalNodes = ROW_COUNT * COL_COUNT
    const unitNodeArea = dimension / totalNodes
    const unitNode = Math.round(Math.sqrt(unitNodeArea))
    return <div className='flex flex-wrap justify-center items-center'>
        {grid.map((row, rowIdx) => {
            return row.map((col, colIdx) => {
                return <motion.div style={{ height: unitNode, width: unitNode }} key={`${rowIdx}x${colIdx}`} className={`text-xs text-emerald-700 flex justify-center items-center bg-emerald-50 border-2 border-emerald-700`}></motion.div>
            })
        })}
    </div>
}



export default Grid


