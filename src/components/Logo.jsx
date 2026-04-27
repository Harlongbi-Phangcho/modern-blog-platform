import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ width = "auto", className='' }) {
  return (
    <>
      <Link to="/" style={{ width }}>
        <div className={`text-xl font-bold tracking-tight text-[#007f5f] ${className}`}>
          Stack<span className="font-bold text-xl text-[#38a3a5]">Stories</span>
        </div>
      </Link>
    </>
  );
}
