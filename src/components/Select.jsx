import React, { useId } from "react";

function Select({ label, options, className = "", ...props }, ref) {
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
      <select 
      id={id}
      ref={ref}
      {...props}
       className={`
          w-full px-3 py-2 rounded-lg border text-sm
          bg-white text-gray-800
          transition duration-200 outline-none

          border-gray-300
          focus:ring-2 focus:ring-blue-200 focus:border-blue-500

          ${className}
        `}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
