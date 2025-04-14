import type { QuizData } from "../context/quiz-context";

let cachedQuizData: QuizData | null = null;

export const fetchQuizData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (cachedQuizData) {
    return cachedQuizData;
  }
  try {
    const apiResponse = await fetch(`${baseUrl}/api/get-quiz-data`, {
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
