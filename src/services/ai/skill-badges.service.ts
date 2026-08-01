import type { SkillBadge, SkillBadgeName, SkillBadgeCategory } from "@/types/ai";
import type { Candidate } from "@/types/internflow";

const wait = (ms = 150) => new Promise((r) => setTimeout(r, ms));

const BADGE_DEFINITIONS: Array<{ name: SkillBadgeName; category: SkillBadgeCategory; description: string; icon: string; color: string; condition: (c: Candidate) => boolean }> = [
  { name: "React Expert", category: "technical", description: "Demonstrates advanced React proficiency", icon: "⚛️", color: "bg-blue-500", condition: (c) => c.skills.some((s) => s.toLowerCase() === "react") && c.rating >= 4 },
  { name: "Python Developer", category: "technical", description: "Strong Python programming skills", icon: "🐍", color: "bg-green-500", condition: (c) => c.skills.some((s) => s.toLowerCase() === "python") && c.cgpa >= 8 },
  { name: "TypeScript Pro", category: "technical", description: "Expert-level TypeScript knowledge", icon: "📘", color: "bg-indigo-500", condition: (c) => c.skills.some((s) => s.toLowerCase() === "typescript") },
  { name: "Full Stack Developer", category: "technical", description: "Proficient in both frontend and backend", icon: "🔄", color: "bg-violet-500", condition: (c) => c.skills.filter((s) => ["react", "node.js", "python", "django", "postgresql"].includes(s.toLowerCase())).length >= 2 },
  { name: "AI/ML Enthusiast", category: "domain", description: "Focused on AI and machine learning", icon: "🤖", color: "bg-purple-500", condition: (c) => c.skills.some((s) => ["tensorflow", "pytorch", "langchain", "machine learning"].includes(s.toLowerCase())) },
  { name: "Fast Learner", category: "soft", description: "Demonstrated rapid skill acquisition", icon: "🚀", color: "bg-amber-500", condition: (c) => c.cgpa >= 8.5 },
  { name: "Team Player", category: "soft", description: "Strong collaboration skills", icon: "🤝", color: "bg-teal-500", condition: (c) => (c.projects?.length ?? 0) >= 2 },
  { name: "Problem Solver", category: "soft", description: "Excellent analytical and problem-solving ability", icon: "🧩", color: "bg-orange-500", condition: (c) => c.rating >= 4.5 },
  { name: "Communication Expert", category: "soft", description: "Outstanding communication skills", icon: "💬", color: "bg-pink-500", condition: (c) => c.rating >= 4.2 && c.experience !== "No internship" },
  { name: "Database Expert", category: "technical", description: "Strong database and SQL skills", icon: "🗄️", color: "bg-cyan-500", condition: (c) => c.skills.some((s) => ["sql", "postgresql", "mongodb", "redis"].includes(s.toLowerCase())) },
  { name: "DevOps Ready", category: "technical", description: "Knowledge of CI/CD and containerization", icon: "🐳", color: "bg-slate-500", condition: (c) => c.skills.some((s) => ["docker", "kubernetes", "aws", "ci/cd"].includes(s.toLowerCase())) },
  { name: "Cloud Practitioner", category: "domain", description: "Cloud platform experience", icon: "☁️", color: "bg-sky-500", condition: (c) => c.skills.some((s) => ["aws", "azure", "gcp", "cloud"].includes(s.toLowerCase())) },
];

export const SkillBadgesService = {
  async getBadges(candidate: Candidate): Promise<SkillBadge[]> {
    await wait(200);
    return BADGE_DEFINITIONS
      .filter((b) => b.condition(candidate))
      .map((b) => ({
        name: b.name,
        category: b.category,
        earnedAt: new Date().toISOString(),
        description: b.description,
        icon: b.icon,
        color: b.color,
      }));
  },

  async getBatchBadges(candidates: Candidate[]): Promise<Map<number, SkillBadge[]>> {
    await wait(300);
    const results = new Map<number, SkillBadge[]>();
    for (const c of candidates) {
      results.set(c.id, await this.getBadges(c));
    }
    return results;
  },
};
