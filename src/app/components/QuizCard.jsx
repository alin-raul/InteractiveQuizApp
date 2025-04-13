function QuizCard({
  currentQuiz,
  currentIndex,
  quizCategory,
  selectedAnswer,
  handleAnswerClick,
}) {
  return (
    <div className="text-lg py-12 px-8 my-5 rounded-[3rem] bg-accent-foreground">
      <h1 className="text-xl mb-4 w-fit font-bold text-accent/60">
        <span>
          QUESTION {currentIndex + 1} OF {quizCategory.length}
        </span>
      </h1>
      <hr />
      <p className="font-bold text-accent text-xl mt-8 mb-4">
        {currentQuiz.question}
      </p>
      <div>
        <div className="flex flex-col">
          <ol className="my-2">
            {currentQuiz.shuffledAnswers.map((answer, answerIndex) => (
              <li
                key={answerIndex}
                className={`text-accent/80 cursor-pointer p-2 border my-4 rounded-2xl border-accent/60 hover:bg-[#5f56d6] hover:text-accent-foreground ${
                  selectedAnswer ? "pointer-events-none" : ""
                }`}
                onClick={() => handleAnswerClick(answer)}
              >
                <span className="font-normal ml-4 text-2xl">{answer}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
