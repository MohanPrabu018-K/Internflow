"use client";

import { useState, useEffect } from "react";
import { Play, CheckCircle, XCircle, Clock, Code, ChevronLeft } from "lucide-react";
import { CodingEvaluatorService } from "@/services/ai/coding-evaluator.service";
import type { CodingChallenge, CodeLanguage, CodeEvaluation } from "@/types/ai";

export function CodingPlatform({ challengeId, onBack }: { challengeId: string; onBack: () => void }) {
  const [challenge, setChallenge] = useState<CodingChallenge | null>(null);
  const [language, setLanguage] = useState<CodeLanguage>("javascript");
  const [code, setCode] = useState("");
  const [evaluation, setEvaluation] = useState<CodeEvaluation | null>(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    CodingEvaluatorService.getChallenge(challengeId).then((ch) => {
      setChallenge(ch);
      if (ch) setCode(ch.starterCode.javascript);
      setLoaded(true);
    });
  }, [challengeId]);

  const handleRun = async () => {
    if (!challenge) return;
    setLoading(true);
    const result = await CodingEvaluatorService.evaluateSubmission({ challengeId, language, code, submittedAt: new Date().toISOString() });
    setEvaluation(result);
    setLoading(false);
  };

  if (!loaded) return <div className="p-6 text-sm text-slate-400">Loading...</div>;
  if (!challenge) return <div className="p-6 text-sm text-red-500">Challenge not found</div>;

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC]">
      <div className="h-14 bg-white border-b border-slate-100 flex items-center px-4 gap-3 flex-shrink-0">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100"><ChevronLeft className="w-4 h-4" /></button>
        <Code className="w-4 h-4 text-[#2563EB]" />
        <h1 className="text-sm font-semibold text-slate-900">{challenge.title}</h1>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${challenge.difficulty === "Easy" ? "bg-green-50 text-green-700" : challenge.difficulty === "Medium" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"}`}>{challenge.difficulty}</span>
        <div className="ml-auto flex items-center gap-2">
          <select value={language} onChange={(e) => { setLanguage(e.target.value as CodeLanguage); setCode(challenge.starterCode[e.target.value as CodeLanguage] ?? ""); }} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 outline-none bg-white">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="typescript">TypeScript</option>
          </select>
          <button onClick={handleRun} disabled={loading} className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5" /> {loading ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[45%] border-r border-slate-200 bg-white p-6 overflow-y-auto">
          <h2 className="text-sm font-bold text-slate-900 mb-2">{challenge.title}</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{challenge.description}</p>
          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Constraints</p>
            <ul className="space-y-1">{challenge.constraints.map((c, i) => <li key={i} className="text-xs text-slate-600 font-mono">• {c}</li>)}</ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Sample Test Cases</p>
            {challenge.testCases.filter((tc) => !tc.isHidden).map((tc) => (
              <div key={tc.id} className="bg-slate-50 rounded-lg p-3 mb-2">
                <p className="text-xs text-slate-500">Input: <code className="text-slate-900">{tc.input}</code></p>
                <p className="text-xs text-slate-500 mt-1">Output: <code className="text-slate-900">{tc.expectedOutput}</code></p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <textarea value={code} onChange={(e) => setCode(e.target.value)} className="flex-1 p-4 font-mono text-sm bg-[#1E1E2E] text-[#CDD6F4] resize-none outline-none" spellCheck={false} />
          {evaluation && (
            <div className="bg-white border-t border-slate-200 p-4 max-h-48 overflow-y-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${evaluation.passed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{evaluation.passed ? "Accepted" : "Failed"}</span>
                <span className="text-xs text-slate-500">Score: {evaluation.score}/100</span>
                <span className="text-xs text-slate-400">• {evaluation.executionTime}ms</span>
              </div>
              {evaluation.testResults.map((tr) => (
                <div key={tr.testCaseId} className="flex items-center gap-2 text-xs py-1">
                  {tr.passed ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <XCircle className="w-3.5 h-3.5 text-red-500" />}
                  <span className="text-slate-600">Test Case: {tr.input}</span>
                  {!tr.passed && <span className="text-red-500">Expected: {tr.expected}, Got: {tr.actual}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
