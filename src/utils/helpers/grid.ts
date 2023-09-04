export const generateGrid = (row: number, col: number): number[][] => {
    const grid: number[][] = []
    for (let i = 0; i < row; i++) {
        const rowArr = []
        for (let j = 0; j < col; j++) {
            rowArr.push(j)
        }
        grid.push(rowArr)
    }
    return grid
}