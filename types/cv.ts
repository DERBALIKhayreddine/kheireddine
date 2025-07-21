export interface CVData {
  about: {
    name: string
    title: string
    location: string
    summary: string
  }
  skills: {
    languages: string[]
    webFrameworks: string[]
    devTools: string[]
    concepts: string[]
  }
  experience: Array<{
    company: string
    position: string
    location: string
    year: string
    description: string
  }>
  education: {
    institution: string
    degree: string
    year: string
    courses: string[]
  }
  projects: Array<{
    name: string
    year: string
    description: string
    status: string
  }>
  contact: {
    email: string
    linkedin: string
    github: string
  }
}
