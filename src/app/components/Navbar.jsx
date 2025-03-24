import Link from "next/link";

const Navbar = ({ links }) => {
  const alignmentClass =
    links?.length === 1 ? "justify-start mx-5" : "justify-around";

  return (
    <>
      <div className="flex justify-center items-center w-full m-auto h-14 absolute top-0 left-0 bg-black/40 border-b border-teal-300/20">
        <ul className={`w-full flex ${alignmentClass}`}>
          {links?.map((link) => {
            return (
              <li key={link.name}>
                <Link
                  className="font-semibold outline outline-2 outline-teal-500 rounded-xl px-4 py-1 hover:bg-teal-500 hover:text-violet-950 hover:font-extrabold"
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
