import { fetchQuizData } from "./fetchData/page";
import QuizApp from "./components/quiz-app/QuizApp";

type Subcategory = {
  _id: string;
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  subcategories: Subcategory[];
};

type Question = {
  question: string;
  answer: string;
  alternatives: string[];
  _id: string;
};

type QuizCategory = {
  id: string;
  name: string;
  questions: Question[];
};

export type QuizData = {
  categories: Category[];
  quizCategories: QuizCategory[];
};

const homepage = async () => {
  const quizData: QuizData = await fetchQuizData();

  return (
    <div>
      <QuizApp quizData={quizData} />
    </div>
  );
};

export default homepage;
