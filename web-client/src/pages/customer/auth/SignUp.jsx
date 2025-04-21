import React, { useState } from "react";
import { ThemeButton, CloseButton, ThemeLogo } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userAPI } from "../../../services";
import { useToast } from "../../../utils/alert-utils/ToastUtil";

function SignUp() {
  const toast = useToast();
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !signupData.name ||
      !signupData.email ||
      !signupData.phone ||
      !signupData.username ||
      !signupData.password ||
      !signupData.confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(userAPI.CustomerRegister, {
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        username: signupData.username,
        password: signupData.password,
      });
      if (response.status === 201) {
        console.log("Sign up successful", response.data);
        toast.success("Sign up successful");
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.response && error.response.status === 400) {
        toast.error("Username already exists");
      } else {
        toast.error("Error signing up. Please try again.");
      }
    }
  };

  return (
    <div className="signup min-h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 p-4">
        <CloseButton link={"/"} />
      </div>
      <div className="absolute top-0 right-0 p-4">
        <ThemeButton />
      </div>
      <div className="card card-xl bg-base-300 shadow-sm w-full max-w-sm mx-auto">
        <div className="card-body">
          <ThemeLogo style={"w-48 mx-auto"} />
          <div className="card-title text-lg mt-4">Create an Account</div>
          <form
            onSubmit={handleSubmit}
            className="form-control flex flex-col gap-2"
          >
            <input
              type="text"
              name="name"
              value={signupData.name}
              onChange={handleChange}
              placeholder="Name"
              className="input"
            />
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input"
            />
            <input
              type="text"
              name="phone"
              value={signupData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="input"
            />
            <input
              type="text"
              name="username"
              value={signupData.username}
              onChange={handleChange}
              placeholder="Username"
              className="input"
            />
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input"
            />
            <input
              type="password"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="input"
            />
            <div className="card-actions justify-end mt-3">
              <button type="submit" className="btn btn-primary w-full">
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-sm text-center mt-4">
            <small>
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-primary font-bold cursor-pointer"
              >
                Login
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
