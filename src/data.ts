export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  type: string;
  frontendTech: string[];
  backendTech: string[];
  databaseTech: string[];
  additionalTech: string[];
  challenges: string[];
  solutions: string[];
  architecture: string;
  github: string;
  live: string;
  stats: { label: string; value: string }[];
  accentColor: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: { name: string; icon: string; proficiency: number; label: string }[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  gradeMax?: string;
  description?: string;
  achievements?: string[];
}

export interface ActivityEntry {
  id: string;
  title: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  icon: string;
  tags: string[];
}

export const PERSONAL_INFO = {
  name: "Md Mahfuj Al Hossain Khan",
  role: "Full Stack Developer",
  tagline: "Building scalable, modern, and high-performance web applications.",
  location: "Dhaka, Bangladesh",
  email: "mkmahfujkhanms@gmail.com",
  phone: "+8801622730166",
  github: "https://github.com/khanmahfuj34",
  linkedin: "https://www.linkedin.com/in/md-mahfuj-al-hossain-khan-377835349",
  twitter: "https://x.com/mkmahfujkhan",
  aboutShort: "I am a Computer Science and Engineering student at Daffodil International University and a passionate Full Stack Developer focused on building scalable, user-centric web applications.",
  aboutDetailed: "I am a Computer Science and Engineering student at Daffodil International University and a passionate Full Stack Developer focused on building scalable, user-centric web applications. My expertise includes React, Next.js, TypeScript, Node.js, Express.js, MongoDB, PostgreSQL, Prisma, Firebase, and modern frontend technologies. I enjoy solving real-world problems through software engineering and continuously improving my technical and problem-solving skills. Currently, I am seeking an internship opportunity where I can contribute to meaningful products while learning from experienced engineers and growing into a senior software developer."
};

export const PROJECTS: Project[] = [
  {
    id: "profast",
    title: "ProFast",
    subtitle: "Full Stack Parcel Delivery Platform",
    type: "Featured Project",
    description: "A premium logistics and parcel delivery platform designed to connect customers with parcel delivery services, including dual dashboards and real-time Socket.IO parcel tracking.",
    longDescription: "ProFast is a full-stack, enterprise-grade parcel shipping platform meticulously designed for lightning-fast courier delivery and real-time logistics. Engineered with high-efficiency real-time communication modules, the application allows seamless interaction between customers requiring cargo transit, riders dispatching consignments, and administrators monitoring structural platform activities.",
    frontendTech: ["React.js", "Tailwind CSS", "Firebase Auth", "Framer Motion"],
    backendTech: ["Node.js", "Express.js"],
    databaseTech: ["MongoDB Atlas", "Mongoose"],
    additionalTech: ["Socket.IO", "Stripe API", "JWT", "Git"],
    challenges: [
      "Real-time coordinate tracking and synchronous client-side re-renders.",
      "Dual secure payment handling with Webhooks and Stripe integration.",
      "Strict role-based authorization rules covering User, Rider, and Admin dashboards."
    ],
    solutions: [
      "Created a robust event-driven Socket.IO architecture that securely and efficiently relays rider location coordinate snapshots to customer web interface views.",
      "Implemented double-entry transaction databases coupled with secure server-side Stripe webhook handling of successful intent receipts.",
      "Leveraged bulletproof JWT middleware and role validation blocks on the Express API server to isolate cross-role routes completely."
    ],
    architecture: "Stateful REST Client-Server framework coupled with persistent full-duplex WebSockets. Database interactions managed via highly defined Object Document Mapping schemas inside MongoDB Atlas.",
    github: "https://github.com/khanmahfuj34/ProFast",
    live: "https://pro-fast-three.vercel.app",
    stats: [
      { label: "Parcel Lifecycle Statuses", value: "Multi-State" },
      { label: "Delivery Tracking Latency", value: "<150ms" },
      { label: "Role Authority Layers", value: "3 Roles" }
    ],
    accentColor: "from-blue-600 to-cyan-500"
  },

];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Experience",
    skills: [
      { name: "React", icon: "Flame", proficiency: 92, label: "Advanced" },
      { name: "Next.js", icon: "Compass", proficiency: 88, label: "Highly Proficient" },
      { name: "TypeScript", icon: "Code2", proficiency: 85, label: "Highly Proficient" },
      { name: "JavaScript", icon: "Braces", proficiency: 95, label: "Expert" },
      { name: "Tailwind CSS", icon: "Palette", proficiency: 94, label: "Expert" },
      { name: "Framer Motion", icon: "MoveUpRight", proficiency: 80, label: "Proficient" }
    ]
  },
  {
    id: "backend",
    title: "Backend Development",
    skills: [
      { name: "Node.js", icon: "Cpu", proficiency: 88, label: "Highly Proficient" },
      { name: "Express.js", icon: "Network", proficiency: 91, label: "Advanced" },
      { name: "Socket.IO", icon: "Radio", proficiency: 82, label: "Highly Proficient" },
      { name: "JWT Auth", icon: "KeyRound", proficiency: 88, label: "Highly Proficient" },
      { name: "Stripe Payment", icon: "CreditCard", proficiency: 84, label: "Proficient" }
    ]
  },
  {
    id: "database",
    title: "Database & Cloud Infrastructure",
    skills: [
      { name: "MongoDB", icon: "Database", proficiency: 90, label: "Advanced" },
      { name: "Firebase", icon: "CloudLightning", proficiency: 89, label: "Advanced" },
      { name: "Supabase", icon: "Server", proficiency: 81, label: "Proficient" }
    ]
  },
  {
    id: "tools",
    title: "Agile Tools & Platforms",
    skills: [
      { name: "Git", icon: "GitBranch", proficiency: 92, label: "Advanced" },
      { name: "GitHub", icon: "Github", proficiency: 94, label: "Expert" },
      { name: "Vercel", icon: "Triangle", proficiency: 90, label: "Advanced" },
      { name: "VS Code", icon: "Laptop", proficiency: 95, label: "Expert" },
      { name: "Antigravity", icon: "Rocket", proficiency: 100, label: "Master" },
      { name: "Netlify", icon: "Globe", proficiency: 92, label: "Expert" },
      { name: "Railway", icon: "Train", proficiency: 91, label: "Expert" }
    ]
  }
];

