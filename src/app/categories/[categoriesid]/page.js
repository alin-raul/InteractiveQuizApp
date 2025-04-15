import Card from "@/app/components/Card";
import { fetchQuizData } from "@/app/fetchData/fetchQuizData";

const categoriesPage = async ({ params }) => {
  const data = await fetchQuizData();
  console.log(params);

  const categoryId = params.categoriesid;
  const category = data.categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Category not found</h1>
      </div>
    );
  }
  const subcategories = category.subcategories || [];

  return (
    <div>
      <div className="flex flex-col gap-6 justify-around max-w-screen-xl m-auto px-4 pt-20 md:h-screen">
        <h1 className="text-6xl font-bold mx-12">
          <span className="font-normal">You chose the </span>
          {category.name} <span className="font-normal">category.</span>
        </h1>

        <div className=" ">
          <p className="text-lg font-normal mb-6 px-2 text-accent-foreground/60">
            Click on a category to begin a quiz.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3  p-4 ">
            {subcategories.map((subcategory) => (
              <Card
                key={subcategory.id}
                directory={`/categories/${category.id}/${
                  subcategory.id + "-quiz"
                }/0`}
                category={subcategory}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default categoriesPage;
