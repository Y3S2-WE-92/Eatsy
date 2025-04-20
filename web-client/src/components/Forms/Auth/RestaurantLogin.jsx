import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeLogo from "../../Logos/ThemeLogo";
import { styles } from "../../../styles/styles";
import { userAPI } from "../../../services";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function RestaurantLogin() {
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
      const response = await axios.post(userAPI.RestaurantLogin, {
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
        alert("Login successful!");
        navigate("/restaurant");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert(
        error.response?.data?.message || "Error logging in. Please try again."
      );
    }
  };

  return (
    <div
      className={`${styles.paddingY} flex flex-col items-center justify-center h-screen bg-base-300`}
    >
      <div className="card card-xl w-full max-w-sm mx-auto">
        <div className="card-body">
          <ThemeLogo style={"w-32 md:w-48 mx-auto"} />
          <h2 className="text-2xl font-bold text-center mt-4">
            Welcome back,
            <br />
            Restaurant Owner!
          </h2>
          <p className="text-sm text-center">
            Please enter your credentials to access your restaurant dashboard.
          </p>

          <form onSubmit={handleSubmit} className="form-control flex flex-col gap-2 mt-4">
            <input
              type="text"
              name="username"
              className="input"
              placeholder="Username"
              value={loginData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
            />
            <Link to="/auth/forgot-password" className="text-sm text-right">
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

export default RestaurantLogin;
