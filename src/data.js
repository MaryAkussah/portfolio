export const profile = {
  name: "Mary Immaculata Akussah",
  title: "Frontend Developer & Cloud Engineer",
  email: "maryakussah123@gmail.com",
  phone: "+233 55 470 2282",
  city: "Greater Accra, Ghana",
  degree: "BSc. Computer Science",
  github: "https://github.com/MaryAkussah",
  linkedin: "https://linkedin.com/in/mary-immaculata-akussah",
};

export const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/services", label: "Services" },
  { path: "/resume", label: "Resume" },
  { path: "/certifications", label: "Certifications" },
  { path: "/contact", label: "Contact" },
];

export const stats = [
  { label: "Featured Projects", value: 6 },
  { label: "Years of Experience", value: 5 },
  { label: "AWS Certifications", value: 2 },
];

export const skillGroups = [
  {
    category: "Frontend Development",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "ReactJS", "Next.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS EC2 / S3 / Lambda", "VPC & IAM", "CloudFormation", "CloudWatch / CloudTrail", "ECS / EKS", "Route 53 / CloudFront", "Terraform", "GitHub Actions"],
  },
  {
    category: "Containerization",
    skills: ["Docker", "Kubernetes"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "Relational Modelling", "Query Optimization"],
  },
  {
    category: "GRC & Audit",
    skills: ["ITGC Testing", "SOX Compliance", "PCI DSS", "Risk Assessment", "Third-Party Risk Management"],
  },
  {
    category: "Other Skills",
    skills: ["Microsoft Office", "Annotation", "Digital Skills"],
  },
];

export const projects = [
  {
    title: "TYP — Testing Your Preparedness",
    subtitle: "Multi-Tenant Exam-Prep & Course Marketplace Platform",
    url: "https://testingyourpreparedness.com",
    label: "testingyourpreparedness.com",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    description:
      "Built and styled the frontend across the public site and 5 role dashboards (Super Admin, Content Admin, School Admin, Student, Tutor) using a shared component system.",
    bullets: [
      "Built the full exam-taking interface: countdown timer, question navigation, submission flow, and a results dashboard with score, rank, and percentile breakdowns.",
      "Built multi-step onboarding wizards for schools, students, and tutors, plus a course marketplace with catalog browsing, filtering, and purchase flow.",
    ],
    status: "Live",
  },
  {
    title: "BestMart",
    subtitle: "Multi-Vendor E-Commerce Marketplace",
    url: "https://bestmart-one.vercel.app",
    label: "bestmart-one.vercel.app",
    stack: ["React", "Vite", "React Router", "Context API", "Tailwind CSS"],
    description:
      "A client-only React SPA marketplace (buyer storefront and seller dashboard) simulating persistent accounts and orders with Context API and localStorage.",
    bullets: [
      "Designed a dual-sided auth system for buyers and sellers with real login/logout, password verification, and session restoration across visits.",
      "Built a seller dashboard with product CRUD, a 10-photo gallery upload, ad campaign management, and order tracking, verified with Playwright test suites.",
    ],
    status: "Live",
  },
  {
    title: "Winners Family School",
    subtitle: "K12 School Website",
    url: "https://winnersfamilyschool.vercel.app",
    label: "winnersfamilyschool.vercel.app",
    stack: ["React", "TypeScript", "Vite", "React Router"],
    description:
      "A responsive, multi-page website (10+ routes) for a K12 school with a token-driven design system for visual consistency.",
    bullets: [
      "Built an interactive photo gallery with category filtering, a keyboard-navigable lightbox, and staggered entrance animations across 25+ images.",
      "Implemented a mailto-based admissions form, multi-level dropdown navigation, and accessibility support (reduced motion, focus states, ARIA labeling).",
    ],
    status: "Live",
  },
];

