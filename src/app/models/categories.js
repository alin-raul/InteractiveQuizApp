import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema({
  id: String,
  name: String,
});

const CategorySchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    subcategories: [SubcategorySchema],
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

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export { Category };
