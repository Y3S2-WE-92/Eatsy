import React, { useState } from "react";
import { ThemeButton, CloseButton, ThemeLogo } from "../../components";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { apiEndpoints } from "../../services";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate(); 
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.username || !loginData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(apiEndpoints.userAPI.UserLogin, {
        username: loginData.username,
        password: loginData.password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        if (!token) {
          throw new Error("No token received from server");
        }

        const decodedToken = jwtDecode(token);
        // console.log("Decoded JWT:", decodedToken);

        localStorage.setItem("token", token);

        localStorage.setItem("user", JSON.stringify({
          id: decodedToken.id,
          name: response.data.user.name,
          username: response.data.user.username,
        }));

        console.log("Login successful", response.data);
        alert("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.response?.data?.message || "Error logging in. Please try again.");
    }
  };

  return (
    <div className="login min-h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 p-4">
        <CloseButton link={"/"} />
      </div>
      <div className="absolute top-0 right-0 p-4">
        <ThemeButton />
      </div>

      <div className="card card-xl bg-base-300 shadow-sm w-full max-w-sm mx-auto">
        <div className="card-body">
          <ThemeLogo style={"w-48 mx-auto"}/>
          <div className="card-title text-lg mt-4">Welcome back!</div>
          <form
            onSubmit={handleSubmit}
            className="form-control flex flex-col gap-2"
          >
            <input
              type="text"
              name="username" 
              value={loginData.username} 
              onChange={handleChange} 
              placeholder="Username"
              className="input"
            />
            <input
              type="password"
              name="password" 
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input"
            />
            <Link
              to="/auth/forgot-password"
              className="text-sm text-right"
            >
              <small>Forgot Password?</small>
            </Link>
            <div className="card-actions justify-end mt-3">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>
          <div className="text-sm text-center mt-2">
            <small>
              Don't have an account?{" "}
              <Link
                to="/auth/signup"
                className="text-primary font-bold cursor-pointer"
              >
                Register
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;