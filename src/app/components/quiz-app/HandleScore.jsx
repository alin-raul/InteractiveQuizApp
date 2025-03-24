"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ClientQuiz from "./ClientQuiz";

const HandleScore = ({
  quizIndex,
  quizQuestions,
  categoryId,
  initialScore,
}) => {
  const [score, setScore] = useState(() => {
    const cookieScore = Cookies.get("quizScore");
    return cookieScore ? Number(cookieScore) : initialScore;
  });

  useEffect(() => {
    Cookies.set("quizScore", score);
  }, [score]);

  return (
    <div className="bg-black/20">
      <div className="m-auto max-w-screen-xl">
        <ClientQuiz
          questions={quizQuestions.questions}
          categoryId={categoryId}
          subcategoryId={quizQuestions.id}
          quizCategory={quizQuestions.name}
          quizIndex={quizIndex}
          score={score}
          setScore={setScore}
        />
      </div>
    </div>
  );
};

export default HandleScore;
