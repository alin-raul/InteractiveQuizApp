"use client";
import React from "react";
import { useRouter } from "next/navigation";

const MyButton = ({
  path,
  backgroundColor,
  buttonText = "Click",
  onClick,
  style,
  glow,
  shadow,
  icon,
  iconSize,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    if (path) router.push(path);
  };

  return (
    <div
      className={`flex gap-2 justify-center items-center text-2xl font-bold font-[tiny] px-4 py-2 w-fit transition-all duration-300 ease-in-out ${
        backgroundColor ? backgroundColor : "bg-accent"
      } ${glow} ${shadow} hover:brightness-125 cursor-pointer`}
      onClick={handleClick}
      style={{ backgroundColor: style }}
    >
      {buttonText}
      {icon && <span style={{ fontSize: `${iconSize}px` }}>{icon}</span>}
    </div>
  );
};

export default MyButton;
