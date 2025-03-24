"use client";

import Link from "next/link";
import Image from "next/image";
import Card from "../Card";
import QuizOverview from "../add-new-quiz/AddQuiz";
import ArrowSvg from "../globals/arrow-svg";

const QuizApp = ({ quizData }) => {
  console.log("quiz data", quizData);

  return (
    <div id="my-div" style={{ display: "none" }}>
      <QuizOverview quizData={quizData} />

      <div className="flex flex-col gap-20 justify-around max-w-screen-xl mx-auto px-4 md:gap-6 md:h-screen ">
        <div className="flex flex-col ">
          <div className="flex justify-center items-center h-fit ">
            <div className="">
              <Image
                src="/logo/nextquiz.webp"
                alt="logo quiz"
                width={200}
                height={200}
                priority
                className="w-auto h-auto"
                draggable="false"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-fit mx-auto flex-shrink-0">
          <h2 className="font-bold text-5xl font-[tiny]">
            Ready to challenge your brain?
          </h2>
          <p className="self-start ">
            Explore our diverse range of quizzes and discover new facts.
          </p>
        </div>

        <div className="flex flex-col gap-4 flex-shrink-0">
          <div className="grid grid-cols-1 gap-4 bg-black/20 p-4 md:grid-cols-2 lg:grid-cols-3 sm:my-2 ">
            {quizData?.categories?.map((category) => (
              <Card
                key={category.id}
                directory={`/categories/${category.id}`}
                category={category}
              />
            ))}
            <div className="w-full h-full bg-accent/50 flex justify-center items-center">
              <Link
                href="/categories/"
                className="grid-cols-1 grid-rows-1 text-center text-2xl font-[tiny] font-black  cursor-pointer"
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
