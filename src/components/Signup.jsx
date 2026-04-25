import React, { useState } from "react";
import authService from "../appwrite/auth";
import { login as storeLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Input, Button, Logo } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    try {
      setError("");
      const session = await authService.createAccount(data);

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
      setError(error?.message || "Failed to create account. Please try again.");
    }
  };
  return (
    <div className="flex w-full max-w-xl mx-auto items-center justify-center min-h-[80vh] rounded bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Logo width="80px" />
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-[#007f5f]">
          Create your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

         {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-4">
          <div className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              {...register("name", { required: "Name is required", })}
            />

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
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                 minLength: {
              value: 6,
              message: "Minimum 6 characters required",
            },
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
