"use client"

interface TaskbarIconProps {
  icon: string
  title: string
  isMinimized: boolean
  onClick: () => void
}

export default function TaskbarIcon({ icon, title, isMinimized, onClick }: TaskbarIconProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center w-10 h-8 sm:w-12 sm:h-8 rounded-md transition-all duration-200
        hover:bg-white/10 relative group
        ${!isMinimized ? "bg-white/10 border-b-2 border-blue-400" : ""}
      `}
      title={title}
    >
      <span className="text-base sm:text-lg">{icon}</span>

      {/* Active indicator */}
      {!isMinimized && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
      )}

      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        {title}
      </div>
    </button>
  )
}
