"use server";

import type { QuizData } from "../context/quiz-context";

let cachedQuizData: QuizData | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION_MS = 10 * 60 * 1000;

type ApiResponse = {
  success: boolean;
  data?: QuizData;
  message?: string;
};

export const fetchQuizData = async (): Promise<QuizData | null> => {
  const now = Date.now();

  if (
    cachedQuizData &&
    lastFetchTime &&
    now - lastFetchTime < CACHE_DURATION_MS
  ) {
    console.log(">>> Returning cached quiz data (Server Action)");
    return cachedQuizData;
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  console.log(">>> Using NEXT_PUBLIC_APP_URL:", baseUrl);

  if (!baseUrl) {
    console.error(
      "FATAL ERROR: NEXT_PUBLIC_APP_URL is not defined in the environment!"
    );
    return null;
  }

  try {
    const apiUrl = `${baseUrl}/api/get-quiz-data`;
    console.log(">>> Attempting fetch (Server Action):", apiUrl);

    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      cache: "no-store",
    });

    console.log(
      ">>> Fetch response status (Server Action):",
      apiResponse.status
    );

    if (!apiResponse.ok) {
      const errorText = await apiResponse
        .text()
        .catch(() => "Could not read error response body");
      console.error(
        "Fetch failed! Status:",
        apiResponse.status,
        "Body:",
        errorText
      );
      throw new Error(`HTTP error! status: ${apiResponse.status}`);
    }

    const result: ApiResponse = await apiResponse.json();

    if (!result.success || !result.data) {
      console.error(
        "API call was not successful or data missing (Server Action):",
        result.message || "No message provided"
      );
      throw new Error(
        result.message || "API returned unsuccessful status or missing data."
      );
    }

    console.log(">>> Successfully fetched quiz data (Server Action)");
    cachedQuizData = result.data;
    lastFetchTime = Date.now();

    return cachedQuizData;
  } catch (error) {
    console.error(">>> Error fetching quiz data (Server Action):", error);

    throw error;
  }
};
