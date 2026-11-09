// Single source of truth for personal details. Source: resume (primary),
// GitHub profile (verification). Anything marked TODO is not yet verified.

export const profile = {
  name: "Adarsh Patil",
  shortName: "Adarsh",
  location: "Kolhapur, Maharashtra",
  email: "adarshpatil862@gmail.com",
  github: "https://github.com/adarshpatil1209",
  githubUsername: "adarshpatil1209",
  linkedin: "https://www.linkedin.com/in/adarsh-patil-409465383/",
  siteUrl: "https://adarshpatil.tech/",
  resumePath: "/Adarsh_Patil_Resume.pdf",
  tagline: [
    "B.Tech CSE (AI & ML) student at KIT's College of Engineering, Kolhapur.",
    "I enjoy owning projects end-to-end: UI/UX, backend logic and deployment.",
    "Exploring machine learning, generative AI and open source.",
  ],
  about:
    "I'm a Computer Science Engineering student specialising in AI & ML, based in Kolhapur. I like taking a project from idea to deployment on my own: designing the interface, writing the backend logic and documenting what I build. I'm looking for a frontend development, technical content writing or generalist software engineering internship at a product-focused team.",

};

export const education = [
  {
    school: "KIT's College of Engineering, Kolhapur",
    degree: "B.Tech – Computer Science Engineering, AI & ML Specialization",
    dates: "Aug 2025 – May 2029",
    location: "Kolhapur, Maharashtra",
    details:
      "Coursework: Data Structures, C Programming, Python, Engineering Mathematics, AI & ML Fundamentals",
  },
  {
    school: "Sainik School, Bijapur",
    degree: "Higher Secondary Certificate – Science (Grade: A1)",
    dates: "Graduated 2023",
    location: "Bijapur, Karnataka",
    details: "",
  },
];

export const skillGroups = [
  { title: "Languages", items: ["Python", "C", "JavaScript", "HTML5", "CSS3"] },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Vercel", "Figma", "GitHub Copilot"],
  },
  {
    title: "Concepts",
    items: [
      "Django",
      "Responsive Web Design",
      "REST APIs",
      "Object-Oriented Programming",
      "UI/UX Design",
      "Agile Workflow",
      "Project Deployment",
    ],
  },
  {
    title: "AI & ML",
    items: ["Machine Learning Fundamentals", "Generative AI", "LLM Prompt Engineering"],
  },
];

export const openSource = [
  {
    org: "Sugar Labs",
    role: "Open Source Documentation Contributor",
    dates: "Jan 2025 – Mar 2025",
    description:
      "Contributed documentation improvements to Sugar Labs, an educational nonprofit, through pull requests reviewed and merged by project maintainers.",
    href: "https://github.com/sugarlabs",
  },
];

export const achievements = [
  {
    title: "Round 2 Qualifier",
    event: "ISRO Hackathon",
    description:
      "Shortlisted into the second round after submitting a technical presentation backed by original research.",
  },
  {
    title: "Finalist",
    event: "Tech Negotia",
    description: "Pitched an AI-driven solution to a live evaluation panel.",
  },
  {
    title: "Participant",
    event: "FedEx SMART Hackathon · Shaastra 2026, IIT Madras",
    description: "Took part in the FedEx SMART Hackathon at Shaastra 2026.",
  },
  {
    title: "Round 2 Qualifier",
    event: "Stranger Code",
    description: "Competitive C programming and aptitude contest.",
  },
];

