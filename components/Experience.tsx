interface ExperienceProps {
  data: Array<{
    company: string
    position: string
    location: string
    year: string
    description: string
  }>
}

export default function Experience({ data }: ExperienceProps) {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <span className="mr-2">💼</span>
        Work Experience
      </h1>

      <div className="space-y-6">
        {data.map((job, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-5 border border-white/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-semibold text-blue-300">{job.company}</h3>
                <p className="text-lg text-white">{job.position}</p>
                <p className="text-gray-300">📍 {job.location}</p>
              </div>
              <span className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm">{job.year}</span>
            </div>
            <p className="text-gray-200 leading-relaxed">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
