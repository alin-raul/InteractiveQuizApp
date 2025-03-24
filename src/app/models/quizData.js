import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  alternatives: [String],
});

const QuizCategorySchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    questions: [QuestionSchema],
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
        delete ret.createdAt;
        return ret;
      },
    },
  }
);

const QuizCategory =
  mongoose.models.QuizCategory ||
  mongoose.model("QuizCategory", QuizCategorySchema);

export { QuizCategory };
