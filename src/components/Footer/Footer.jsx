import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index";

function Footer() {
  return (
    <footer className=" bg-gray-100/60 border-t mt-2 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="flex flex-col justify-between">
            <div>
              <Logo width="90px" />
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                A modern platform to share and explore posts. Clean, simple, and fast.
              </p>
            </div>
            <p className="mt-6 text-xs text-gray-500">
              © 2026 DevUI. All rights reserved.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-[#007f5f] mb-4 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-blue-600 text-sm transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-[#38a3a5] mb-4 uppercase tracking-wide">
              Support
            </h3>
            <ul className="space-y-3">
              {["Account", "Help", "Contact Us", "Customer Support"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-blue-600 text-sm transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-[#007f5f] mb-4 uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-3">
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-blue-600 text-sm transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
