import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ width = "auto", className='' }) {
  return (
    <>
      <Link to="/" style={{ width }}>
        <div className={`text-sm font-bold tracking-tight text-indigo-600 ${className}`}>
          Stack<span className="font-bold text-xl text-indigo-800">Stories</span>
        </div>
      </Link>
    </>
  );
}