export const EDUCATION: EducationEntry[] = [
  {
    id: "cse",
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Daffodil International University",
    period: "2022 - Present",
    description: "Acquiring core knowledge of data structures, algorithms, relational database architectures, compilers, artificial intelligence modules, and software design principles.",
    achievements: [
      "Active Programming Contest Participant (DIU Unlock the Algorithm and DIU Take Off).",
      "Core Member of Students Robotics Club, organizing and participating in technical exhibitions."
    ]
  },
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Vashantak Govt. College, Dhaka",
    period: "2019 - 2021",
    gpa: "4.92",
    gradeMax: "5.00",
    description: "Concentration in Science and mathematics, focusing on fundamental chemistry, mechanics, and computational logic."
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate (SSC)",
    institution: "Batakandi Sarkar Saheb Ali Abul Hossain Memorial High School",
    period: "2014 - 2019",
    gpa: "4.62",
    gradeMax: "5.00"
  }
];

export const ACTIVITIES: ActivityEntry[] = [
  {
    id: "contest",
    title: "Competitive Programming",
    role: "Contest Participant",
    organization: "DIU Unlock The Algorithm",
    period: "2023 - Present",
    description: "Participated in timed algorithm competitions to build rapid problem-solving skills under pressure. Focused on computational geometries, math patterns, string parsers, and dynamic arrays.",
    icon: "Trophy",
    tags: ["Algorithms", "Problem Solving", "C++", "DIU CP"]
  },
  {
    id: "robotics",
    title: "Robotics Engineering",
    role: "Active Member",
    organization: "DIU Students Robotics Club",
    period: "2022 - Present",
    description: "Collaborated on designing micro-controlled embedded boards, system diagnostics, and mechanical layouts for remote robotics models.",
    icon: "Cpu",
    tags: ["Embedded Systems", "Hardware Labs", "Robotics", "IoT"]
  },
  {
    id: "volunteer",
    title: "Social Work & Support",
    role: "Volunteer",
    organization: "Shopno Foundation, Dhaka",
    period: "2021 - Present",
    description: "Devoted support to local community charity, food distributions, educational accessibility packages, and disaster support relief actions.",
    icon: "HeartHandshake",
    tags: ["Social Welfare", "Leadership", "Community Help", "Charity"]
  }
];
