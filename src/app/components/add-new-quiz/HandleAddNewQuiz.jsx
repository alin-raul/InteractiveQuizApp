"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useQuiz } from "@/app/context/quiz-context";

const HandleAddNewQuiz = ({
  openQuizDialog,
  setOpenQuizDialog,
  loading,
  quizFormData = {
    id: "",
    name: "",
    questions: [{ question: "", answer: "", alternatives: ["", "", ""] }],
  },
  setQuizFormData,
  handleSaveQuizData,
}) => {
  const { quizData } = useQuiz();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const handleDialogClose = (isOpen) => {
    setOpenQuizDialog(isOpen);
    if (!isOpen) {
      resetForm();
    }
  };

  const resetForm = () => {
    setQuizFormData({
      id: "",
      name: "",
      questions: [{ question: "", answer: "", alternatives: ["", "", ""] }],
    });
    setSelectedCategory("");
    setSubcategories([]);
  };

  const handleCategoryChange = (categoryName) => {
    const selectedCategory = quizData.categories.find(
      (category) => category.name === categoryName
    );

    if (selectedCategory) {
      setSelectedCategory(selectedCategory.name);
      setQuizFormData({
        ...quizFormData,
        id: selectedCategory.id,
        name: selectedCategory.name,
      });

      setSubcategories(selectedCategory.subcategories || []);
    }
  };

  const handleSubcategoryChange = (subcategoryName) => {
    const subcategory = subcategories.find(
      (subcategory) => subcategory.name === subcategoryName
    );

    if (subcategory) {
      setSelectedSubcategory(subcategory.name);
      setQuizFormData({
        ...quizFormData,
        id: subcategory.id,
        name: subcategory.name,
      });
    }
  };

  const handleAlternativeChange = (index, value) => {
    const updatedQuestions = quizFormData.questions.map((question, qIndex) => {
      if (qIndex === 0) {
        const updatedAlternatives = [...question.alternatives];
        updatedAlternatives[index] = value;
        return { ...question, alternatives: updatedAlternatives };
      }
      return question;
    });

    setQuizFormData({ ...quizFormData, questions: updatedQuestions });
  };

  const handleQuestionChange = (event) => {
    const updatedQuestions = quizFormData.questions.map((question, qIndex) => {
      if (qIndex === 0) {
        return { ...question, question: event.target.value };
      }
      return question;
    });

    setQuizFormData({ ...quizFormData, questions: updatedQuestions });
  };

  const handleAnswerChange = (event) => {
    const updatedQuestions = quizFormData.questions.map((question, qIndex) => {
      if (qIndex === 0) {
        return { ...question, answer: event.target.value };
      }
      return question;
    });

    setQuizFormData({ ...quizFormData, questions: updatedQuestions });
  };

  return (
    <>
      <div className="flex justify-center items-center mt-2 z-10">
        {/* <Button
          className="w-28 rounded-xl mx-2 "
          onClick={() => setOpenQuizDialog(true)}
        >
          Add Quiz +
        </Button> */}
        {/* <ModeToggle /> */}
      </div>

      <Dialog open={openQuizDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="">Add new quiz</DialogTitle>
            <DialogDescription>
              Add more quizzes to the already existing ones.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
                className="col-span-3"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {quizData.categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {subcategories.length > 0 && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subcategory" className="text-right">
                  Subcategory
                </Label>
                <Select
                  value={selectedSubcategory}
                  onValueChange={handleSubcategoryChange}
                  className="col-span-3 "
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.name}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="question" className="text-right">
                Question
              </Label>
              <Input
                name="question"
                placeholder="Enter question"
                value={quizFormData.questions[0].question || ""}
                onChange={handleQuestionChange}
                id="question"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="answer" className="text-right">
                Answer
              </Label>
              <Input
                name="answer"
                placeholder="Enter answer"
                value={quizFormData.questions[0].answer || ""}
                onChange={handleAnswerChange}
                id="answer"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alternatives" className="text-right">
                Alternatives
              </Label>
              <div className="col-span-3 grid gap-2">
                {quizFormData.questions[0].alternatives.map(
                  (alternative, index) => (
                    <Input
                      key={index}
                      placeholder={`Alternative ${index + 1}`}
                      value={alternative}
                      onChange={(event) =>
                        handleAlternativeChange(index, event.target.value)
                      }
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleSaveQuizData}
              type="button"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit Quiz"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HandleAddNewQuiz;
