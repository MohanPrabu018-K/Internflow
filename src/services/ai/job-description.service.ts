import type { JobDescription } from "@/types/ai";

const wait = (ms = 400) => new Promise((r) => setTimeout(r, ms));

const JD_TEMPLATES: Record<string, Partial<JobDescription>> = {
  Engineering: {
    department: "Engineering",
    responsibilities: [
      "Design and develop scalable software solutions",
      "Collaborate with cross-functional teams",
      "Write clean, maintainable, and testable code",
      "Participate in code reviews and technical discussions",
      "Troubleshoot and debug production issues",
    ],
    qualifications: [
      "Pursuing B.Tech/B.E. in Computer Science or related field",
      "Strong problem-solving and analytical skills",
      "Familiarity with version control (Git)",
      "Good communication skills",
    ],
  },
  Design: {
    department: "Design",
    responsibilities: [
      "Create user-centered designs for web and mobile",
      "Develop wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with developers on implementation",
    ],
    qualifications: [
      "Pursuing degree in Design, HCI, or related field",
      "Proficiency in Figma or Adobe XD",
      "Strong portfolio demonstrating design thinking",
      "Understanding of design systems",
    ],
  },
};

export const JobDescriptionService = {
  async generate(title: string, department: string, skills: string[], experience: string, stipend: string, location: string): Promise<JobDescription> {
    await wait(600);
    const template = JD_TEMPLATES[department] ?? JD_TEMPLATES["Engineering"];

    return {
      id: `jd-${Date.now()}`,
      title,
      department,
      skills,
      experience,
      stipend,
      location,
      description: `We are looking for a talented ${title} to join our ${department} team. This is a ${experience} internship opportunity based in ${location} with a monthly stipend of ${stipend}.`,
      responsibilities: template.responsibilities ?? [],
      qualifications: template.qualifications ?? [],
      generatedAt: new Date().toISOString(),
    };
  },
};
