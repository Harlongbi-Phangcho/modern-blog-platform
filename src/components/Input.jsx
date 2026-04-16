import React, { useId } from "react";

function Input(
  {
    label,
    type = "text",
    placeholder,
    className = "",
    error,
    disabled = false,
    ...props
  },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 rounded-lg border text-sm
          bg-white text-gray-800
          transition duration-200 outline-none

          ${error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : ""}
          
          ${className}
        `}
        ref={ref}
        {...props}
      />

       {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

export default React.forwardRef(Input);
