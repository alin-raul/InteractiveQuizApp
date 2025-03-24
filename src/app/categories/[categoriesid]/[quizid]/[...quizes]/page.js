import { fetchQuizData } from "@/app/fetchData/page";
import HandleScore from "@/app/components/quiz-app/HandleScore";

const QuizPage = async ({ params }) => {
  const data = await fetchQuizData();
  console.log(params);

  const categoryId = params.categoriesid;
  const rawQuizId = params.quizid;
  const quizId = rawQuizId.split("-")[0];

  const quizQuestions = data.quizCategories.find((quiz) => quiz.id === quizId);
  console.log(quizQuestions);

  if (!quizQuestions || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Quiz not found</h1>
      </div>
    );
  }

  const quizIndex = params.quizes;
  const initialScore = 0;

  return (
    <HandleScore
      data={data}
      quizIndex={quizIndex}
      quizQuestions={quizQuestions}
      categoryId={categoryId}
      initialScore={initialScore}
    />
  );
};

export default QuizPage;
