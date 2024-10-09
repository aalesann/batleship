import React from 'react'

interface BoardProps {
  board: string[][]
  onCellClick: (x: number, y: number) => void
  showShips: boolean
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, showShips }) => {
  return (
    <div className="grid grid-cols-10 gap-1 bg-blue-300 p-2 rounded-lg shadow-lg">
      {board.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={`w-8 h-8 rounded-sm cursor-pointer transition-colors duration-200 flex items-center justify-center
              ${cell === 'ship' && showShips ? 'bg-gray-600' : 
                cell === 'hit' ? 'bg-red-500' : 
                cell === 'miss' ? 'bg-blue-200' : 'bg-blue-500 hover:bg-blue-400'}`}
            onClick={() => onCellClick(x, y)}
          >
            {cell === 'hit' && '💥'}
            {cell === 'miss' && '🌊'}
          </div>
        ))
      )}
    </div>
  )
}

export default Board