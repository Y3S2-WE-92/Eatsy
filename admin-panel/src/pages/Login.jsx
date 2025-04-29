import React, { useState } from "react";
import { ThemeButton, ThemeLogo } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userAPI } from "../services";
import { jwtDecode } from "jwt-decode";
import { useToast } from "../utils/alert-utils/ToastUtil";

function Login() {
  const toast = useToast();
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
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(userAPI.AdminLogin, {
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

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: decodedToken.id,
            name: response.data.user.name,
            username: response.data.user.username,
          })
        );

        console.log("Login successful", response.data);
        toast.success("Login successful");
        navigate("/admin-panel");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in. Please try again.");
    }
  };

  return (
    <div className="login min-h-screen flex items-center justify-center">
      <div className="absolute top-0 right-0 p-4">
        <ThemeButton />
      </div>

      <div className="card card-xl bg-base-300 shadow-sm w-full max-w-sm mx-auto">
        <div className="card-body">
          <ThemeLogo style={"w-48 mx-auto"} />
          <div className="text-xl mt-4 text-center font-bold mb-4">
            Admin Panel
          </div>
          <form
            onSubmit={handleSubmit}
            className="form-control flex flex-col gap-2"
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input"
              onChange={handleChange}
              value={loginData.username}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
              onChange={handleChange}
              value={loginData.password}
            />
            <div className="card-actions justify-end mt-3">
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
