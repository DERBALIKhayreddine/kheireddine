interface EducationProps {
  data: {
    institution: string;
    degree: string;
    year: string;
    courses: readonly string[];
  }
}


export default function Education({ data }: EducationProps) {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <span className="mr-2">🎓</span>
        Education
      </h1>

      <div className="bg-white/5 rounded-lg p-5 border border-white/10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-blue-300">{data.institution}</h3>
            <p className="text-lg text-white">{data.degree}</p>
          </div>
          <span className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm">{data.year}</span>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-blue-300">Key Courses</h4>
          <div className="flex flex-wrap gap-2">
            {data.courses.map((course, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-500/20 text-green-200 rounded-full text-sm border border-green-400/30"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
