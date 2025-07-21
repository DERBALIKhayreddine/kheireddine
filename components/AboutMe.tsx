interface AboutMeProps {
  data: {
    name: string
    title: string
    location: string
    summary: string
  }
}

export default function AboutMe({ data }: AboutMeProps) {
  return (
    <div className="p-4 sm:p-6 text-white h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xl sm:text-2xl">K</span>
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold break-words">{data.name}</h1>
          <p className="text-blue-300 text-base sm:text-lg break-words">{data.title}</p>
          <p className="text-gray-300 break-words">📍 {data.location}</p>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <h2 className="text-lg font-semibold mb-3 text-blue-300">Summary</h2>
        <p className="text-gray-200 leading-relaxed">{data.summary}</p>
      </div>
    </div>
  )
}
