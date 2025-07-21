"use client"

import { useWindows } from "@/contexts/WindowContext"
import DesktopIcon from "./DesktopIcon"
import { cvData } from "@/data/cv-data"
import AboutMe from "@/components/AboutMe"
import Skills from "@/components/Skills"
import Experience from "@/components/Experience"
import Education from "@/components/Education"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import TicTacToe from "@/components/TicTacToe"
import Snake from "@/components/Snake"

const desktopApps = [
  // Row 1
  {
    id: "about",
    title: "About Me",
    icon: "🧍‍♂️",
    component: <AboutMe data={cvData.about} />,
    position: { x: 50, y: 50 },
    size: { width: 500, height: 400 },
  },
  {
    id: "skills",
    title: "Skills",
    icon: "🛠️",
    component: <Skills data={cvData.skills} />,
    position: { x: 150, y: 50 },
    size: { width: 600, height: 500 },
  },
  {
    id: "experience",
    title: "Experience",
    icon: "💼",
    component: <Experience data={cvData.experience} />,
    position: { x: 250, y: 50 },
    size: { width: 700, height: 600 },
  },
  // Row 2
  {
    id: "education",
    title: "Education",
    icon: "🎓",
    component: <Education data={cvData.education} />,
    position: { x: 50, y: 180 },
    size: { width: 500, height: 300 },
  },
  {
    id: "projects",
    title: "Projects",
    icon: "🚀",
    component: <Projects data={cvData.projects} />,
    position: { x: 150, y: 180 },
    size: { width: 800, height: 600 },
  },
  {
    id: "contact",
    title: "Contact",
    icon: "📬",
    component: <Contact data={cvData.contact} />,
    position: { x: 250, y: 180 },
    size: { width: 400, height: 350 },
  },
  // Row 3 - Games
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    icon: "⭕",
    component: <TicTacToe />,
    position: { x: 50, y: 310 },
    size: { width: 400, height: 500 },
  },
  {
    id: "snake",
    title: "Snake Game",
    icon: "🐍",
    component: <Snake />,
    position: { x: 150, y: 310 },
    size: { width: 500, height: 600 },
  },
]

export default function Desktop() {
  const { openWindow } = useWindows()

  const handleIconDoubleClick = (app: (typeof desktopApps)[0]) => {
    openWindow(app)
  }

  return (
    <div className="absolute inset-0 p-4">
      {/* Desktop Icons Grid - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 w-fit">
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            title={app.title}
            onDoubleClick={() => handleIconDoubleClick(app)}
          />
        ))}
      </div>
    </div>
  )
}
