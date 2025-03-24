import connectToDB from "@/app/database";
import { Category } from "@/app/models/categories";
import { QuizCategory } from "@/app/models/quizData";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const categories = await Category.find({});
    const quizCategories = await QuizCategory.find({});

    if (!categories.length && !quizCategories.length) {
      return NextResponse.json({
        success: false,
        message: "No quiz data found one :/",
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        categories,
        quizCategories,
      },
    });
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong two :/",
    });
  }
};
