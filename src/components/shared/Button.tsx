/*
Button.tsx
AUTHORS: NA, FC, VD, RK, AP
LAST EDITED: 6-3-2024
DESCRIPTION: Button.tsx: Describes the "button" component which allows for buttons with similar formatting between pages
*/

import { FC, HTMLAttributes } from "react";

// creates the button properties types type called ButtonPropTypes
type ButtonPropTypes = {
  name: string;
  type?: "button" | "submit" | "reset";
  style: "primary" | "secondary" | "delete";
  disabled?: boolean;
  size?: "small";
  loading?: boolean;
  css?: HTMLAttributes<HTMLButtonElement>["className"];
  onClick?: () => void;
};

// Describes a React Functional Component called Button
const Button: FC<ButtonPropTypes> = ({
  name,
  style,
  type,
  disabled,
  size,
  loading,
  css,
  onClick,
}) => {
  return style === "primary" ? (
    <button
      className={`${
        size === "small" ? "text-sm" : "text-md"
      } flex flex-row items-center gap-x-2 rounded-md border-[1px] border-[#282828] py-0.5 px-2 font-light ${
        disabled ? "text-[#282828]" : "text-white"
      } ${
        disabled || loading === true ? "" : "hover:bg-white hover:text-black"
      } ${css}`}
      type={type}
      disabled={disabled || loading === true}
      onClick={onClick}
    >
      {name}
    </button>
  ) : style == "secondary" ? (
    <button
      className={`${
        size === "small" ? "text-sm" : "text-md"
      } px-2 py-0.5 font-light text-[#969696] hover:text-white ${css}`}
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  ) : style == "delete" ? (
    <button
      className={`${
        size === "small" ? "text-sm" : "text-md"
      } text-md px-2 py-0.5 font-light text-[#969696] hover:text-red-500 ${css}`}
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  ) : (
    <button
      className={`${
        size === "small" ? "text-sm" : "text-md"
      } px-2 py-0.5 font-light text-[#969696] hover:text-white ${css}`}
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export { Button };
