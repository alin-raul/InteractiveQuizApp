"use client";

import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";
import Navbar from "../Navbar";
import Results from "./Results";
import QuizCard from "../QuizCard";
import QuizAnswerResult from "./QuizAnswerResult";
import RandomColorSetter from "../utils/RandomColorSetter";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const ClientQuiz = ({
  questions,
  categoryId,
  subcategoryId,
  quizIndex,
  quizCategory,
  score,
  setScore,
}) => {
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(Number(quizIndex));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  useEffect(() => {
    const shuffledData = questions.map((quiz) => {
      const { backgroundColor } = RandomColorSetter(quiz._id);
      return {
        ...quiz,
        shuffledAnswers: shuffleArray([quiz.answer, ...quiz.alternatives]),
        backgroundColor,
      };
    });
    setQuizData(shuffledData);
  }, [questions]);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer) {
      setSelectedAnswer(selectedAnswer);

      if (selectedAnswer === quizData[currentIndex]?.answer) {
        setIsAnswerCorrect(true);
        setScore((prevScore) => prevScore + 1);
      } else {
        setIsAnswerCorrect(false);
      }
    }
  };

  const handleNextQuestion = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < quizData.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  const currentQuiz = quizData[currentIndex];

  if (currentIndex >= quizData.length) {
    return (
      <Results
        score={score}
        quizData={quizData}
        categoryId={categoryId}
        subcategoryId={subcategoryId}
      />
    );
  }

  return (
    <div>
      <Navbar links={[{ name: "See solutions?", href: "/solutions" }]} />
      <div className="m-auto h-screen flex flex-col justify-center">
        <div className="max-w-screen-md m-auto w-screen">
          <div
            className={`absolute bottom-2 left-7 p-4 rounded-3xl text-center mb-6 bg-teal-500 text-violet-950 ${
              score === 0 ? "hidden" : ""
            }`}
          >
            <h2 className="text-2xl font-bold">
              {score === 0
                ? null
                : score === 1
                ? `${score} point of ${quizData.length}`
                : `${score} points / ${quizData.length}`}
            </h2>
          </div>

          <QuizCard
            key={currentIndex}
            currentIndex={currentIndex}
            selectedAnswer={selectedAnswer}
            handleAnswerClick={handleAnswerClick}
            currentQuiz={currentQuiz}
            quizCategory={quizCategory}
          ></QuizCard>

          {isAnswerCorrect !== null && (
            <QuizAnswerResult
              backgroundColor={currentQuiz.backgroundColor}
              isAnswerCorrect={isAnswerCorrect}
              handleNextQuestion={handleNextQuestion}
              currentIndex={currentIndex}
              categoryId={categoryId}
              subcategoryId={subcategoryId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientQuiz;
