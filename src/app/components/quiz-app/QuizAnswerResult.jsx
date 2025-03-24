import MyButton from "../Button";
import { MdNavigateNext } from "react-icons/md";

export default function QuizAnswerResult({
  isAnswerCorrect,
  handleNextQuestion,
  backgroundColor,
  currentIndex,
  categoryId,
  subcategoryId,
}) {
  return (
    <div className="flex justify-between items-center gap-2 mt-10">
      <h1
        className={`text-2xl border-2 p-2 rounded-lg font-extralight drop-shadow-md ${
          isAnswerCorrect
            ? "border-green-600 bg-green-600/20"
            : "border-red-600 bg-red-600/20"
        } h-full`}
      >
        <span className="font-semibold">
          {isAnswerCorrect ? "Great!" : "Incorrect 😝"}
        </span>
        {isAnswerCorrect ? " Keep it up 🤩" : ""}
      </h1>
      <MyButton
        path={`/categories/${categoryId}/${subcategoryId + "-quiz"}/${
          currentIndex + 1
        }/`}
        buttonText={"Next"}
        onClick={handleNextQuestion}
        style={backgroundColor}
        shadow={"shadow-2xl"}
        glow={
          "transition-transform duration-300 hover:shadow-yellow-400 hover:shadow-[0_0_10px] hover:scale-105"
        }
        icon={<MdNavigateNext />}
        iconSize={34}
      />
    </div>
  );
}
