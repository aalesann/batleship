export const initializeBoard = (size: number): string[][] => {
  return Array(size).fill(null).map(() => Array(size).fill('water'))
}

export const placeShips = (board: string[][], ships: number[]): string[][] => {
  const newBoard = [...board]
  
  ships.forEach(shipSize => {
    let placed = false
    while (!placed) {
      const horizontal = Math.random() < 0.5
      const x = Math.floor(Math.random() * (horizontal ? board.length - shipSize + 1 : board.length))
      const y = Math.floor(Math.random() * (horizontal ? board.length : board.length - shipSize + 1))

      if (canPlaceShip(newBoard, x, y, shipSize, horizontal)) {
        for (let i = 0; i < shipSize; i++) {
          if (horizontal) {
            newBoard[y][x + i] = 'ship'
          } else {
            newBoard[y + i][x] = 'ship'
          }
        }
        placed = true
      }
    }
  })

  return newBoard
}

const canPlaceShip = (board: string[][], x: number, y: number, size: number, horizontal: boolean): boolean => {
  for (let i = 0; i < size; i++) {
    if (horizontal) {
      if (board[y][x + i] !== 'water') return false
    } else {
      if (board[y + i][x] !== 'water') return false
    }
  }
  return true
}