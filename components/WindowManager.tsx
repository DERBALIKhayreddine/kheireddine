"use client"

import { useWindows } from "@/contexts/WindowContext"
import Window from "./Window"

export default function WindowManager() {
  const { windows } = useWindows()

  return (
    <>
      {windows
        .filter((window) => window.isOpen && !window.isMinimized)
        .map((window) => (
          <Window key={window.id} window={window} />
        ))}
    </>
  )
}
