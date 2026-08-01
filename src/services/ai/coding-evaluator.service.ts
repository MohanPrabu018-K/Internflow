import type { CodingChallenge, CodeEvaluation, CodeSubmission, CodeLanguage } from "@/types/ai";

const wait = (ms = 500) => new Promise((r) => setTimeout(r, ms));

// ─── Coding Evaluator Service (Mock) ─────────────────────────────────────────

const CHALLENGES: CodingChallenge[] = [
  {
    id: "ch-1",
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
    difficulty: "Easy",
    languages: ["javascript", "python", "java", "cpp"],
    starterCode: {
      javascript: "function twoSum(nums, target) {\n  // Write your solution here\n}",
      python: "def two_sum(nums, target):\n    # Write your solution here\n    pass",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n    }\n}",
      cpp: "vector<int> twoSum(vector<int>& nums, int target) {\n    // Write your solution here\n}",
      typescript: "function twoSum(nums: number[], target: number): number[] {\n  // Write your solution here\n}",
    },
    testCases: [
      { id: "t1", input: "[2,7,11,15], 9", expectedOutput: "[0,1]", isHidden: false },
      { id: "t2", input: "[3,2,4], 6", expectedOutput: "[1,2]", isHidden: false },
      { id: "t3", input: "[3,3], 6", expectedOutput: "[0,1]", isHidden: true },
    ],
    timeLimit: 30,
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
  },
  {
    id: "ch-2",
    title: "Palindrome Check",
    description: "Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.",
    difficulty: "Easy",
    languages: ["javascript", "python", "java"],
    starterCode: {
      javascript: "function isPalindrome(x) {\n  // Write your solution here\n}",
      python: "def is_palindrome(x):\n    # Write your solution here\n    pass",
      java: "class Solution {\n    public boolean isPalindrome(int x) {\n        // Write your solution here\n    }\n}",
      cpp: "",
      typescript: "function isPalindrome(x: number): boolean {\n  // Write your solution here\n}",
    },
    testCases: [
      { id: "t1", input: "121", expectedOutput: "true", isHidden: false },
      { id: "t2", input: "-121", expectedOutput: "false", isHidden: false },
      { id: "t3", input: "10", expectedOutput: "false", isHidden: true },
    ],
    timeLimit: 20,
    constraints: ["-2^31 <= x <= 2^31 - 1"],
  },
];

export const CodingEvaluatorService = {
  async getChallenges(): Promise<CodingChallenge[]> {
    await wait(200);
    return CHALLENGES;
  },

  async getChallenge(id: string): Promise<CodingChallenge | null> {
    await wait(200);
    return CHALLENGES.find((c) => c.id === id) ?? null;
  },

  async evaluateSubmission(submission: CodeSubmission): Promise<CodeEvaluation> {
    await wait(1000);
    const challenge = CHALLENGES.find((c) => c.id === submission.challengeId);
    if (!challenge) throw new Error("Challenge not found");

    const codeLength = submission.code.length;
    const passedCount = codeLength > 50 ? challenge.testCases.length : codeLength > 20 ? Math.ceil(challenge.testCases.length / 2) : 1;
    const score = Math.round((passedCount / challenge.testCases.length) * 100);

    return {
      passed: passedCount === challenge.testCases.length,
      score,
      testResults: challenge.testCases.map((tc, i) => ({
        testCaseId: tc.id,
        passed: i < passedCount,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: i < passedCount ? tc.expectedOutput : "[Error: Wrong output]",
        executionTime: Math.round(2 + i * 1.5),
      })),
      executionTime: Math.round(10 + codeLength * 0.5),
      plagiarismScore: codeLength > 100 ? 5 : 15,
      feedback: score >= 80 ? "Excellent solution! All test cases passed." : score >= 50 ? "Good attempt. Some test cases failed. Review edge cases." : "Needs improvement. Practice more problems.",
    };
  },
};
