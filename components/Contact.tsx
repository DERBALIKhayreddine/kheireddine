"use client"

interface ContactProps {
  data: {
    email: string
    linkedin: string
    github: string
  }
}

export default function Contact({ data }: ContactProps) {
  const handleDownloadCV = () => {
    // Create a link element and trigger download
    const link = document.createElement("a")
    link.href = "/cv/kay_cv.pdf"
    link.download = "Kayreddine_Derbali_CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-4 sm:p-6 text-white h-full">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 flex items-center">
        <span className="mr-2">📬</span>
        Contact Information
      </h1>

      <div className="space-y-6">
        <div className="bg-white/5 rounded-lg p-4 sm:p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4 text-blue-300">Get in Touch</h3>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <span className="text-xl">📧</span>
              <div className="flex-1">
                <div className="text-sm text-gray-400">Email</div>
                <a
                  href={`mailto:${data.email}`}
                  className="text-blue-300 hover:text-blue-200 transition-colors break-all"
                >
                  {data.email}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <span className="text-xl">💼</span>
              <div className="flex-1">
                <div className="text-sm text-gray-400">LinkedIn</div>
                <a
                  href={`https://${data.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 transition-colors break-all"
                >
                  {data.linkedin}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <span className="text-xl">🐙</span>
              <div className="flex-1">
                <div className="text-sm text-gray-400">GitHub</div>
                <a
                  href={`https://${data.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 transition-colors break-all"
                >
                  {data.github}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 sm:p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4 text-blue-300">Download Resume</h3>
          <button
            onClick={handleDownloadCV}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span className="text-xl">📄</span>
            <span>Download CV</span>
          </button>
        </div>

        <div className="bg-white/5 rounded-lg p-4 sm:p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4 text-blue-300">Let's Connect</h3>
          <p className="text-gray-300 leading-relaxed">
            I'm always interested in new opportunities and collaborations. Feel free to reach out if you'd like to
            discuss potential projects, job opportunities, or just want to connect!
          </p>
        </div>
      </div>
    </div>
  )
}
