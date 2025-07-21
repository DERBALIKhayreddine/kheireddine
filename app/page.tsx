"use client"

import { WindowProvider } from "@/contexts/WindowContext"
import Desktop from "@/components/Desktop"
import Taskbar from "@/components/Taskbar"
import WindowManager from "@/components/WindowManager"
import MobileCV from "@/components/MobileCV"
import { useEffect, useState } from "react"

export default function Home() {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0, isMobile: false })

  useEffect(() => {
    const updateScreenSize = () => {
      const width = globalThis.window?.innerWidth || 0
      const height = globalThis.window?.innerHeight || 0
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
      })
    }

    updateScreenSize()
    globalThis.window?.addEventListener("resize", updateScreenSize)
    return () => globalThis.window?.removeEventListener("resize", updateScreenSize)
  }, [])

  // Show loading until we have screen dimensions
  if (screenSize.width === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <WindowProvider>
      <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative">
        {screenSize.isMobile ? (
          <MobileCV />
        ) : (
          <>
            {/* Windows 11 Desktop Background */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
              style={{
                backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_jGGYJn_Sob97AYrTPKIlyFVBawARrJCIAw&s')`,
              }}
            />

            {/* Desktop */}
            <Desktop />

            {/* Windows */}
            <WindowManager />

            {/* Taskbar */}
            <Taskbar />
          </>
        )}
      </div>
    </WindowProvider>
  )
}
