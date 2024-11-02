import React, { useRef } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import nikelogo from "../../assets/images/nikelogo.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Provider/AuthProvider";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginMutation = useMutation(
    (formData) =>
      axios
        .post("http://localhost:3000/user/login", formData)
        .then((response) => response.data.token),
    {
      onSuccess: (token) => {
        login(token);

        navigate("/");
      },
      onError: (error) => {
        console.error("Login error:", error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    loginMutation.mutate({ email, password });
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="max-w-lg w-full mx-auto flex flex-col items-center justify-start">
      <div className="mt-10"></div>
      <div className="text-3xl flex flex-row justify-start items-center text-start mb-4">
        <img src={nikelogo} width={100} height={100} alt="Nike Logo" />
        <span> Enter your email to sign in.</span>
      </div>
      <form onSubmit={handleSubmit} className="bg-white w-full px-6 py-5">
        <div className="mb-3">
          <label htmlFor="email" className="block text-gray-700 text-sm mb-1">
            Email
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 outline-none focus:border-black focus:ring-black focus:ring-opacity-50 focus:ring-1"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm mb-1"
          >
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 outline-none focus:border-black focus:ring-black focus:ring-opacity-50 focus:ring-1"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-black w-[100px] text-white py-2 px-4 rounded-full hover:opacity-75 focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
