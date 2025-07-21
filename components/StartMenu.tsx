"use client"

import { useWindows } from "@/contexts/WindowContext"
import { cvData } from "@/data/cv-data"
import AboutMe from "@/components/AboutMe"
import Skills from "@/components/Skills"
import Experience from "@/components/Experience"
import Education from "@/components/Education"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import TicTacToe from "@/components/TicTacToe"
import Snake from "@/components/Snake"

const startMenuApps = [
  {
    id: "about",
    title: "About Me",
    icon: "🧍‍♂️",
    component: <AboutMe data={cvData.about} />,
    position: { x: 100, y: 100 },
    size: { width: 500, height: 400 },
    category: "CV",
  },
  {
    id: "skills",
    title: "Skills",
    icon: "🛠️",
    component: <Skills data={cvData.skills} />,
    position: { x: 150, y: 150 },
    size: { width: 600, height: 500 },
    category: "CV",
  },
  {
    id: "experience",
    title: "Experience",
    icon: "💼",
    component: <Experience data={cvData.experience} />,
    position: { x: 200, y: 200 },
    size: { width: 700, height: 600 },
    category: "CV",
  },
  {
    id: "education",
    title: "Education",
    icon: "🎓",
    component: <Education data={cvData.education} />,
    position: { x: 250, y: 100 },
    size: { width: 500, height: 300 },
    category: "CV",
  },
  {
    id: "projects",
    title: "Projects",
    icon: "🚀",
    component: <Projects data={cvData.projects} />,
    position: { x: 300, y: 150 },
    size: { width: 800, height: 600 },
    category: "CV",
  },
  {
    id: "contact",
    title: "Contact",
    icon: "📬",
    component: <Contact data={cvData.contact} />,
    position: { x: 350, y: 200 },
    size: { width: 400, height: 350 },
    category: "CV",
  },
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    icon: "⭕",
    component: <TicTacToe />,
    position: { x: 400, y: 100 },
    size: { width: 400, height: 500 },
    category: "Games",
  },
  {
    id: "snake",
    title: "Snake Game",
    icon: "🐍",
    component: <Snake />,
    position: { x: 450, y: 150 },
    size: { width: 500, height: 600 },
    category: "Games",
  },
]

interface StartMenuProps {
  onClose: () => void
}

export default function StartMenu({ onClose }: StartMenuProps) {
  const { openWindow } = useWindows()

  const handleAppClick = (app: (typeof startMenuApps)[0]) => {
    openWindow(app)
    onClose()
  }

  const cvApps = startMenuApps.filter((app) => app.category === "CV")
  const gameApps = startMenuApps.filter((app) => app.category === "Games")

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Start Menu */}
      <div className="fixed bottom-12 left-2 w-80 sm:w-96 bg-gray-900/95 backdrop-blur-2xl rounded-xl border border-white/20 shadow-2xl z-50 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">K</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-white font-semibold text-base sm:text-lg truncate">Kayreddine Derbali</div>
              <div className="text-gray-300 text-sm truncate">Software Engineer</div>
            </div>
          </div>
        </div>

        {/* Apps List */}
        <div className="p-2 max-h-96 overflow-y-auto">
          {/* Pinned Section */}
          <div className="mb-4">
            <div className="text-gray-300 text-xs font-semibold mb-3 px-2">PINNED</div>
            <div className="grid grid-cols-3 gap-2">
              {cvApps.slice(0, 6).map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
                >
                  <span className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-200">
                    {app.icon}
                  </span>
                  <span className="text-white text-xs font-medium text-center leading-tight">{app.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* All Apps Section */}
          <div>
            <div className="text-gray-300 text-xs font-semibold mb-3 px-2">ALL APPS</div>

            {/* CV Sections */}
            <div className="mb-4">
              <div className="text-gray-400 text-xs mb-2 px-2">CV Sections</div>
              {cvApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  className="w-full flex items-center space-x-3 p-2 sm:p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  <span className="text-lg sm:text-xl">{app.icon}</span>
                  <span className="text-white font-medium text-sm sm:text-base">{app.title}</span>
                </button>
              ))}
            </div>

            {/* Games */}
            <div>
              <div className="text-gray-400 text-xs mb-2 px-2">Games</div>
              {gameApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  className="w-full flex items-center space-x-3 p-2 sm:p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  <span className="text-lg sm:text-xl">{app.icon}</span>
                  <span className="text-white font-medium text-sm sm:text-base">{app.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              <span className="text-red-400">⏻</span>
              <span className="text-white text-sm">Close</span>
            </button>

            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors duration-200">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
