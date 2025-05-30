import MyButton from "@/app/components/Button";
import { TbReload } from "react-icons/tb";
import Cookies from "js-cookie";

const Results = ({ score, quizData, categoryId, subcategoryId }) => {
  if (quizData.length === 0) {
    return null;
  }
  const isPassed = score > quizData.length / 2;

  return (
    <div className="max-w-screen-md m-auto flex flex-col h-screen justify-center items-center gap-40">
      <div className="flex flex-col justify-between bg-accent/40 h-[600px] p-8">
        {isPassed ? (
          <div className="p-4 border-2 bg-green-600/20 border-green-600/60">
            <p className="text-5xl font-[tiny] text-center mt-16 mb-2">
              ✨Congratulations!✨
            </p>
            <p className="text-center text-2xl mb-16">
              You have completed the quiz and passed!
            </p>
            <p className="text-center text-2xl font-semibold drop-shadow-lg">
              Keep up the great work! Your hard work is paying off! 🎉
            </p>
          </div>
        ) : (
          <div className="p-4 border-2 bg-red-600/20 border-red-600/20">
            <p className="font-bold text-5xl text-center mt-16 font-[tiny]">
              Better luck next time! 😟
            </p>
            <p className="text-center text-xl mb-16 font-[tiny]">
              You have completed the quiz but did not score enough to pass.
            </p>
            <p className="text-xl font-normal font-[tiny]">
              Remember, practice makes perfect! Check out the solutions section
              to learn from your mistakes. 📚
            </p>
          </div>
        )}
        <p className="text-center text-5xl font-bold font-[tiny]">
          Your final score: {score} / {quizData.length}
        </p>
        <div className="flex justify-around">
          <MyButton
            onClick={() => Cookies.set("quizScore", 0)}
            path={`/categories/${categoryId}/${subcategoryId + "-quiz"}/${0}`}
            buttonText={"RETRY"}
            icon={<TbReload />}
          />
          <MyButton
            onClick={() => Cookies.set("quizScore", 0)}
            path={`/`}
            buttonText={"GO HOME"}
          />
          <MyButton
            onClick={() => Cookies.set("quizScore", 0)}
            path={`/categories`}
            buttonText={"CATEGORIES"}
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