export const cloudProjects = [
  {
    title: "Text-to-Speech (TTS) Application",
    date: "September 2025",
    stack: ["AWS Polly", "Lambda", "Boto3", "S3"],
    bullets: [
      "Designed and implemented a serverless text-to-speech system using AWS Polly and Boto3, improving accessibility and cutting content creation time by 40%.",
      "Configured Amazon S3 for secure audio storage and global access scalability.",
      "Streamlined text-to-audio processing workflows with AWS Lambda, cutting manual handling effort by 60%.",
    ],
  },
  {
    title: "Secure File Upload & Audit Logging",
    date: "August 2025",
    stack: ["AWS S3", "KMS", "CloudTrail", "CloudWatch", "Lambda"],
    bullets: [
      "Developed a secure file upload and audit trail solution using AWS S3 and KMS encryption, ensuring 99% data confidentiality and full traceability.",
      "Enforced least privilege access by configuring IAM roles and S3 bucket policies aligned with compliance standards.",
      "Integrated CloudTrail, CloudWatch, and SNS for real-time monitoring and automated compliance alerts.",
    ],
  },
  {
    title: "DevOps Integration with Containerization",
    date: "July 2025",
    stack: ["Kubernetes", "Docker", "ECS", "CodePipeline"],
    bullets: [
      "Engineered a Kubernetes-based container orchestration platform, achieving 99.9% uptime with zero-downtime deployments.",
      "Built CI/CD pipelines using Docker, ECS, and CodePipeline, accelerating deployment cycles by 60%.",
      "Containerized and deployed applications on AWS ECS with ALB and CloudWatch, improving delivery efficiency by 50%.",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    period: "Sep 2017 - Nov 2021",
    place: "University of Ghana, Accra, Ghana",
  },
];

export const experience = [
  {
    role: "Technical Operations & Content Systems Lead",
    period: "May 2026 - Present · 5 mos",
    place: "Africa Web3 Institute, Ghana",
    bullets: [
      "Manage and monitor the organization's hosting, email, website, and technical environments to ensure reliable operations.",
      "Support frontend and backend development, software hosting, and continuous website enhancements.",
    ],
  },
  {
    role: "Cloud Engineer",
    period: "Jun 2025 - Oct 2025 · 5 mos",
    place: "Azubi Africa",
    bullets: [
      "Completed a 5-month AWS Cloud program focused on Terraform, Docker, and DevOps tools, delivering Infrastructure as Code (IaC) solutions for real-world projects.",
      "Partnered with engineering teams to simulate real-world DevOps scenarios, enhancing automation and deployment accuracy.",
    ],
  },
  {
    role: "Frontend Developer",
    period: "May 2025 - Jul 2025 · 3 mos",
    place: "Touch Stack Technologies, Accra",
    bullets: [
      "Refactored ReactJS components, reducing page load times by 20% and improving app responsiveness.",
      "Partnered with UI/UX and backend teams to deliver new features ahead of schedule and optimize API integration for smoother user interaction.",
    ],
  },
  {
    role: "Digital Marketing",
    period: "Nov 2024 - Apr 2025 · 6 mos",
    place: "Incas Diagnostics, Greater Accra Region, Ghana",
    bullets: [
      "Produced targeted digital content, including infographics, video editing, flyers, and articles, that boosted social media engagement by 25% and expanded campaign visibility across health initiatives.",
    ],
  },
  {
    role: "Frontend Developer",
    period: "May 2023 - Oct 2024 · 1 yr 6 mos",
    place: "LabanexIT, Accra",
    bullets: [
      "Built and maintained frontend features as part of the engineering team, contributing to ongoing product development.",
    ],
  },
  {
    role: "Executive Sales Representative",
    period: "Dec 2022 - Mar 2025 · 2 yrs 4 mos",
    place: "Onlineafrica, Greater Accra Region, Ghana",
    bullets: [
      "Managed social media campaigns, growing audience reach by 30%.",
      "Guided and onboarded 50+ vendors, improving platform adoption and customer retention through personalized support.",
    ],
  },
  {
    role: "IT Auditor & Compliance Analyst",
    period: "Oct 2021 - Sep 2024 · 3 yrs",
    place: "YesYouCan CyberSecure, Texas, United States",
    bullets: [
      "Acquired hands-on experience in cybersecurity fundamentals and GRC frameworks, building expertise in governance, risk, and compliance strategies.",
      "Conducted IT audit practices, including SOX compliance and testing of ITGC controls to ensure adherence to regulatory standards.",
      "Performed risk assessments and third-party risk management, and executed hashing/encryption testing and PCI DSS compliance protocols.",
    ],
  },
  {
    role: "Information Technology Specialist",
    period: "Nov 2021 - Oct 2022 · 1 yr",
    place: "Ghana Revenue Authority, Accra Metropolitan District, Ghana",
    bullets: [
      "Troubleshot and optimized the GITMIS system operations, reducing recurring technical support requests by 20% and resolving network issues to ensure smooth daily performance.",
    ],
  },
];

export const certifications = [
  { name: "AWS Cloud Solutions Architect Associate", issuer: "Amazon Web Services (AWS)" },
  { name: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services (AWS)" },
  { name: "Cybersecurity GRC-IT Audit Certification", issuer: "" },
  { name: "Software Development", issuer: "Amalitech" },
  { name: "AWS Knowledge: Cloud Essentials", issuer: "Amazon Web Services (AWS)" },
  { name: "Essentials of Prompt Engineering", issuer: "" },
  { name: "Exploring AI", issuer: "" },
  { name: "Career Preparation", issuer: "" },
];

export const services = [
  {
    icon: "code",
    title: "Frontend Development",
    description:
      "Building responsive, accessible web applications with React, Next.js, TypeScript, and Tailwind CSS — from marketing sites to full role-based dashboards.",
  },
  {
    icon: "cloud",
    title: "Cloud & DevOps",
    description:
      "Designing serverless and containerized solutions on AWS — Lambda, S3, ECS/EKS, CI/CD pipelines with Docker, Terraform, and GitHub Actions.",
  },
  {
    icon: "shield",
    title: "GRC & IT Audit",
    description:
      "Conducting ITGC testing, SOX and PCI DSS compliance reviews, risk assessments, and third-party risk management for regulated environments.",
  },
  {
    icon: "marketing",
    title: "Digital Marketing",
    description:
      "Producing targeted digital content and campaigns — infographics, video editing, and social strategy — to grow engagement and visibility.",
  },
];
