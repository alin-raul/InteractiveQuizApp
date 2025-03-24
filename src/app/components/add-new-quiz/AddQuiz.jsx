"use client";

import HandleAddNewQuiz from "./HandleAddNewQuiz";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const quizCategoriesData = {
  question: "",
  answer: "",
  alternatives: ["", "", ""],
};

const initialQuizCategoriesData = {
  id: "",
  name: "",
  questions: [quizCategoriesData],
};

const QuizOverview = ({ quizData }) => {
  const [openQuizDialog, setOpenQuizDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizFormData, setQuizFormData] = useState(initialQuizCategoriesData);

  const [currentEditedQuizId, setCurrentEditedQuizId] = useState(null);
  const router = useRouter();

  const handleSaveQuizData = async () => {
    try {
      setLoading(true);

      const updatedQuizFormData = {
        ...quizFormData,
        id: currentEditedQuizId || quizFormData.id,
      };

      const apiResponse = await fetch("/api/add-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuizFormData),
      });

      const result = await apiResponse.json();

      if (result?.success) {
        setQuizFormData(initialQuizCategoriesData);
        setOpenQuizDialog(false);
        router.refresh();
      } else {
        console.error("Failed to save quiz:", result.message);
      }
    } catch (error) {
      console.error("An error occurred while saving the quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 flex flex-col gap-10 absolute z-10">
      <HandleAddNewQuiz
        openQuizDialog={openQuizDialog}
        setOpenQuizDialog={setOpenQuizDialog}
        loading={loading}
        setLoading={setLoading}
        quizFormData={quizFormData}
        setQuizFormData={setQuizFormData}
        handleSaveQuizData={handleSaveQuizData}
        currentEditedQuizId={currentEditedQuizId}
        setCurrentEditedQuizId={setCurrentEditedQuizId}
        quizData={quizData}
      />
    </div>
  );
};

export default QuizOverview;
