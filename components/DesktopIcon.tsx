"use client"

import { useState } from "react"

interface DesktopIconProps {
  icon: string
  title: string
  onDoubleClick: () => void
}

export default function DesktopIcon({ icon, title, onDoubleClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <div
      className={`
        flex flex-col items-center justify-center w-16 h-20 sm:w-20 sm:h-24 p-2 rounded-lg cursor-pointer
        transition-all duration-200 hover:bg-white/10
        ${isSelected ? "bg-blue-500/30 border border-blue-400/50" : ""}
      `}
      onClick={() => setIsSelected(!isSelected)}
      onDoubleClick={onDoubleClick}
    >
      <div className="text-xl sm:text-2xl mb-1">{icon}</div>
      <div className="text-white text-xs sm:text-sm text-center font-medium leading-tight max-w-full break-words">
        {title}
      </div>
    </div>
  )
}
