"use client"

import { useState, useEffect, useCallback, useRef } from "react"

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }

const BOARD_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const INITIAL_DIRECTION: Direction = "RIGHT"

export default function Snake() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(150)
  const [isMobile, setIsMobile] = useState(false)
  const gameLoopRef = useRef<NodeJS.Timeout>()

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("snakeHighScore")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }
  }, [])

  // Save high score to localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem("snakeHighScore", score.toString())
    }
  }, [score, highScore])

  const generateFood = useCallback((snakeBody: Position[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      }
    } while (snakeBody.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  const moveSnake = useCallback(() => {
    setSnake((currentSnake) => {
      if (gameOver || !isPlaying) return currentSnake

      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      // Move head based on direction
      switch (direction) {
        case "UP":
          head.y -= 1
          break
        case "DOWN":
          head.y += 1
          break
        case "LEFT":
          head.x -= 1
          break
        case "RIGHT":
          head.x += 1
          break
      }

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true)
        setIsPlaying(false)
        return currentSnake
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        setIsPlaying(false)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10)
        setFood(generateFood(newSnake))
        // Increase speed slightly
        setSpeed((prev) => Math.max(80, prev - 2))
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameOver, isPlaying, generateFood])

  // Game loop
  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, speed)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [isPlaying, gameOver, moveSnake, speed])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (direction !== "DOWN") setDirection("UP")
          break
        case "ArrowDown":
        case "s":
        case "S":
          if (direction !== "UP") setDirection("DOWN")
          break
        case "ArrowLeft":
        case "a":
        case "A":
          if (direction !== "RIGHT") setDirection("LEFT")
          break
        case "ArrowRight":
        case "d":
        case "D":
          if (direction !== "LEFT") setDirection("RIGHT")
          break
        case " ":
          e.preventDefault()
          setIsPlaying(!isPlaying)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [direction, isPlaying, gameOver])

  const startGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection(INITIAL_DIRECTION)
    setGameOver(false)
    setScore(0)
    setSpeed(150)
    setIsPlaying(true)
  }

  const pauseGame = () => {
    setIsPlaying(!isPlaying)
  }

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection(INITIAL_DIRECTION)
    setGameOver(false)
    setScore(0)
    setSpeed(150)
    setIsPlaying(false)
  }

  const handleDirectionChange = (newDirection: Direction) => {
    if (!isPlaying || gameOver) return

    switch (newDirection) {
      case "UP":
        if (direction !== "DOWN") setDirection("UP")
        break
      case "DOWN":
        if (direction !== "UP") setDirection("DOWN")
        break
      case "LEFT":
        if (direction !== "RIGHT") setDirection("LEFT")
        break
      case "RIGHT":
        if (direction !== "LEFT") setDirection("RIGHT")
        break
    }
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 text-white h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 flex-shrink-0">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center">
          <span className="mr-2">🐍</span>
          <span className="hidden xs:inline">Snake Game</span>
          <span className="xs:hidden">Snake</span>
        </h1>
      </div>

      {/* Score Display */}
      <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-4 flex-shrink-0">
        <div className="bg-gray-800/50 rounded-lg p-2 sm:p-3">
          <div className="text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">{score}</div>
            <div className="text-xs sm:text-sm text-gray-300">Score</div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2 sm:p-3">
          <div className="text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400">{highScore}</div>
            <div className="text-xs sm:text-sm text-gray-300">High Score</div>
          </div>
        </div>
      </div>

      {/* Game Board - Responsive sizing */}
      <div className="bg-gray-900 rounded-lg p-2 sm:p-3 md:p-4 mb-3 sm:mb-4 flex-1 flex items-center justify-center">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square">
          <div
            className="grid gap-0 border-2 border-gray-600 rounded-lg overflow-hidden w-full h-full"
            style={{
              gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
            }}
          >
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
              const x = index % BOARD_SIZE
              const y = Math.floor(index / BOARD_SIZE)
              const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y
              const isSnakeBody = snake.slice(1).some((segment) => segment.x === x && segment.y === y)
              const isFood = food.x === x && food.y === y

              return (
                <div
                  key={index}
                  className={`
                    w-full h-full border-[0.5px] border-gray-800
                    ${isSnakeHead ? "bg-green-400 rounded-sm" : ""}
                    ${isSnakeBody ? "bg-green-600" : ""}
                    ${isFood ? "bg-red-500 rounded-full" : ""}
                    ${!isSnakeHead && !isSnakeBody && !isFood ? "bg-gray-800" : ""}
                  `}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Game Status */}
      <div className="text-center mb-3 sm:mb-4 flex-shrink-0">
        {gameOver && <p className="text-red-400 text-sm sm:text-base md:text-lg font-semibold">Game Over!</p>}
        {!isPlaying && !gameOver && (
          <p className="text-yellow-400 text-sm sm:text-base md:text-lg">Press Start to begin</p>
        )}
        {isPlaying && !gameOver && (
          <p className="text-green-400 text-sm sm:text-base md:text-lg">Playing... {!isMobile && "(Space to pause)"}</p>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-3 flex-shrink-0">
        {/* Game Control Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {!isPlaying && !gameOver && (
            <button
              onClick={startGame}
              className="col-span-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
            >
              Start Game
            </button>
          )}
          {isPlaying && (
            <button
              onClick={pauseGame}
              className="bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
            >
              {isPlaying ? "Pause" : "Resume"}
            </button>
          )}
          {gameOver && (
            <button
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
            >
              Play Again
            </button>
          )}
          <button
            onClick={resetGame}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
          >
            Reset
          </button>
        </div>

        {/* Mobile/Touch Controls */}
        <div className="bg-gray-800/30 rounded-lg p-3">
          <div className="text-center text-xs sm:text-sm text-gray-400 mb-2">
            {isMobile ? "Touch Controls" : "Arrow Keys / WASD"}
          </div>
          <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-48 mx-auto">
            <div></div>
            <button
              onClick={() => handleDirectionChange("UP")}
              className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-bold py-3 px-2 rounded-lg transition-colors text-lg sm:text-xl"
              disabled={!isPlaying || gameOver}
            >
              ↑
            </button>
            <div></div>
            <button
              onClick={() => handleDirectionChange("LEFT")}
              className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-bold py-3 px-2 rounded-lg transition-colors text-lg sm:text-xl"
              disabled={!isPlaying || gameOver}
            >
              ←
            </button>
            <button
              onClick={() => handleDirectionChange("DOWN")}
              className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-bold py-3 px-2 rounded-lg transition-colors text-lg sm:text-xl"
              disabled={!isPlaying || gameOver}
            >
              ↓
            </button>
            <button
              onClick={() => handleDirectionChange("RIGHT")}
              className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-bold py-3 px-2 rounded-lg transition-colors text-lg sm:text-xl"
              disabled={!isPlaying || gameOver}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
