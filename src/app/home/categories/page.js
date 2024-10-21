import categoriesData from "../../../../public/categories";
import Card from "@/app/components/Card";
import Navbar from "@/app/components/Navbar";

const Categories = () => {
  return (
    <div>
      <Navbar components={""} />
      <div className="flex flex-col gap-6 h-full justify-around max-w-screen-xl m-auto px-4">
        <h1 className="text-6xl font-bold my-12 ml-2 mt-20">Categories</h1>
        {categoriesData.map((category) => (
          <div key={category.id} className="my-10">
            <h2 className="text-4xl font-semibold mb-6 ml-2">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 bg-black/20 rounded-3xl p-4 my-4 ">
              {category.subcategories &&
                category.subcategories.map((subcategory) => (
                  <Card
                    key={subcategory.id}
                    directory={`/categories/${category.id}`}
                    category={subcategory}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
