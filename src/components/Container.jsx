import React from "react";

export default function Container({ children, className = "" }) {
  return (
    <div className={`${className} w-full max-w-7xl mx-auto px-4`}>
      {children}
    </div>
  );
}
