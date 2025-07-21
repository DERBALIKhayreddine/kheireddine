"use client"

import { useState, useCallback } from "react"

type Player = "X" | "O" | null
type Board = Player[]

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [winner, setWinner] = useState<Player>(null)
  const [gameMode, setGameMode] = useState<"human" | "ai">("human")
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const checkWinner = useCallback((board: Board): Player => {
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return board.includes(null) ? null : "draw"
  }, [])

  const getAvailableMoves = (board: Board): number[] => {
    return board.map((cell, index) => (cell === null ? index : -1)).filter((index) => index !== -1)
  }

  const minimax = (board: Board, depth: number, isMaximizing: boolean): number => {
    const result = checkWinner(board)

    if (result === "O") return 10 - depth
    if (result === "X") return depth - 10
    if (result === "draw") return 0

    const availableMoves = getAvailableMoves(board)

    if (isMaximizing) {
      let bestScore = Number.NEGATIVE_INFINITY
      for (const move of availableMoves) {
        board[move] = "O"
        const score = minimax(board, depth + 1, false)
        board[move] = null
        bestScore = Math.max(score, bestScore)
      }
      return bestScore
    } else {
      let bestScore = Number.POSITIVE_INFINITY
      for (const move of availableMoves) {
        board[move] = "X"
        const score = minimax(board, depth + 1, true)
        board[move] = null
        bestScore = Math.min(score, bestScore)
      }
      return bestScore
    }
  }

  const getBestMove = (board: Board): number => {
    let bestScore = Number.NEGATIVE_INFINITY
    let bestMove = -1
    const availableMoves = getAvailableMoves(board)

    for (const move of availableMoves) {
      board[move] = "O"
      const score = minimax(board, 0, false)
      board[move] = null

      if (score > bestScore) {
        bestScore = score
        bestMove = move
      }
    }

    return bestMove
  }

  const makeMove = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const gameResult = checkWinner(newBoard)
    if (gameResult) {
      setWinner(gameResult)
      if (gameResult === "draw") {
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
      } else {
        setScores((prev) => ({ ...prev, [gameResult]: prev[gameResult] + 1 }))
      }
      return
    }

    if (gameMode === "ai" && currentPlayer === "X") {
      setCurrentPlayer("O")
      // AI move after a short delay
      setTimeout(() => {
        const aiMove = getBestMove(newBoard)
        if (aiMove !== -1) {
          const aiBoard = [...newBoard]
          aiBoard[aiMove] = "O"
          setBoard(aiBoard)

          const aiResult = checkWinner(aiBoard)
          if (aiResult) {
            setWinner(aiResult)
            if (aiResult === "draw") {
              setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
            } else {
              setScores((prev) => ({ ...prev, [aiResult]: prev[aiResult] + 1 }))
            }
          } else {
            setCurrentPlayer("X")
          }
        }
      }, 500)
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
  }

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 })
  }

  const getStatusMessage = () => {
    if (winner === "draw") return "It's a draw!"
    if (winner) return `Player ${winner} wins!`
    if (gameMode === "ai") {
      return currentPlayer === "X" ? "Your turn (X)" : "AI thinking..."
    }
    return `Player ${currentPlayer}'s turn`
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 text-white h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6 flex-shrink-0">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center">
          <span className="mr-2">⭕</span>
          <span className="hidden xs:inline">Tic Tac Toe</span>
          <span className="xs:hidden">TicTacToe</span>
        </h1>
      </div>

      {/* Game Mode Selection */}
      <div className="mb-3 sm:mb-4 flex-shrink-0">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setGameMode("human")
              resetGame()
            }}
            className={`flex-1 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
              gameMode === "human" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            2 Players
          </button>
          <button
            onClick={() => {
              setGameMode("ai")
              resetGame()
            }}
            className={`flex-1 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
              gameMode === "ai" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            vs AI
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="mb-3 sm:mb-4 flex-shrink-0">
        <p className="text-sm sm:text-base md:text-lg font-semibold text-center">{getStatusMessage()}</p>
      </div>

      {/* Game Board - Responsive sizing */}
      <div className="flex justify-center mb-3 sm:mb-4 md:mb-6 flex-1 items-center">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square">
          <div className="grid grid-cols-3 gap-1 sm:gap-2 w-full h-full">
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => makeMove(index)}
                disabled={!!cell || !!winner || (gameMode === "ai" && currentPlayer === "O")}
                className={`
                  w-full h-full bg-gray-800 border-2 border-gray-600 rounded-lg
                  flex items-center justify-center font-bold
                  transition-all duration-200 hover:bg-gray-700 active:scale-95
                  ${cell === "X" ? "text-blue-400" : "text-red-400"}
                  ${!cell && !winner ? "hover:border-blue-400" : ""}
                  disabled:cursor-not-allowed
                  text-2xl sm:text-3xl md:text-4xl
                  min-h-[60px] sm:min-h-[80px] md:min-h-[100px]
                `}
              >
                {cell}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scores */}
      <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 flex-shrink-0">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 text-center">Scores</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">{scores.X}</div>
            <div className="text-xs sm:text-sm text-gray-300">Player X</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-400">{scores.draws}</div>
            <div className="text-xs sm:text-sm text-gray-300">Draws</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400">{scores.O}</div>
            <div className="text-xs sm:text-sm text-gray-300">{gameMode === "ai" ? "AI" : "Player O"}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col xs:flex-row gap-2 flex-shrink-0">
        <button
          onClick={resetGame}
          className="flex-1 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
        >
          New Game
        </button>
        <button
          onClick={resetScores}
          className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
        >
          Reset Scores
        </button>
      </div>
    </div>
  )
}
