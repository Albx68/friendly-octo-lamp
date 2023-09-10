import { COL_COUNT, ROW_COUNT, node } from "@/utils/constants/constants"
import { typeNode } from "@/utils/types/typeNode";
import { create } from "zustand"

type usePathFindingStore = {
    matrix: typeNode[][];
    setMatrix: (row: number, col: number) => void
    setStartNode: (row: number, col: number) => void
    setEndNode: (row: number, col: number) => void
    setWall: (row: number, col: number) => void
    resetMatrix: () => void
}

const matrixInitialVal = Array(ROW_COUNT).fill(Array(COL_COUNT).fill(node))

const usePathFindingStore = create<usePathFindingStore>()((set) => ({
    matrix: matrixInitialVal,
    setMatrix: (row, col) => set((state) => {
        const newVisited = [...state.matrix];
        newVisited[row][col] = { row: row, col: col, visited: true, isStartNode: false, isEndNode: false, isWall: false }
        return { matrix: newVisited }
    }),
    setStartNode: (row, col) => set((state) => {
        const newVisited = [...state.matrix];
        newVisited[row][col] = { row: row, col: col, visited: false, isStartNode: true, isEndNode: false, isWall: false }
        return { matrix: newVisited }
    }),
    setWall: (row, col) => set((state) => {
        const newVisited = [...state.matrix];
        newVisited[row][col] = { row: row, col: col, visited: false, isStartNode: false, isEndNode: false, isWall: true }
        return { matrix: newVisited }
    }),
    setEndNode: (row, col) => set((state) => {
        const newVisited = [...state.matrix];
        newVisited[row][col] = { row: row, col: col, visited: false, isStartNode: true, isEndNode: false, isWall: false }
        return { matrix: newVisited }
    }),

    resetMatrix: () => set(() => ({ matrix: Array(ROW_COUNT).fill(Array(COL_COUNT).fill(false)) })),
}))


export default usePathFindingStore

