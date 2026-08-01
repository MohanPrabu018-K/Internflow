import { mockData } from "./mock-data";
import type { Candidate } from "@/types/internflow";

let candidateStore: Candidate[] = [...mockData.candidates];

const wait = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCandidateStore() {
  await wait();
  return [...candidateStore];
}

export async function getCandidateStoreById(id: number) {
  await wait();
  return candidateStore.find((candidate) => candidate.id === id) ?? null;
}

export async function updateCandidateStore(id: number, patch: Partial<Candidate>) {
  await wait();
  candidateStore = candidateStore.map((candidate) => (candidate.id === id ? { ...candidate, ...patch } : candidate));
  return getCandidateStoreById(id);
}

export async function deleteCandidateStore(id: number) {
  await wait();
  candidateStore = candidateStore.filter((candidate) => candidate.id !== id);
}

export async function createCandidateStore(candidate: Candidate) {
  await wait();
  candidateStore = [candidate, ...candidateStore];
  return candidate;
}

export async function resetCandidateStore() {
  candidateStore = [...mockData.candidates];
}
