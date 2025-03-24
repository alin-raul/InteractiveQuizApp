export const fetchQuizData = async () => {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-quiz-data", {
      method: "GET",
      cache: "no-cache",
    });

    if (!apiResponse.ok) {
      throw new Error(`HTTP error! status: ${apiResponse.status}`);
    }

    const result = await apiResponse.json();

    return result?.data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }
};
