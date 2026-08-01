"use client";

import { useEffect, useState } from "react";
import {
  Award,
  CheckCircle,
  ClipboardCheck,
  Edit,
  Eye,
  FileText,
  GraduationCap,
  Globe,
  Github,
  Linkedin,
  MapPin,
  Phone,
  RefreshCw,
  Trash2,
  Upload,
  XCircle,
  CalendarDays,
} from "lucide-react";
import type { Candidate, Stage } from "@/types/internflow";
import { CandidateService } from "@/services/api/candidate.service";
import { CANDIDATE_PROFILE_TABS, CANDIDATE_RATING_BREAKDOWN, CANDIDATE_TIMELINE_TEMPLATE } from "@/lib/candidate-profile.constants";
import { AvatarCircle, StageBadge, StarRating } from "@/components/shared/candidate-primitives";
import { ResumeScreeningService } from "@/services/ai/resume-screening.service";
import { ResumeParserService } from "@/services/ai/resume-parser.service";
import { SkillBadgesService } from "@/services/ai/skill-badges.service";
import { Sparkles, Check, AlertTriangle, Brain } from "lucide-react";
import type { ResumeAnalysis, SkillBadge } from "@/types/ai";

export function CandidateProfileView({ candidate: initialCandidate, onBack }: { candidate: Candidate; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<(typeof CANDIDATE_PROFILE_TABS)[number]>("overview");
  const [candidate, setCandidate] = useState<Candidate>(initialCandidate);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState(initialCandidate.notes);
  const [recruiterNotesDraft, setRecruiterNotesDraft] = useState(initialCandidate.recruiterNotes ?? "");
  const [internalNotesDraft, setInternalNotesDraft] = useState(initialCandidate.internalNotes ?? "");
  // AI state
  const [aiAnalysis, setAiAnalysis] = useState<ResumeAnalysis | null>(null);
  const [aiBadges, setAiBadges] = useState<SkillBadge[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const runAiAnalysis = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const [analysis, _parsed, badges] = await Promise.all([
        ResumeScreeningService.analyzeResume(candidate.resumeFileName ?? `${candidate.name}.pdf`, candidate.role),
        ResumeParserService.parseResume(candidate.id),
        SkillBadgesService.getBadges(candidate),
      ]);
      setAiAnalysis(analysis);
      setAiBadges(badges);
    } catch (e) {
      setAiError((e as Error).message);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    CandidateService.getCandidateById(initialCandidate.id).then((res) => {
      if (!active) return;
      if (res.data) {
        setCandidate(res.data);
        setNotesDraft(res.data.notes);
        setRecruiterNotesDraft(res.data.recruiterNotes ?? "");
        setInternalNotesDraft(res.data.internalNotes ?? "");
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [initialCandidate.id]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (loading) return;
      void CandidateService.updateCandidate(candidate.id, {
        notes: notesDraft,
        recruiterNotes: recruiterNotesDraft,
        internalNotes: internalNotesDraft,
      }).then((res) => {
        if (res.data) setCandidate(res.data);
      });
    }, 600);
    return () => window.clearTimeout(timer);
  }, [candidate.id, internalNotesDraft, loading, notesDraft, recruiterNotesDraft]);

  const refreshCandidate = async () => {
    const res = await CandidateService.getCandidateById(candidate.id);
    if (res.data) setCandidate(res.data);
  };

  const saveStage = async (stage: Stage) => {
    setSaving(true);
    const res = await CandidateService.updateStage(candidate.id, stage);
    if (res.data) setCandidate(res.data);
    setSaving(false);
  };

  const saveRating = async (value: number) => {
    setSaving(true);
    const res = await CandidateService.rateCandidate(candidate.id, value);
    if (res.data) setCandidate(res.data);
    setSaving(false);
  };

  const handleResumeUpload = async (fileName: string) => {
    if (!fileName.toLowerCase().endsWith(".pdf")) {
      setMessage("Only PDF resumes are supported in the mock flow.");
      return;
    }
    setSaving(true);
    await CandidateService.uploadResume(candidate.id, fileName);
    setMessage("Resume uploaded successfully.");
    await refreshCandidate();
    setSaving(false);
  };

  const handleDeleteResume = async () => {
    setSaving(true);
    await CandidateService.deleteResume(candidate.id);
    setMessage("Resume removed.");
    await refreshCandidate();
    setSaving(false);
  };

  const timeline = candidate.timeline?.length ? candidate.timeline : CANDIDATE_TIMELINE_TEMPLATE;
  const averageRating = candidate.averageRating ?? candidate.rating;

  const profileFields = [
    { label: "Email", value: candidate.email },
    { label: "Phone", value: candidate.phone },
    { label: "College", value: candidate.college },
    { label: "Department", value: candidate.department },
    { label: "Year", value: candidate.year },
    { label: "CGPA", value: String(candidate.cgpa) },
    { label: "Experience", value: candidate.experience },
    { label: "Applied Date", value: candidate.appliedDate },
    { label: "Portfolio", value: candidate.portfolio ?? "Not provided" },
    { label: "GitHub", value: candidate.github },
    { label: "LinkedIn", value: candidate.linkedin },
    { label: "Assigned Recruiter", value: candidate.assignedRecruiter ?? candidate.recruiter },
    { label: "Current Stage", value: candidate.stage },
  ];

  return (
    <div className="p-6 flex gap-5" style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="flex-1 min-w-0 space-y-5">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-start gap-5">
            <AvatarCircle initials={candidate.initials} color={candidate.color} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{candidate.name}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{candidate.role}</p>
                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      {candidate.college}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {candidate.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StageBadge stage={candidate.stage} />
                  <button onClick={onBack} className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">
                    Back
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                {candidate.github && (
                  <a href={`https://${candidate.github}`} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors" target="_blank" rel="noreferrer">
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                )}
                {candidate.linkedin && (
                  <a href={`https://${candidate.linkedin}`} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors" target="_blank" rel="noreferrer">
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                )}
                {candidate.portfolio && (
                  <a href={`https://${candidate.portfolio}`} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors" target="_blank" rel="noreferrer">
                    <Globe className="w-3.5 h-3.5" />
                    Portfolio
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-100">
            {CANDIDATE_PROFILE_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3.5 text-sm font-medium transition-colors capitalize ${activeTab === tab ? "text-[#2563EB] border-b-2 border-[#2563EB] bg-blue-50/40" : "text-slate-500 hover:text-slate-800"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="p-6 space-y-3">
              <div className="h-5 w-40 bg-slate-100 rounded" />
              <div className="h-24 bg-slate-50 rounded-xl" />
              <div className="h-24 bg-slate-50 rounded-xl" />
            </div>
          ) : (
            <>
              {activeTab === "overview" && (
                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Personal Information</p>
                    <div className="grid grid-cols-2 gap-4">
                      {profileFields.map((field) => (
                        <div key={field.label}>
                          <p className="text-xs text-slate-400 mb-0.5">{field.label}</p>
                          <p className="text-sm font-medium text-slate-900 break-words">{field.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <span key={skill} className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Projects</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {(candidate.projects ?? []).map((project) => (
                        <div key={project} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <p className="text-sm font-semibold text-slate-900">{project}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Education</p>
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                      <div className="w-9 h-9 bg-white rounded-xl border border-slate-200 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{candidate.college}</p>
                        <p className="text-xs text-slate-500">{candidate.department} · {candidate.year}</p>
                        <p className="text-xs text-slate-400 mt-0.5">CGPA: {candidate.cgpa} / 10</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "resume" && (
                <div className="p-6 space-y-4">
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    id={`resume-upload-${candidate.id}`}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      void handleResumeUpload(file.name);
                    }}
                  />
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-8 flex flex-col items-center justify-center" style={{ minHeight: 400 }}>
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                      <FileText className="w-8 h-8 text-red-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700 mb-1">{candidate.resumeFileName ?? `${candidate.name} - Resume.pdf`}</p>
                    <p className="text-xs text-slate-400 mb-5">
                      Uploaded {candidate.resumeUploadedAt ? new Date(candidate.resumeUploadedAt).toLocaleDateString() : candidate.appliedDate}
                      {" "}· {candidate.resumeMimeType === "application/pdf" || candidate.resumeFileName ? "1.2 MB" : "Pending"}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap justify-center">
                      <button onClick={() => document.getElementById(`resume-upload-${candidate.id}`)?.click()} className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload Resume
                      </button>
                      <button onClick={() => document.getElementById(`resume-upload-${candidate.id}`)?.click()} className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                        <RefreshCw className="w-4 h-4" />
                        Replace Resume
                      </button>
                      <button onClick={() => void handleDeleteResume()} className="inline-flex items-center gap-2 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                        <Trash2 className="w-4 h-4" />
                        Delete Resume
                      </button>
                      {candidate.resumePreviewUrl && (
                        <a href={candidate.resumePreviewUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                          <Eye className="w-4 h-4" />
                          Download Resume
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-4">Validation: PDF only, mock upload flow enabled.</p>
                  </div>
                  {candidate.resumePreviewUrl && (
                    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                      <iframe title="Resume preview" src={candidate.resumePreviewUrl} className="w-full h-[520px]" />
                    </div>
                  )}
                </div>
              )}

              {activeTab === "assessments" && (
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="border border-slate-100 rounded-xl p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{candidate.role} Assessment</p>
                          <p className="text-xs text-slate-400 mt-0.5">Service-driven mock workflow</p>
                        </div>
                        <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">Submitted</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(100, Math.round((candidate.rating / 5) * 100))}%` }} />
                        </div>
                        <span className="text-sm font-bold text-slate-900">{Math.round((candidate.rating / 5) * 100)} / 100</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "timeline" && (
                <div className="p-6">
                  <div className="relative">
                    <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-100" />
                    <div className="space-y-5">
                      {timeline.map((item, i) => (
                        <div key={`${item.event}-${i}`} className="flex items-start gap-4 relative pl-2">
                          <div className={`w-8 h-8 rounded-xl ${item.status === "completed" ? "bg-[#2563EB]" : "bg-slate-300"} flex items-center justify-center flex-shrink-0 z-10`}>
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <div className="pt-1">
                            <p className="text-sm font-medium text-slate-900">{item.event}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ai-analysis" && (
                <div className="p-6">
                  {!aiAnalysis && !aiLoading && (
                    <div className="text-center py-8">
                      <Brain className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-slate-500 mb-1">AI Resume Analysis</p>
                      <p className="text-xs text-slate-400 mb-4">Analyze this candidate&rsquo;s resume for {candidate.role}</p>
                      <button onClick={runAiAnalysis} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold px-5 py-2.5 rounded-xl inline-flex items-center gap-2"><Sparkles className="w-4 h-4" />Run AI Analysis</button>
                    </div>
                  )}
                  {aiLoading && <div className="text-center py-8"><div className="w-10 h-10 border-4 border-blue-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-3" /><p className="text-sm text-slate-400">Analyzing resume...</p></div>}
                  {aiError && <div className="bg-red-50 rounded-xl p-4 flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /><div><p className="text-sm font-semibold text-red-700">Analysis failed</p><p className="text-xs text-red-600 mt-0.5">{aiError}</p></div></div>}
                  {aiAnalysis && (
                    <div className="space-y-5">
                      <div className="flex items-center gap-3">
                        <div className={`text-3xl font-extrabold ${aiAnalysis.matchScore.overall >= 80 ? "text-green-600" : aiAnalysis.matchScore.overall >= 60 ? "text-amber-600" : "text-red-600"}`}>{aiAnalysis.matchScore.overall}%</div>
                        <div><p className="text-sm font-semibold text-slate-900">Overall Match</p><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${aiAnalysis.matchScore.overall >= 80 ? "bg-green-50 text-green-700" : aiAnalysis.matchScore.overall >= 60 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"}`}>{aiAnalysis.recommendation}</span></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[{ label: "Skills Match", val: aiAnalysis.matchScore.skillsMatch }, { label: "Education", val: aiAnalysis.matchScore.educationMatch }, { label: "Experience", val: aiAnalysis.matchScore.experienceMatch }, { label: "Overall Fit", val: aiAnalysis.matchScore.overallFit }].map((m) => (
                          <div key={m.label} className="bg-slate-50 rounded-xl p-3"><div className="flex justify-between text-xs text-slate-500 mb-1"><span>{m.label}</span><span className="font-bold">{m.val}%</span></div><div className="bg-slate-200 rounded-full h-2"><div className="bg-[#2563EB] h-2 rounded-full" style={{ width: `${m.val}%` }} /></div></div>
                        ))}
                      </div>
                      <div><p className="text-xs font-semibold text-slate-400 uppercase mb-2">Matching Skills</p><div className="flex flex-wrap gap-1.5">{aiAnalysis.matchingSkills.map((s) => <span key={s} className="text-xs bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full"><Check className="w-3 h-3 inline mr-1" />{s}</span>)}</div></div>
                      <div><p className="text-xs font-semibold text-slate-400 uppercase mb-2">Missing Skills</p><div className="flex flex-wrap gap-1.5">{aiAnalysis.missingSkills.map((s) => <span key={s.name} className={`text-xs px-2.5 py-1 rounded-full border ${s.importance === "critical" ? "bg-red-50 text-red-700 border-red-100" : "bg-amber-50 text-amber-700 border-amber-100"}`}>{s.name}</span>)}</div></div>
                      {aiBadges.length > 0 && (
                        <div><p className="text-xs font-semibold text-slate-400 uppercase mb-2">Skill Badges</p><div className="flex flex-wrap gap-2">{aiBadges.map((b) => <span key={b.name} className={`text-xs font-medium text-white px-3 py-1.5 rounded-full ${b.color}`}>{b.icon} {b.name}</span>)}</div></div>
                      )}
                      <div className="bg-slate-50 rounded-xl p-4"><p className="text-xs font-semibold text-slate-400 uppercase mb-1">AI Summary</p><p className="text-sm text-slate-600">{aiAnalysis.summary}</p></div>
                      <button onClick={runAiAnalysis} className="text-xs text-[#2563EB] hover:text-blue-800 flex items-center gap-1"><RefreshCw className="w-3 h-3" />Re-run Analysis</button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="w-72 flex-shrink-0 space-y-4">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Stage Actions</p>
          <div className="space-y-2">
            <button onClick={() => void saveStage("Screening")} className="w-full flex items-center gap-3 text-sm font-medium text-white bg-green-500 hover:bg-green-600 px-4 py-2.5 rounded-xl transition-colors">
              <CheckCircle className="w-4 h-4" />
              Approve Resume
            </button>
            <button onClick={() => void saveStage("New")} className="w-full flex items-center gap-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-colors">
              <XCircle className="w-4 h-4" />
              Reject Resume
            </button>
            <button onClick={() => void saveStage("Assessment")} className="w-full flex items-center gap-3 text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2.5 rounded-xl transition-colors">
              <ClipboardCheck className="w-4 h-4" />
              Assign Assessment
            </button>
            <button onClick={() => void saveStage("Interview")} className="w-full flex items-center gap-3 text-sm font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 px-4 py-2.5 rounded-xl transition-colors">
              <CalendarDays className="w-4 h-4" />
              Schedule Interview
            </button>
            <button onClick={() => void saveStage("Offer Sent")} className="w-full flex items-center gap-3 text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 px-4 py-2.5 rounded-xl transition-colors">
              <Award className="w-4 h-4" />
              Generate Offer Letter
            </button>
            <button onClick={() => void CandidateService.updateCandidate(candidate.id, { archived: true }).then(refreshCandidate)} className="w-full flex items-center gap-3 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-xl transition-colors">
              <Trash2 className="w-4 h-4" />
              Archive Candidate
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Recruiter Rating</p>
            <button onClick={() => void saveRating(Math.min(5, Number((candidate.rating + 0.5).toFixed(1))))} className="text-xs text-[#2563EB] font-medium">
              Edit
            </button>
          </div>
          <StarRating rating={candidate.rating} />
          <div className="mt-3 space-y-2">
            {CANDIDATE_RATING_BREAKDOWN.map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>{row.label}</span>
                  <span className="font-medium">{row.val}%</span>
                </div>
                <div className="bg-slate-100 rounded-full h-1.5">
                  <div className="bg-[#2563EB] h-1.5 rounded-full transition-all" style={{ width: `${row.val}%` }} />
                </div>
              </div>
            ))}
            <p className="text-xs text-slate-400 pt-2">Average rating: {averageRating.toFixed(1)}</p>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Recruiter Notes</p>
            <button className="text-slate-300 hover:text-slate-500 transition-colors">
              <Edit className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea value={recruiterNotesDraft} onChange={(event) => setRecruiterNotesDraft(event.target.value)} className="w-full min-h-24 resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none focus:border-[#2563EB]" />
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <div className="w-6 h-6 bg-[#2563EB] rounded-lg flex items-center justify-center text-white text-[10px] font-bold">PK</div>
            <span className="text-xs text-slate-400">{candidate.recruiter}</span>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Assigned To</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563EB] rounded-xl flex items-center justify-center text-white text-xs font-bold">PK</div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{candidate.assignedRecruiter ?? candidate.recruiter}</p>
              <p className="text-xs text-slate-400">Lead Recruiter</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Internal Notes</p>
            <textarea value={internalNotesDraft} onChange={(event) => setInternalNotesDraft(event.target.value)} className="w-full min-h-24 resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none focus:border-[#2563EB]" />
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Profile Notes</p>
            <textarea value={notesDraft} onChange={(event) => setNotesDraft(event.target.value)} className="w-full min-h-24 resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none focus:border-[#2563EB]" />
          </div>
          {message && <p className="mt-3 text-xs text-slate-500">{message}</p>}
          {saving && <p className="mt-2 text-xs text-[#2563EB]">Saving changes...</p>}
        </div>
      </div>
    </div>
  );
}

