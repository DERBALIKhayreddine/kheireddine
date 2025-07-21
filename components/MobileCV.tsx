"use client"

import { useState } from "react"
import { cvData } from "@/data/cv-data"

export default function MobileCV() {
  const sections = [
    { id: "about", title: "About Me", icon: "🧍‍♂️" },
    { id: "skills", title: "Skills", icon: "🛠️" },
    { id: "experience", title: "Experience", icon: "💼" },
    { id: "education", title: "Education", icon: "🎓" },
    { id: "projects", title: "Projects", icon: "🚀" },
    { id: "contact", title: "Contact", icon: "📬" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-y-auto">
      {/* Mobile Header */}
      <div className="bg-gray-800/90 backdrop-blur-xl border-b border-white/10 p-4 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Kayreddine Derbali</h1>
            <p className="text-blue-300 text-sm">Software Engineer</p>
          </div>
        </div>
      </div>

      {/* Mobile Sections */}
      <div className="p-4 space-y-4 pb-20">
        {sections.map((section) => (
          <MobileSectionCard key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}

function MobileSectionCard({ section }: { section: { id: string; title: string; icon: string } }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{section.icon}</span>
          <span className="text-lg font-semibold">{section.title}</span>
        </div>
        <div className={`transform transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-white/10 p-4 animate-in slide-in-from-top-2 duration-200">
          <MobileSectionContent sectionId={section.id} />
        </div>
      )}
    </div>
  )
}

function MobileSectionContent({ sectionId }: { sectionId: string }) {
  switch (sectionId) {
    case "about":
      return (
        <div className="space-y-4">
          <p className="text-gray-200 leading-relaxed">{cvData.about.summary}</p>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-blue-300 font-semibold">Title:</span>
              <span className="text-gray-200">{cvData.about.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-300 font-semibold">Location:</span>
              <span className="text-gray-200">{cvData.about.location}</span>
            </div>
          </div>
        </div>
      )

    case "skills":
      return (
        <div className="space-y-6">
          {Object.entries(cvData.skills).map(([category, skills]) => (
            <div key={category}>
              <h4 className="text-blue-300 font-semibold mb-3 capitalize">
                {category.replace(/([A-Z])/g, " $1").trim()}
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm border border-blue-400/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )

    case "experience":
      return (
        <div className="space-y-6">
          {cvData.experience.map((job, index) => (
            <div key={index} className="border-l-4 border-blue-400 pl-4 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h4 className="text-blue-300 font-semibold text-lg">{job.company}</h4>
                <span className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded text-sm w-fit">{job.year}</span>
              </div>
              <p className="text-white font-medium">{job.position}</p>
              <p className="text-gray-300 text-sm mb-2">📍 {job.location}</p>
              <p className="text-gray-200 leading-relaxed">{job.description}</p>
            </div>
          ))}
        </div>
      )

    case "education":
      return (
        <div className="border-l-4 border-green-400 pl-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <div>
              <h4 className="text-green-300 font-semibold text-lg">{cvData.education.institution}</h4>
              <p className="text-white font-medium">{cvData.education.degree}</p>
            </div>
            <span className="bg-green-500/20 text-green-200 px-2 py-1 rounded text-sm w-fit">
              {cvData.education.year}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-green-300 font-semibold mb-3">Key Courses:</p>
            <div className="flex flex-wrap gap-2">
              {cvData.education.courses.map((course, index) => (
                <span key={index} className="px-2 py-1 bg-green-500/20 text-green-200 rounded text-sm">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      )

    case "projects":
      return (
        <div className="space-y-6">
          {cvData.projects.map((project, index) => (
            <div key={index} className="border-l-4 border-purple-400 pl-4 pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{project.status}</span>
                  <h4 className="text-purple-300 font-semibold text-lg">{project.name}</h4>
                </div>
                <span className="bg-purple-500/20 text-purple-200 px-2 py-1 rounded text-sm whitespace-nowrap">
                  {project.year}
                </span>
              </div>
              <p className="text-gray-200 leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
      )

    case "contact":
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <a
              href={`mailto:${cvData.contact.email}`}
              className="flex items-center space-x-3 text-blue-300 hover:text-blue-200 transition-colors p-3 rounded-lg hover:bg-white/5"
            >
              <span className="text-xl">📧</span>
              <span className="break-all">{cvData.contact.email}</span>
            </a>
            <a
              href={`https://${cvData.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-blue-300 hover:text-blue-200 transition-colors p-3 rounded-lg hover:bg-white/5"
            >
              <span className="text-xl">💼</span>
              <span className="break-all">{cvData.contact.linkedin}</span>
            </a>
            <a
              href={`https://${cvData.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-blue-300 hover:text-blue-200 transition-colors p-3 rounded-lg hover:bg-white/5"
            >
              <span className="text-xl">🐙</span>
              <span className="break-all">{cvData.contact.github}</span>
            </a>
          </div>
          <button
            onClick={() => {
              const link = document.createElement("a")
              link.href = "/cv/kay_cv.pdf"
              link.download = "Kayreddine_Derbali_CV.pdf"
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span className="text-xl">📄</span>
            <span>Download CV</span>
          </button>
        </div>
      )

    default:
      return <div className="text-gray-400">Content not found</div>
  }
}
