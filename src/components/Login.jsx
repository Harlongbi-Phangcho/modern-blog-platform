import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../store/authSlice";
import { Logo, Input, Button } from "./index";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data) => {
    setError("");
    try {
      // Try deleting existing session first
      try {
        await authService.logout();
      } catch (e) {
        // ignore if no session
      }

      const session = await authService.login(data);
      
      if (session) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(
            storeLogin({
              $id: user.$id,
              email: user.email,
              name: user.name,
            }),
          );
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error?.message || "Login failed. Please try again.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-gray-100 rounded-xl p-10 border border-black/10">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Logo width="80px" />
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-4">
          <div className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Please enter a valid email address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
