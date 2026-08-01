"use client";

import { useEffect, useMemo, useState } from "react";
import type { Candidate } from "@/types/internflow";
import type { CandidateFilterState } from "@/types/candidate-management";
import { CandidateService } from "@/services/api/candidate.service";

const defaultFilters: CandidateFilterState = {
  search: "",
  department: "All",
  college: "All",
  stage: "All",
  year: "All",
  cgpa: "",
  experience: "All",
  sortBy: "name",
  sortOrder: "asc",
  page: 1,
  pageSize: 10,
};

export function useCandidateManagement(initialCandidateId?: number) {
  const [state, setState] = useState({
    candidates: [] as Candidate[],
    total: 0,
    loading: true,
    error: null as string | null,
  });
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    let active = true;
    CandidateService.getCandidates(filters)
      .then((res) => {
        if (!active) return;
        setState({ candidates: res.data, total: res.data.length, loading: false, error: null });
      })
      .catch((error: Error) => {
        if (!active) return;
        setState((prev) => ({ ...prev, loading: false, error: error.message }));
      });
    return () => {
      active = false;
    };
  }, [filters]);

  useEffect(() => {
    if (!initialCandidateId) return;
    CandidateService.getCandidateById(initialCandidateId).then((res) => setCandidate(res.data));
  }, [initialCandidateId]);

  const paginated = useMemo(() => {
    const start = (filters.page - 1) * filters.pageSize;
    return state.candidates.slice(start, start + filters.pageSize);
  }, [filters.page, filters.pageSize, state.candidates]);

  return {
    state,
    filters,
    setFilters,
    selectedIds,
    setSelectedIds,
    paginated,
    candidate,
    setCandidate,
    refresh: async () => {
      const res = await CandidateService.getCandidates(filters);
      setState({ candidates: res.data, total: res.data.length, loading: false, error: null });
    },
  };
}
