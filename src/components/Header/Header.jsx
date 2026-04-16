import React, { useState } from "react";
import Container from "../Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
            <Logo width="70px" />
         

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-3">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-4 py-2 text-sm rounded-lg transition
                        ${
                          location.pathname === item.slug
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li className="ml-2">
                <div className="border-l pl-3">
                  <LogoutBtn />
                </div>
              </li>
            )}
          </ul>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1"
          >
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-white border rounded-xl shadow p-4">
            <ul className="flex flex-col gap-3">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg transition
                          ${
                            location.pathname === item.slug
                              ? "bg-blue-100 text-blue-600"
                              : "text-gray-700 hover:bg-blue-50"
                          }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ),
              )}

              {authStatus && (
                <li className="pt-2 border-t">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}
