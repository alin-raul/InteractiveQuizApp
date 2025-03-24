import connectToDB from "@/app/database";
import { QuizCategory } from "@/app/models/quizData";
import Joi from "joi";
import { NextResponse } from "next/server";

// Define the schema for individual questions
const AddNewQuestions = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  alternatives: Joi.array().items(Joi.string().required()).required(),
});

// Define the schema for the new quiz data, including the ID
const AddNewQuiz = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  questions: Joi.array().items(AddNewQuestions).required(), // Ensure an array of questions
}).strict();

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the incoming request data
    const getQuiz = await req.json();
    const { id, name, questions } = getQuiz;

    // Validate the request body with Joi
    const { error } = AddNewQuiz.validate({
      id,
      name,
      questions,
    });

    // If validation fails, return a descriptive error message
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details.map((err) => err.message).join(", "),
      });
    }

    // Find the quiz by ID, using lean to avoid Mongoose document overhead
    const existingQuiz = await QuizCategory.findOne({ id }).lean();

    // If the quiz does not exist, return an error
    if (!existingQuiz) {
      return NextResponse.json({
        success: false,
        message: "Quiz not found",
      });
    }

    // Append the new questions to the existing quiz's questions array
    existingQuiz.questions.push(...questions);

    // Save the updated quiz document back to the database
    await QuizCategory.updateOne({ id }, { questions: existingQuiz.questions });

    // Return a success response if the update was successful
    return NextResponse.json({
      success: true,
      message: "Questions added successfully to the quiz",
    });
  } catch (error) {
    console.error("Error adding new questions to the quiz:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong :/",
    });
  }
}
