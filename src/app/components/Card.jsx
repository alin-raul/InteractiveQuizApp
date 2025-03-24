import Link from "next/link";
import RandomColorSetter from "./utils/RandomColorSetter";

const Card = ({ directory, category }) => {
  const categoryId = category.id;
  const { backgroundColor } = RandomColorSetter(categoryId);

  console.log(directory);

  return (
    <Link href={`${directory}`}>
      <div className="flex flex-col justify-center items-center h-60 bg-accent/50 hover:brightness-125 relative">
        <div
          className="w-4 h-4 border absolute top-5 right-5"
          style={{
            backgroundColor,
          }}
        ></div>
        <h3
          className="text-2xl font-black font-[tiny] px-6 py-3"
          style={{
            backgroundColor,
          }}
        >
          {category.name.toUpperCase()}
        </h3>
      </div>
    </Link>
  );
};

export default Card;
