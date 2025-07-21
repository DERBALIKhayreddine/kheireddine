"use client"

import { useState, useEffect } from "react"
import { useWindows } from "@/contexts/WindowContext"
import StartMenu from "./StartMenu"
import TaskbarIcon from "./TaskbarIcon"

export default function Taskbar() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentDate, setCurrentDate] = useState(new Date())
  const { windows, restoreWindow, focusWindow } = useWindows()

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      setCurrentDate(now)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const openWindows = windows.filter((w) => w.isOpen)

  return (
    <>
      {/* Start Menu */}
      {isStartMenuOpen && <StartMenu onClose={() => setIsStartMenuOpen(false)} />}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-2xl border-t border-white/10 z-40">
        <div className="flex items-center justify-between h-full px-2 sm:px-4">
          {/* Left Section - Start Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
              className={`
                flex items-center justify-center w-10 h-8 sm:w-12 sm:h-8 rounded-md transition-all duration-200
                ${isStartMenuOpen ? "bg-white/20" : "hover:bg-white/10"}
              `}
            >
              {/* Windows 11 Start Icon */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm">
                  <div className="absolute inset-0.5 bg-gradient-to-br from-blue-300 to-blue-500 rounded-sm">
                    <div className="absolute inset-1 bg-white/90 rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Search Button */}
            <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors duration-200">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Task View Button */}
            <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors duration-200">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Center Section - Open Apps */}
          <div className="flex items-center justify-center space-x-1 flex-1 max-w-md">
            {openWindows.map((window) => (
              <TaskbarIcon
                key={window.id}
                icon={window.icon}
                title={window.title}
                isMinimized={window.isMinimized}
                onClick={() => {
                  if (window.isMinimized) {
                    restoreWindow(window.id)
                  } else {
                    focusWindow(window.id)
                  }
                }}
              />
            ))}
          </div>

          {/* Right Section - System Tray */}
          <div className="flex items-center space-x-2">
            {/* System Icons */}
            <div className="hidden sm:flex items-center space-x-1">
              {/* Network Icon */}
              <button className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                </svg>
              </button>

              {/* Sound Icon */}
              <button className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              </button>

              {/* Battery Icon (for laptops) */}
              <button className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.67 4H14V2c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4.33C3.6 4 3 4.6 3 5.33v15.33C3 21.4 3.6 22 4.33 22h11.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                </svg>
              </button>
            </div>

            {/* Date and Time */}
            <button
              className="flex flex-col items-end justify-center px-2 py-1 hover:bg-white/10 rounded transition-colors duration-200 min-w-0"
              onClick={() => {
                // Could open calendar/clock widget
              }}
            >
              <div className="text-white text-xs sm:text-sm font-medium leading-tight">
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
              <div className="text-white/80 text-xs leading-tight hidden sm:block">
                {currentDate.toLocaleDateString([], { month: "short", day: "numeric" })}
              </div>
            </button>

            {/* Notification Center */}
            <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors duration-200">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM4 19h11a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>

            {/* Show Desktop Button */}
            <div className="w-1 h-8 hover:bg-white/20 transition-colors duration-200 cursor-pointer border-l border-white/20"></div>
          </div>
        </div>
      </div>
    </>
  )
}
