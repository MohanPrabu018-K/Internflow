// ─── Database Service ────────────────────────────────────────────────────
// Server-side Prisma operations — replaces in-memory candidate-store.ts
// Only import this in Server Components, API routes, and Server Actions.

import prisma from "@/lib/prisma";
import type { Candidate } from "@/types/internflow";
import type { CandidateFilterState } from "@/types/candidate-management";

// ─── Mappers ─────────────────────────────────────────────────────────────

function mapDbCandidateToApp(row: Record<string, unknown>): Candidate {
  return {
    id: parseInt(String(row.id).replace(/\D/g, "").slice(-8), 16) || Math.floor(Math.random() * 100000),
    name: String(row.name ?? ""),
    initials: String(row.initials ?? ""),
    email: String(row.email ?? ""),
    phone: String(row.phone ?? ""),
    college: String(row.college_name ?? row.college ?? ""),
    department: String(row.dept_name ?? row.department ?? ""),
    role: String(row.role ?? ""),
    stage: String(row.stage ?? "New") as Candidate["stage"],
    rating: Number(row.rating ?? 0),
    cgpa: Number(row.cgpa ?? 0),
    year: String(row.year ?? ""),
    appliedDate: String(row.appliedDate instanceof Date ? (row.appliedDate as Date).toISOString() : row.appliedDate ?? new Date().toISOString()),
    location: String(row.location ?? ""),
    github: String(row.githubUrl ?? ""),
    linkedin: String(row.linkedinUrl ?? ""),
    skills: Array.isArray(row.skills) ? row.skills as string[] : [],
    color: String(row.color ?? "#3B82F6"),
    recruiter: String(row.recruiter_name ?? row.recruiter ?? "Unassigned"),
    assignedRecruiter: String(row.recruiter_name ?? row.recruiter ?? undefined),
    experience: String(row.experience ?? ""),
    projects: Array.isArray(row.projects) ? row.projects as string[] : [],
    portfolio: String(row.portfolioUrl ?? ""),
    notes: String(row.notes ?? ""),
    resumeFileName: row.resumeFileName as string | undefined,
    resumeUploadedAt: row.resumeUploadedAt as string | undefined,
    resumeMimeType: row.resumeMimeType as string | undefined,
    resumePreviewUrl: row.resumePreviewUrl as string | undefined,
    parsedResume: row.aiParsedResume as Candidate["parsedResume"],
    resumeAnalysis: row.aiResumeAnalysis as Candidate["resumeAnalysis"],
    skillBadges: row.aiSkillBadges as Candidate["skillBadges"],
    aiTotalScore: row.aiTotalScore as number | undefined,
  };
}

function buildFilterWhere(filters?: Partial<CandidateFilterState>): Record<string, any> {
  const where: Record<string, any> = {};

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { role: { contains: q, mode: "insensitive" } },
      { location: { contains: q, mode: "insensitive" } },
      { college: { name: { contains: q, mode: "insensitive" } } },
    ];
  }

  if (filters?.stage && filters.stage !== "All") {
    where.stage = filters.stage;
  }

  if (filters?.department && filters.department !== "All") {
    where.department = { name: filters.department };
  }

  if (filters?.college && filters.college !== "All") {
    where.college = { name: filters.college };
  }

  if (filters?.year && filters.year !== "All") {
    where.year = filters.year;
  }

  if (filters?.cgpa) {
    where.cgpa = { gte: Number(filters.cgpa) };
  }

  return where;
}

// ─── Candidate Operations ────────────────────────────────────────────────

export const DBService = {
  async getCandidates(filters?: Partial<CandidateFilterState>): Promise<Candidate[]> {
    const where = buildFilterWhere(filters);
    const rows = await prisma.candidate.findMany({
      where,
      include: {
        college: { select: { name: true } },
        department: { select: { name: true } },
        assignedRecruiter: { select: { name: true } },
      },
      orderBy: { appliedDate: "desc" },
    });

    return rows.map((r: any) =>
      mapDbCandidateToApp({
        ...r,
        appliedDate: r.appliedDate,
        college_name: r.college?.name,
        dept_name: r.department?.name,
        recruiter_name: r.assignedRecruiter?.name,
      })
    );
  },

  async getCandidateById(id: number): Promise<Candidate | null> {
    const all = await prisma.candidate.findMany({
      include: {
        college: { select: { name: true } },
        department: { select: { name: true } },
        assignedRecruiter: { select: { name: true } },
      },
    });

    const row = all.find((r: any) => {
      const hash = parseInt(r.id.replace(/\D/g, "").slice(-8), 16) || 0;
      return hash === id;
    });

    if (!row) return null;

    return mapDbCandidateToApp({
      ...row,
      appliedDate: row.appliedDate,
      college_name: row.college?.name,
      dept_name: row.department?.name,
      recruiter_name: row.assignedRecruiter?.name,
    });
  },

  async updateCandidate(id: number, patch: Partial<Candidate>): Promise<Candidate | null> {
    const all = await prisma.candidate.findMany({ select: { id: true } });
    const match = all.find((r: any) => {
      const hash = parseInt(r.id.replace(/\D/g, "").slice(-8), 16) || 0;
      return hash === id;
    });

    if (!match) return null;

    const data: Record<string, any> = {};
    if (patch.name !== undefined) data.name = patch.name;
    if (patch.email !== undefined) data.email = patch.email;
    if (patch.phone !== undefined) data.phone = patch.phone;
    if (patch.role !== undefined) data.role = patch.role;
    if (patch.stage !== undefined) data.stage = patch.stage;
    if (patch.rating !== undefined) data.rating = patch.rating;
    if (patch.notes !== undefined) data.notes = patch.notes;
    if (patch.skills !== undefined) data.skills = patch.skills;
    if (patch.projects !== undefined) data.projects = patch.projects;
    if (patch.resumeFileName !== undefined) data.resumeFileName = patch.resumeFileName;
    if (patch.resumeUploadedAt !== undefined) data.resumeUploadedAt = new Date(patch.resumeUploadedAt);
    if (patch.resumeMimeType !== undefined) data.resumeMimeType = patch.resumeMimeType;
    if (patch.resumePreviewUrl !== undefined) data.resumePreviewUrl = patch.resumePreviewUrl;
    if (patch.archived !== undefined) data.archived = patch.archived;

    await prisma.candidate.update({ where: { id: match.id }, data });
    return this.getCandidateById(id);
  },

  async deleteCandidate(id: number): Promise<void> {
    const all = await prisma.candidate.findMany({ select: { id: true } });
    const match = all.find((r: any) => {
      const hash = parseInt(r.id.replace(/\D/g, "").slice(-8), 16) || 0;
      return hash === id;
    });
    if (match) {
      await prisma.candidate.delete({ where: { id: match.id } });
    }
  },

  async getDashboardStats() {
    const [total, byStage, byDept, recentActivity] = await Promise.all([
      prisma.candidate.count(),
      prisma.candidate.groupBy({ by: ["stage"], _count: true }),
      prisma.department.findMany({
        include: { _count: { select: { candidates: true } } },
      }),
      prisma.candidate.findMany({
        take: 10,
        orderBy: { updatedAt: "desc" },
        select: { name: true, stage: true, updatedAt: true },
      }),
    ]);

    return { total, byStage, byDept, recentActivity };
  },
};
