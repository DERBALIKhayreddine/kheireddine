export const cvData = {
  about: {
    name: "Kayreddine Derbali",
    title: "Software Engineer",
    location: "Tunisia",
    summary:
      " Motivated Software Engineer with expertise in full-stack development, AI, and DevOps. Specialized in building scalable web applications and data-driven solutions. Currently seeking new opportunities to contribute, grow, and tackle meaningful technical challenges.",
  },
  skills: {
  languages: ["Java", "Python", "JavaScript", "TypeScript"],
  webFrameworks: ["Angular", "React", "Spring Boot", "Express.js", "Django"],
  devTools: ["Git", "Docker", "Kubernetes", "Jenkins", "Netlify", "Plesk", "Figma", "WordPress"],
  concepts: ["OOP", "REST", "CI/CD", "Algorithmic Trading", "LLMs", "AI/ML", "Databases"],
},

  experience: [
    {
      company: "CodeCooperation GmbH",
      position: "Software Developer Intern",
      location: "Hybrid– Tunis, Tunisia",
      year: "Feb 2024– july 2024",
      description:
        'Developed QuantoTrade, an AI-driven trading platform built using FastAPI, LangChain, Next.js, and Spring Boot. I implemented a real-time analytics dashboard using WebSockets and Next.js, significantly improving trading visibility and responsiveness. Additionally, I designed and deployed CI/CD workflows via GitHub Actions, reducing manual deployment time by 70%. The platform also features an integrated chatbot powered by VectorDB, enhancing search efficiency and user support.',
    },
    {
      company: "Fiverr",
      position: "web developer Freelancer",
      location: "Remote",
      year: " Apr 2025",
      description: "Delivered Bitcoin Accumulator, a crypto portfolio dashboard built with the Binance API and Next.js. The application was deployed on Vercel, ensuring instant global accessibility and a seamless user experience.",
    },
    {
      company: " QuantoDev",
      position: "Software Developer Intern",
      location: "Remote– Riga, Latvia",
      year: "May 2024– Sept 2024",
      description: "Integrated automated deployment pipelines using GitHub Actions to enhance delivery speed and reliability. Developed responsive user interfaces with Angular, ensuring full mobile compatibility and accessibility. Deployed applications via Netlify with zero-downtime updates, ensuring seamless production rollouts.",
    },
    {
      company: "Ecommerce website Help Informatique",
      position: "Web Developer Freelancer",
      location: "Remote– Sfax, Tunisia",
      year: " Apr 2024– Aug 2024",
      description: "Developed a full-featured e-commerce platform with integrated modules for users, products, orders, and payments. Configured production hosting using Plesk and managed domain integration for seamless deployment.",
    },
     {
      company: "New Journey Global Consulting",
      position: "Web Developer Freelancer",
      location: "Remote– Sfax, Tunisia",
      year: "Jun 2023– Aug 2023",
      description: "developed a responsive travel consulting platform featuring an intuitive admin panel. Integrated a secure user registration and payment system using the Flouci API, ensuring safe and seamless transactions.",
    },
  ],
  education: {
   institution: "International Institute of Technology",
  degree: "Engineering Degree in Software Engineering",
  year: "2025",
  courses: [
    "Data Science",
    "Web Development",
    "Big Data",
    "Cloud Computing & DevOps",
    "Artificial Intelligence & Machine Learning",
    "Software Architecture",
  ], },
projects: [
  {
    name: "Streamlit Caption App",
    year: "2025",
    description: "A web application that converts images to descriptive text using pre-trained AI models. Built with Python and deployed using Streamlit.",
    status: "✅",
  },
  {
    name: "Banking Management System",
    year: "2025",
    description: "A simple banking management platform with a Java Spring Boot backend and Angular frontend. Features include user account management and transaction tracking.",
    status: "✅",
  },
  {
    name: "University Printer Management System",
    year: "2024",
    description: "A web-based print management system designed for academic institutions, supporting roles for print agents, teachers, and administrators. Built using Java JEE, JSP, and Servlets.",
    status: "✅",
  },
  {
    name: "Crypto News Dashboard",
    year: "2024",
    description: "A real-time cryptocurrency visualization dashboard with interactive charts. Developed using Angular and Node.js.",
    status: "✅",
  },
],
  contact: {
    email: "kheireddinederbali@gmail.com",
    linkedin: "https://www.linkedin.com/in/derbali-khaireddine-912b88241/",
    github: "https://github.com/DERBALIKhayreddine",
  },
} as const
