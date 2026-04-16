import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ width = "auto" }) {
  return (
    <>
      <Link to="/" style={{ width }}>
        <div className="text-xl font-bold tracking-tight text-gray-800">
          Dev<span className="text-blue-600">UI</span>
        </div>
      </Link>
    </>
  );
}
