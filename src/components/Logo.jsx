import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ width = "auto", className='' }) {
  return (
    <>
      <Link to="/" style={{ width }}>
        <div className={`text-xl font-bold tracking-tight text-gray-800 ${className}`}>
          Dev<span className="text-blue-600">UI</span>
        </div>
      </Link>
    </>
  );
}
