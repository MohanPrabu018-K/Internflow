import type { AssessmentTemplate, AssessmentQuestion, AssessmentType, Difficulty } from "@/types/ai";

const wait = (ms = 500) => new Promise((r) => setTimeout(r, ms));

// ─── AI Assessment Generator Service (Mock) ──────────────────────────────────

const MCQ_POOL: Record<string, AssessmentQuestion[]> = {
  Frontend: [
    { id: "fe1", text: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"], correctAnswer: "JavaScript XML", explanation: "JSX is a syntax extension for JavaScript that looks similar to XML.", points: 10 },
    { id: "fe2", text: "Which hook is used for side effects in React?", options: ["useEffect", "useState", "useContext", "useReducer"], correctAnswer: "useEffect", explanation: "useEffect lets you perform side effects in function components.", points: 10 },
    { id: "fe3", text: "What is the virtual DOM?", options: ["A lightweight copy of the real DOM", "A CSS framework", "A browser API", "A database"], correctAnswer: "A lightweight copy of the real DOM", explanation: "React creates a virtual representation of the UI to optimize updates.", points: 10 },
  ],
  Backend: [
    { id: "be1", text: "What does REST stand for?", options: ["Representational State Transfer", "Remote Execution Standard", "Resource State Transport"], correctAnswer: "Representational State Transfer", explanation: "REST is an architectural style for APIs.", points: 10 },
    { id: "be2", text: "Which HTTP method is idempotent?", options: ["GET", "POST", "PATCH"], correctAnswer: "GET", explanation: "GET requests can be made multiple times without changing the result.", points: 10 },
  ],
  "AI/ML": [
    { id: "ai1", text: "What is overfitting?", options: ["Model performs well on training but poorly on test data", "Model is too simple", "Data is missing"], correctAnswer: "Model performs well on training but poorly on test data", explanation: "Overfitting occurs when a model learns noise in the training data.", points: 10 },
  ],
};

const CODING_TEMPLATES: Record<string, AssessmentQuestion[]> = {
  Frontend: [{ id: "fc1", text: "Create a React counter component with increment, decrement, and reset buttons.", starterCode: "function Counter() {\n  // Your code here\n  return <div></div>;\n}", explanation: "Tests basic React state management.", points: 30 }],
  Backend: [{ id: "bc1", text: "Write a function that finds all prime numbers up to N using the Sieve of Eratosthenes.", starterCode: "function findPrimes(n: number): number[] {\n  // Your code here\n}", explanation: "Tests algorithmic thinking and optimization.", points: 30 }],
  "AI/ML": [{ id: "mc1", text: "Implement the sigmoid activation function and its derivative.", starterCode: "def sigmoid(x):\n    pass\n\ndef sigmoid_derivative(x):\n    pass", explanation: "Tests understanding of neural network fundamentals.", points: 30 }],
};

const SQL_QUESTIONS: AssessmentQuestion[] = [
  { id: "sql1", text: "Write a query to find the top 5 employees by salary.", starterCode: "SELECT * FROM employees\n", explanation: "Tests basic SQL ordering and limiting.", points: 20 },
  { id: "sql2", text: "Write a JOIN query to get employee names with their department names.", starterCode: "SELECT e.name, d.name\nFROM employees e\n", explanation: "Tests JOIN understanding.", points: 20 },
];

export const AssessmentGeneratorService = {
  async generate(role: string, type: AssessmentType, difficulty: Difficulty, questionCount: number): Promise<AssessmentTemplate> {
    await wait(800);
    let questions: AssessmentQuestion[] = [];

    if (type === "MCQ") {
      const pool = MCQ_POOL[role] ?? Object.values(MCQ_POOL).flat();
      questions = pool.slice(0, Math.min(questionCount, pool.length));
      if (questions.length < questionCount) {
        for (let i = questions.length; i < questionCount; i++) {
          questions.push({
            id: `${type}-${i}`,
            text: `Sample ${role} question ${i + 1}`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option A",
            explanation: `Explanation for question ${i + 1}.`,
            points: 10,
          });
        }
      }
    } else if (type === "Coding") {
      const pool = CODING_TEMPLATES[role] ?? Object.values(CODING_TEMPLATES).flat();
      questions = pool.slice(0, Math.min(questionCount, pool.length));
    } else if (type === "SQL") {
      questions = SQL_QUESTIONS.slice(0, Math.min(questionCount, SQL_QUESTIONS.length));
    } else {
      for (let i = 0; i < questionCount; i++) {
        questions.push({ id: `${type}-${i}`, text: `${role} ${type} question ${i + 1}`, explanation: `Answer explanation ${i + 1}.`, points: 10 + i * 5 });
      }
    }

    const timePerQuestion = type === "Coding" ? 10 : type === "SQL" ? 8 : 2;
    return {
      id: `asm-${Date.now()}`,
      role,
      type,
      difficulty,
      title: `${role} ${type} Assessment (${difficulty})`,
      timeLimit: questionCount * timePerQuestion,
      questions,
      generatedAt: new Date().toISOString(),
    };
  },
};
