"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface WindowState {
  id: string
  title: string
  icon: string
  component: ReactNode
  isOpen: boolean
  isMinimized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

interface WindowContextType {
  windows: WindowState[]
  openWindow: (window: Omit<WindowState, "isOpen" | "isMinimized" | "zIndex">) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  focusWindow: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  updateWindowSize: (id: string, size: { width: number; height: number }) => void
}

const WindowContext = createContext<WindowContextType | undefined>(undefined)

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [maxZIndex, setMaxZIndex] = useState(1000)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const openWindow = (windowData: Omit<WindowState, "isOpen" | "isMinimized" | "zIndex">) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === windowData.id)
      if (existing) {
        return prev.map((w) =>
          w.id === windowData.id ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZIndex + 1 } : w,
        )
      }
      return [
        ...prev,
        {
          ...windowData,
          isOpen: true,
          isMinimized: false,
          zIndex: maxZIndex + 1,
        },
      ]
    })
    setMaxZIndex((prev) => prev + 1)
  }

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)))
  }

  const minimizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)))
  }

  const restoreWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 } : w)))
    setMaxZIndex((prev) => prev + 1)
  }

  const focusWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w)))
    setMaxZIndex((prev) => prev + 1)
  }

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position } : w)))
  }

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)))
  }

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        restoreWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
    </WindowContext.Provider>
  )
}

export function useWindows() {
  const context = useContext(WindowContext)
  if (!context) {
    throw new Error("useWindows must be used within a WindowProvider")
  }
  return context
}
