interface ProjectsProps {
  data: readonly {
    name: string;
    year: string;
    description: string;
    status: string;
  }[];
}


export default function Projects({ data }: ProjectsProps) {
  return (
    <div className="p-4 sm:p-6 text-white h-full overflow-y-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 flex items-center">
        <span className="mr-2">🚀</span>
        Projects
      </h1>

      <div className="grid gap-4 sm:gap-6">
        {data.map((project, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-lg p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 flex-1">
                <span className="text-lg sm:text-xl">{project.status}</span>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-300 break-words">{project.name}</h3>
              </div>
              <span className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                {project.year}
              </span>
            </div>
            <p className="text-gray-200 leading-relaxed">{project.description}</p>

            {/* Project Tags/Technologies (you can add this data to your CV data) */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.name === "QuantoTrade" && (
                <>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-200 rounded text-xs">FastAPI</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-200 rounded text-xs">LangChain</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-200 rounded text-xs">Next.js</span>
                </>
              )}
              {project.name === "Legal Bot" && (
                <>
                  <span className="px-2 py-1 bg-green-500/20 text-green-200 rounded text-xs">LangChain</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-200 rounded text-xs">Python</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-200 rounded text-xs">NLP</span>
                </>
              )}
              {project.name === "Terminal CV" && (
                <>
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-200 rounded text-xs">Next.js</span>
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-200 rounded text-xs">React</span>
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-200 rounded text-xs">TypeScript</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 sm:p-6 border border-blue-400/20">
        <h3 className="text-lg font-semibold mb-2 text-blue-300">Interested in My Work?</h3>
        <p className="text-gray-300 mb-4">
          Check out my GitHub for more projects and contributions, or get in touch to discuss potential collaborations!
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://github.com/kayreddine"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>🐙</span>
            <span>View GitHub</span>
          </a>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
            <span>📬</span>
            <span>Get in Touch</span>
          </button>
        </div>
      </div>
    </div>
  )
}
