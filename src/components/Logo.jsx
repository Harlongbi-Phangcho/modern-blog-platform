import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/Logo.png";
export default function Logo({ width = "auto", className = "" }) {
  return (
    <>
      <Link to="/" style={{ width }}>
        <div className="flex items-center gap-1">
          <img src={logo} alt="" className="h-10 w-auto" />

          <div>
            <p>
              Stack<span className="text-indigo-700">stories</span>
            </p>
            <p className="text-[8px] -mt-1">-Your story. Your stack-</p>
          </div>
        </div>
      </Link>
    </>
  );
}
