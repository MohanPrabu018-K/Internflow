import type { ParsedResume, ParsedExperience, ParsedEducation } from "@/types/ai";

const wait = (ms = 200) => new Promise((r) => setTimeout(r, ms));

const MOCK_PARSE_DATA: Record<number, ParsedResume> = {
  1: {
    name: "Aarav Mehta", email: "aarav.mehta@iitb.ac.in", phone: "+91 98765 43210",
    college: "IIT Bombay", cgpa: 9.1,
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "Figma", "HTML", "CSS", "Git"],
    projects: ["E-Commerce Dashboard", "Real-time Chat Application", "Portfolio Website"],
    certifications: ["AWS Cloud Practitioner", "Meta Frontend Developer"],
    experience: [{ company: "TechCorp", role: "Frontend Intern", duration: "3 months", description: "Built React components for internal dashboard" }],
    education: [{ institution: "IIT Bombay", degree: "B.Tech Computer Science", year: "3rd Year", cgpa: 9.1 }],
    parsedAt: new Date().toISOString(),
  },
  2: {
    name: "Priya Sharma", email: "priya.sharma@nit.ac.in", phone: "+91 87654 32109",
    college: "NIT Trichy", cgpa: 8.7,
    skills: ["React", "Python", "Django", "PostgreSQL", "Docker", "JavaScript", "HTML", "CSS"],
    projects: ["Task Manager API", "Blog Platform", "Weather Dashboard"],
    certifications: ["Python for Everybody", "Docker Essentials"],
    experience: [{ company: "StartupX", role: "Full Stack Intern", duration: "6 months", description: "Developed REST APIs and React frontend" }, { company: "Freelance", role: "Web Developer", duration: "3 months", description: "Built WordPress sites for local businesses" }],
    education: [{ institution: "NIT Trichy", degree: "B.Tech Electronics & CS", year: "4th Year", cgpa: 8.7 }],
    parsedAt: new Date().toISOString(),
  },
  3: {
    name: "Rohan Gupta", email: "rohan.gupta@bits.ac.in", phone: "+91 76543 21098",
    college: "BITS Pilani", cgpa: 9.4,
    skills: ["Python", "TensorFlow", "PyTorch", "LangChain", "FastAPI", "Scikit-learn", "Pandas", "NumPy"],
    projects: ["Image Classifier", "NLP Chatbot", "Recommendation Engine"],
    certifications: ["Deep Learning Specialization", "TensorFlow Developer Certificate"],
    experience: [{ company: "AI Labs", role: "ML Intern", duration: "6 months", description: "Trained and deployed NLP models" }, { company: "Research Lab", role: "Research Assistant", duration: "4 months", description: "Published paper on transformer models" }],
    education: [{ institution: "BITS Pilani", degree: "B.Tech Computer Science", year: "4th Year", cgpa: 9.4 }],
    parsedAt: new Date().toISOString(),
  },
};

export const ResumeParserService = {
  async parseResume(candidateId: number, _fileBuffer?: ArrayBuffer): Promise<ParsedResume> {
    await wait(400);
    if (MOCK_PARSE_DATA[candidateId]) return MOCK_PARSE_DATA[candidateId];

    // Generate mock data
    return {
      name: `Candidate ${candidateId}`,
      email: `candidate${candidateId}@example.com`,
      phone: `+91 9${candidateId}00 000${candidateId}`,
      college: ["IIT Delhi", "NIT Surathkal", "VIT Vellore", "BITS Goa"][candidateId % 4],
      cgpa: 7.5 + (candidateId % 20) * 0.1,
      skills: ["JavaScript", "Python", "React", "Node.js", "SQL"].slice(0, 2 + (candidateId % 4)),
      projects: [`Project Alpha ${candidateId}`, `Project Beta ${candidateId}`],
      certifications: ["Certification A", "Certification B"].slice(0, 1 + (candidateId % 2)),
      experience: [{ company: "Company X", role: "Intern", duration: "3 months", description: "Worked on production features" }],
      education: [{ institution: "University", degree: "B.Tech", year: "2025", cgpa: 8.0 }],
      parsedAt: new Date().toISOString(),
    };
  },
};
