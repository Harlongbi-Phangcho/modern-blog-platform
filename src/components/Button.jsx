import React from "react";

function Button({
  children,
  type = "button",
  variant = "primary", // primary | secondary | danger | outline
  className = "",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "px-4 py-2 rounded-lg text-sm font-medium transition duration-200 focus:outline-none";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-sm",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:scale-95",
    danger: "bg-red-500 text-white hover:bg-red-600 active:scale-95",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? disabledStyles : ""
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
