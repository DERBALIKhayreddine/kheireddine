interface SkillsProps {
  data: {
    languages: string[]
    webFrameworks: string[]
    devTools: string[]
    concepts: string[]
  }
}

export default function Skills({ data }: SkillsProps) {
  const skillCategories = [
    { title: "Languages", items: data.languages, icon: "💻" },
    { title: "Web Frameworks", items: data.webFrameworks, icon: "🌐" },
    { title: "Dev Tools", items: data.devTools, icon: "🛠️" },
    { title: "Concepts", items: data.concepts, icon: "🧠" },
  ]

  return (
    <div className="p-4 sm:p-6 text-white h-full overflow-y-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 flex items-center">
        <span className="mr-2">🛠️</span>
        Skills & Technologies
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-blue-300 flex items-center">
              <span className="mr-2">{category.icon}</span>
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item, itemIndex) => (
                <span
                  key={itemIndex}
                  className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-xs sm:text-sm border border-blue-400/30"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
