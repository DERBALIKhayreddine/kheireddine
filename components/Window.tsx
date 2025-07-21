"use client"

import type React from "react"

import { useRef, useEffect, useState, useCallback } from "react"
import { useWindows, type WindowState } from "@/contexts/WindowContext"

interface WindowProps {
  window: WindowState
}

export default function Window({ window }: WindowProps) {
  const { closeWindow, minimizeWindow, focusWindow, updateWindowPosition } = useWindows()
  const windowRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState(window.position)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [previousState, setPreviousState] = useState({ position: window.position, size: window.size })

  useEffect(() => {
    const updateWindowSize = () => {
      if (typeof globalThis.window !== "undefined") {
        setWindowSize({
          width: globalThis.window.innerWidth,
          height: globalThis.window.innerHeight,
        })
      }
    }

    updateWindowSize()
    globalThis.window?.addEventListener("resize", updateWindowSize)
    return () => globalThis.window?.removeEventListener("resize", updateWindowSize)
  }, [])

  useEffect(() => {
    if (windowRef.current) {
      windowRef.current.style.zIndex = window.zIndex.toString()
    }
  }, [window.zIndex])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isFullscreen) return // Don't allow dragging in fullscreen

      if (windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect()
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
        setIsDragging(true)
        focusWindow(window.id)
      }
    },
    [focusWindow, window.id, isFullscreen],
  )

  const handleDoubleClick = useCallback(() => {
    if (isFullscreen) {
      // Restore from fullscreen
      setIsFullscreen(false)
      setPosition(previousState.position)
    } else {
      // Go fullscreen
      setPreviousState({ position, size: window.size })
      setIsFullscreen(true)
      setPosition({ x: 0, y: 0 })
    }
  }, [isFullscreen, position, window.size, previousState])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && windowSize.width > 0 && windowSize.height > 0 && !isFullscreen) {
        const maxX = Math.max(0, windowSize.width - window.size.width)
        const maxY = Math.max(0, windowSize.height - window.size.height - 48) // 48px for taskbar

        const newPosition = {
          x: Math.max(0, Math.min(maxX, e.clientX - dragOffset.x)),
          y: Math.max(0, Math.min(maxY, e.clientY - dragOffset.y)),
        }
        setPosition(newPosition)
      }
    },
    [isDragging, dragOffset, window.size, windowSize, isFullscreen],
  )

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      updateWindowPosition(window.id, position)
    }
  }, [isDragging, position, updateWindowPosition, window.id])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Calculate responsive window dimensions
  const getResponsiveSize = () => {
    if (isFullscreen) {
      return { width: windowSize.width, height: windowSize.height - 48 } // Account for taskbar
    }

    if (windowSize.width === 0 || windowSize.height === 0) {
      return { width: window.size.width, height: window.size.height }
    }

    // Mobile responsive sizing (phones)
    if (windowSize.width < 640) {
      return {
        width: windowSize.width - 16, // 8px margin on each side
        height: windowSize.height - 80, // Account for taskbar and some margin
      }
    }

    // Small tablet responsive sizing
    if (windowSize.width < 768) {
      return {
        width: Math.min(windowSize.width - 32, window.size.width),
        height: Math.min(windowSize.height - 100, window.size.height),
      }
    }

    // Large tablet responsive sizing
    if (windowSize.width < 1024) {
      return {
        width: Math.min(windowSize.width - 64, window.size.width * 0.95),
        height: Math.min(windowSize.height - 120, window.size.height * 0.9),
      }
    }

    // Desktop sizing
    const maxWidth = Math.min(window.size.width, windowSize.width - 80)
    const maxHeight = Math.min(window.size.height, windowSize.height - 120)

    return {
      width: Math.max(320, maxWidth), // Minimum width for usability
      height: Math.max(240, maxHeight), // Minimum height for usability
    }
  }

  // Calculate responsive position
  const getResponsivePosition = () => {
    if (isFullscreen) {
      return { x: 0, y: 0 }
    }

    if (windowSize.width < 640) {
      // Center on mobile
      return {
        x: 8,
        y: Math.max(8, (windowSize.height - getResponsiveSize().height - 48) / 4),
      }
    }

    // Keep original position but ensure it's within bounds
    const size = getResponsiveSize()
    return {
      x: Math.max(0, Math.min(position.x, windowSize.width - size.width)),
      y: Math.max(0, Math.min(position.y, windowSize.height - size.height - 48)),
    }
  }

  const responsiveSize = getResponsiveSize()
  const responsivePosition = getResponsivePosition()

  return (
    <div
      ref={windowRef}
      className={`
        absolute bg-gray-900/95 backdrop-blur-xl rounded-lg border border-white/20 shadow-2xl overflow-hidden select-none
        ${isFullscreen ? "rounded-none border-0" : ""}
        ${windowSize.width < 640 ? "mx-2" : ""}
      `}
      style={{
        width: responsiveSize.width,
        height: responsiveSize.height,
        left: responsivePosition.x,
        top: responsivePosition.y,
        zIndex: window.zIndex,
        cursor: isDragging ? "grabbing" : "default",
      }}
      onClick={() => focusWindow(window.id)}
    >
      {/* Window Header */}
      <div
        className={`
          flex items-center justify-between h-10 sm:h-8 bg-gray-800/50 border-b border-white/10 px-3
          ${isFullscreen ? "cursor-default" : "cursor-grab active:cursor-grabbing"}
        `}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex items-center space-x-2 pointer-events-none min-w-0 flex-1">
          <span className="text-base sm:text-sm">{window.icon}</span>
          <span className="text-white text-base sm:text-sm font-medium truncate">{window.title}</span>
        </div>

        <div className="flex items-center space-x-1 flex-shrink-0">
          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              minimizeWindow(window.id)
            }}
            className="w-8 h-8 sm:w-6 sm:h-6 rounded hover:bg-yellow-500/20 flex items-center justify-center transition-colors duration-200 pointer-events-auto"
          >
            <div className="w-4 h-0.5 sm:w-3 sm:h-0.5 bg-white"></div>
          </button>

          {/* Maximize/Restore Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDoubleClick()
            }}
            className="w-8 h-8 sm:w-6 sm:h-6 rounded hover:bg-green-500/20 flex items-center justify-center transition-colors duration-200 pointer-events-auto"
          >
            {isFullscreen ? (
              <div className="w-4 h-4 sm:w-3 sm:h-3 border border-white relative">
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border border-white bg-gray-800"></div>
              </div>
            ) : (
              <div className="w-4 h-4 sm:w-3 sm:h-3 border border-white"></div>
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(window.id)
            }}
            className="w-8 h-8 sm:w-6 sm:h-6 rounded hover:bg-red-500/20 flex items-center justify-center transition-colors duration-200 pointer-events-auto"
          >
            <div className="w-4 h-4 sm:w-3 sm:h-3 relative">
              <div className="absolute inset-0 w-4 h-0.5 sm:w-3 sm:h-0.5 bg-white transform rotate-45 top-1.5 sm:top-1"></div>
              <div className="absolute inset-0 w-4 h-0.5 sm:w-3 sm:h-0.5 bg-white transform -rotate-45 top-1.5 sm:top-1"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full pb-10 sm:pb-8 overflow-auto">{window.component}</div>
    </div>
  )
}
