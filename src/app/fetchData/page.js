export const fetchQuizData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  console.log(">>> Using NEXT_PUBLIC_APP_URL:", baseUrl);

  if (!baseUrl) {
    console.error(
      "FATAL ERROR: NEXT_PUBLIC_APP_URL is not defined in the environment!"
    );
    throw new Error("Application base URL is not configured.");
  }

  if (cachedQuizData) {
    return cachedQuizData;
  }
  try {
    const apiResponse = await fetch(`${baseUrl}/api/get-quiz-data`, {
      method: "GET",
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
