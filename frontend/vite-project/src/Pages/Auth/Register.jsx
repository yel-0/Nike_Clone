import React, { useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "react-query";
import nikelogo from "../../assets/images/nikelogo.jpg";
import { useToast } from "@/hooks/use-toast";

const Url = "http://localhost:3000/user";
function userRegister() {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation(
    async (userData) => {
      const response = await axios.post(`${Url}/register`, userData);
      return response.data;
    },
    {
      onSuccess: () => {
        toast({
          title: "Registration successful",
          description: "Welcome! Your account has been created successfully.",
        });

        navigate("/login");
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Something went wrong. Please try again later.",
        });
      },
    }
  );
}

const Register = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { mutate } = userRegister();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await mutate({ name, email, password });
    } catch (error) {
      console.log(error);
    }
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="w-full flex flex-col justify-center max-w-lg  m-auto items-center">
      <div className="mt-10"></div>
      <div className="text-2xl md:text-3xl flex flex-col md:flex-row justify-start items-center text-center md:text-start mb-4 space-y-4 md:space-y-0">
        <img src={nikelogo} width={100} height={100} alt="Nike Logo" />
        <span className="md:ml-4">Enter your email to join us.</span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white w-[100%] p-[1rem] lg:p-0 lg:w-[600px]"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
            Name
          </label>
          <input
            ref={nameRef}
            className=" border-[1px] border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 outline-none focus:border-black focus:ring-[1px] focus:ring-black/50"
            id="name"
            type="text"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
            Email
          </label>
          <input
            ref={emailRef}
            className=" border-[1px] border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 outline-none focus:border-black focus:ring-[1px] focus:ring-black/50"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            ref={passwordRef}
            className=" border-[1px] border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 outline-none focus:border-black focus:ring-[1px] focus:ring-black/50"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-end">
          <button
            className="bg-black hover:opacity-75 rounded-full text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <div className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 ">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;
