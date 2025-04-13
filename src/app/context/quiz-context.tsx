"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

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

type QuizContextType = {
  quizData: QuizData | null;
  setQuizData: (data: QuizData) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

export const QuizProvider: React.FC<{
  children: ReactNode;
  initialData?: QuizData | null;
}> = ({ children, initialData = null }) => {
  const [quizData, setQuizData] = useState<QuizData | null>(initialData);

  return (
    <QuizContext.Provider value={{ quizData, setQuizData }}>
      {children}
    </QuizContext.Provider>
  );
};
