import type { Candidate } from "@/types/internflow";
import type { CandidateFilterState, ResumeRecord } from "@/types/candidate-management";
import { createCandidateStore, deleteCandidateStore, getCandidateStore, getCandidateStoreById, updateCandidateStore } from "@/lib/candidate-store";

export interface CandidateServiceResponse<T> {
  data: T;
}

const wait = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const CandidateService = {
  async getCandidates(filters?: Partial<CandidateFilterState>): Promise<CandidateServiceResponse<Candidate[]>> {
    await wait();
    const candidates = await getCandidateStore();
    const query = filters?.search?.toLowerCase() ?? "";
    const filtered = candidates.filter((candidate) => {
      const matchesSearch =
        !query ||
        candidate.name.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.college.toLowerCase().includes(query) ||
        candidate.role.toLowerCase().includes(query);
      const matchesDepartment = !filters?.department || filters.department === "All" || candidate.department === filters.department;
      const matchesCollege = !filters?.college || filters.college === "All" || candidate.college === filters.college;
      const matchesStage = !filters?.stage || filters.stage === "All" || candidate.stage === filters.stage;
      const matchesYear = !filters?.year || filters.year === "All" || candidate.year === filters.year;
      const matchesCgpa = !filters?.cgpa || candidate.cgpa >= Number(filters.cgpa);
      const matchesExperience = !filters?.experience || filters.experience === "All" || candidate.experience === filters.experience;
      return matchesSearch && matchesDepartment && matchesCollege && matchesStage && matchesYear && matchesCgpa && matchesExperience;
    });
    return { data: filtered };
  },

  async getCandidateById(id: number): Promise<CandidateServiceResponse<Candidate | null>> {
    return { data: await getCandidateStoreById(id) };
  },

  async createCandidate(payload: Candidate): Promise<CandidateServiceResponse<Candidate>> {
    return { data: await createCandidateStore(payload) };
  },

  async updateCandidate(id: number, patch: Partial<Candidate>): Promise<CandidateServiceResponse<Candidate | null>> {
    return { data: await updateCandidateStore(id, patch) };
  },

  async deleteCandidate(id: number): Promise<CandidateServiceResponse<null>> {
    await deleteCandidateStore(id);
    return { data: null };
  },

  async uploadResume(id: number, fileName: string): Promise<CandidateServiceResponse<ResumeRecord>> {
    await wait();
    await updateCandidateStore(id, {
      resumeFileName: fileName,
      resumeUploadedAt: new Date().toISOString(),
      resumeMimeType: "application/pdf",
      resumePreviewUrl: "/sample-resume.pdf",
    });
    return {
      data: {
        fileName,
        sizeLabel: "1.2 MB",
        uploadedAt: new Date().toISOString(),
        mimeType: "application/pdf",
        previewUrl: "/sample-resume.pdf",
      },
    };
  },

  async deleteResume(id: number): Promise<CandidateServiceResponse<Candidate | null>> {
    return { data: await updateCandidateStore(id, { resumeFileName: undefined, resumeUploadedAt: undefined, resumeMimeType: undefined, resumePreviewUrl: undefined }) };
  },

  async updateStage(id: number, stage: Candidate["stage"]): Promise<CandidateServiceResponse<Candidate | null>> {
    return { data: await updateCandidateStore(id, { stage }) };
  },

  async addNotes(id: number, notes: string): Promise<CandidateServiceResponse<Candidate | null>> {
    return { data: await updateCandidateStore(id, { notes }) };
  },

  async rateCandidate(id: number, rating: number): Promise<CandidateServiceResponse<Candidate | null>> {
    return { data: await updateCandidateStore(id, { rating }) };
  },
};
