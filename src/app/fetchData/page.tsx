import type { QuizData } from "../context/quiz-context";

let cachedQuizData: QuizData | null = null;

export const fetchQuizData = async () => {
  if (cachedQuizData) {
    return cachedQuizData;
  }
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-quiz-data", {
      method: "GET",
      cache: "no-cache",
    });

    if (!apiResponse.ok) {
      throw new Error(`HTTP error! status: ${apiResponse.status}`);
    }

    const result = await apiResponse.json();
    cachedQuizData = result?.data;

    return cachedQuizData;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    throw error;
  }
};
