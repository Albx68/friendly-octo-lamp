import { COL_COUNT, ROW_COUNT } from "@/utils/constants/constants"
import { type } from "os"
import { create } from "zustand"

type usePathFindingStore = {
    visitedMatrix: boolean[][];
    setVisitedMatrix: (row: number, col: number) => void
    resetVisitedMatrix: () => void
}

const visitedMatrixInitialVal = Array(ROW_COUNT).fill(Array(COL_COUNT).fill(false))

const usePathFindingStore = create<usePathFindingStore>()((set) => ({
    visitedMatrix: visitedMatrixInitialVal,
    setVisitedMatrix: (row, col) => set((state) => {
        const newVisited = [...state.visitedMatrix];
        newVisited[row][col] = true;
        return { visitedMatrix: newVisited }
    },
    ),
    resetVisitedMatrix: () => set(() => ({ visitedMatrix: Array(ROW_COUNT).fill(Array(COL_COUNT).fill(false)) })),
}))


export default usePathFindingStore