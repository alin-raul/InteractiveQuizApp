"use client";

import Link from "next/link";
import Image from "next/image";
import Card from "../Card.tsx";
import QuizOverview from "../add-new-quiz/AddQuiz";
import ArrowSvg from "../globals/arrow-svg";
import { useQuiz } from "@/app/context/quiz-context";

const QuizApp = () => {
  const { quizData } = useQuiz();
  console.log("quiz data", quizData);

  return (
    <div id="my-div" style={{ display: "none" }}>
      <QuizOverview />

      <div className="flex flex-col gap-20 h-full justify-around max-w-screen-xl mx-auto px-4 md:gap-6">
        <div className="flex flex-col gap-4 w-fit mx-auto flex-shrink-0 mt-28">
          <h2 className="font-bold text-5xl">Ready to challenge your brain?</h2>
          <p className="self-start ">
            Explore our diverse range of quizzes and discover new facts.
          </p>
        </div>

        <div className="flex flex-col gap-4 flex-shrink-0">
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3 sm:my-2 ">
            {quizData?.categories?.map((category) => (
              <Card
                key={category.id}
                directory={`/categories/${category.id}`}
                category={category}
              />
            ))}
            <div className="customPurple w-full h-full flex justify-center items-center rounded-3xl ">
              <Link
                href="/categories/"
                className="grid-cols-1 grid-rows-1 text-center text-2xl font-[tiny] font-black cursor-pointer "
              >
                <span className="flex items-center justify-center gap-2 px-6 py-4 hover:bg-accent-foreground/30 font-black transition-all duration-300 ease-in-out">
                  EXPLORE CATEGORIES <ArrowSvg />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
