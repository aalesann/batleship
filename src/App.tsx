import React, { useState, useEffect } from 'react'
import Board from './components/Board'
import { initializeBoard, placeShips } from './utils/gameLogic'

const BOARD_SIZE = 10
const SHIPS = [5, 4, 3, 3, 2]

function App() {
  const [playerBoard, setPlayerBoard] = useState<string[][]>(initializeBoard(BOARD_SIZE))
  const [computerBoard, setComputerBoard] = useState<string[][]>(initializeBoard(BOARD_SIZE))
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)

  useEffect(() => {
    const newPlayerBoard = placeShips(initializeBoard(BOARD_SIZE), SHIPS)
    const newComputerBoard = placeShips(initializeBoard(BOARD_SIZE), SHIPS)
    setPlayerBoard(newPlayerBoard)
    setComputerBoard(newComputerBoard)
  }, [])

  const handlePlayerShot = (x: number, y: number) => {
    if (gameOver || computerBoard[y][x] === 'hit' || computerBoard[y][x] === 'miss') return

    const newComputerBoard = [...computerBoard]
    if (newComputerBoard[y][x] === 'ship') {
      newComputerBoard[y][x] = 'hit'
    } else {
      newComputerBoard[y][x] = 'miss'
    }
    setComputerBoard(newComputerBoard)

    if (checkWin(newComputerBoard)) {
      setGameOver(true)
      setWinner('Player')
    } else {
      setTimeout(computerTurn, 1000)
    }
  }

  const computerTurn = () => {
    let x, y
    do {
      x = Math.floor(Math.random() * BOARD_SIZE)
      y = Math.floor(Math.random() * BOARD_SIZE)
    } while (playerBoard[y][x] === 'hit' || playerBoard[y][x] === 'miss')

    const newPlayerBoard = [...playerBoard]
    if (newPlayerBoard[y][x] === 'ship') {
      newPlayerBoard[y][x] = 'hit'
    } else {
      newPlayerBoard[y][x] = 'miss'
    }
    setPlayerBoard(newPlayerBoard)

    if (checkWin(newPlayerBoard)) {
      setGameOver(true)
      setWinner('Computer')
    }
  }

  const checkWin = (board: string[][]) => {
    return board.every(row => row.every(cell => cell !== 'ship'))
  }

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-800">Battleship</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-blue-700">Player's Board</h2>
          <Board board={playerBoard} onCellClick={() => {}} showShips={true} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-blue-700">Computer's Board</h2>
          <Board board={computerBoard} onCellClick={handlePlayerShot} showShips={false} />
        </div>
      </div>
      {gameOver && (
        <div className="mt-8 text-2xl font-bold text-green-600">
          Game Over! {winner} wins!
        </div>
      )}
    </div>
  )
}

export default App