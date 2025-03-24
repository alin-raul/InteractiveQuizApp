function QuizCard({
  currentQuiz,
  currentIndex,
  quizCategory,
  selectedAnswer,
  handleAnswerClick,
}) {
  const getOrdinalParts = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    const suffix = s[(v - 20) % 10] || s[v] || s[0];
    return { number: n, suffix };
  };

  const ordinal = getOrdinalParts(currentIndex + 1);

  return (
    <div
      className="rounded-3xl shadow-md text-lg p-6 my-4"
      style={{
        backgroundColor: currentQuiz.backgroundColor || "rgba(0, 0, 0, 0.4)",
      }}
    >
      <h1 className="text-2xl mb-4 w-fit font-bold drop-shadow-md ">
        <span>{ordinal.number}</span>
        <span className="text-sm align-super ml-1 font-normal tracking-wide">
          {ordinal.suffix}
        </span>
        <span className=" ml-2 ">{`${quizCategory.toLowerCase()}`}</span>
        <span className=""> Quiz</span>
      </h1>
      <hr />
      <p className="font-semibold text-xl drop-shadow-md mt-8">
        {currentQuiz.question}
      </p>
      <div>
        <div className="flex flex-col">
          <ol className="my-2 drop-shadow-md">
            {currentQuiz.shuffledAnswers.map((answer, answerIndex) => (
              <li
                key={answerIndex}
                className={`text-white/60 drop-shadow-md cursor-pointer p-2 rounded-md border-2 my-3
                          border-white/60 hover:bg-black/10 hover:text-white ${
                            selectedAnswer ? "pointer-events-none" : ""
                          }`}
                onClick={() => handleAnswerClick(answer)}
              >
                {answer}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
