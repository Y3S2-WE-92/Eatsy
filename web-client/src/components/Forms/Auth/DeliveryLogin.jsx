import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeLogo from "../../Logos/ThemeLogo";
import { styles } from "../../../styles/styles";
import { userAPI } from "../../../services";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useToast } from "../../../utils/alert-utils/ToastUtil";
import { useDispatch } from "react-redux";
import { setLoginDelivery } from "../../../redux/delivery/deliverySlice";

function DeliveryLogin() {
  const dispatch = useDispatch();
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
      const response = await axios.post(userAPI.DeliveryLogin, {
        username: loginData.username,
        password: loginData.password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        if (!token) {
          throw new Error("No token received from server");
        }

        const decodedToken = jwtDecode(token);

        localStorage.setItem("token", token);

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: decodedToken.id,
            name: response.data.user.name,
            username: response.data.user.username,
          })
        );

        dispatch(
          setLoginDelivery({
            id: decodedToken.id,
            name: response.data.user.name,
            username: response.data.user.username,
          })
        );

        console.log("Login successful", response.data);
        toast.success("Login successful!");
        navigate("/delivery");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in. Please try again.");
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
            Our Delivery Hero!
          </h2>
          <p className="text-sm text-center">
            Please enter your credentials to access your delivery dashboard.
          </p>

          <form
            onSubmit={handleSubmit}
            className="form-control flex flex-col gap-2 mt-4"
          >
            <input
              type="text"
              name="username"
              className="input"
              placeholder="Username"
              onChange={handleChange}
              value={loginData.username}
            />
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              onChange={handleChange}
              value={loginData.password}
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

export default DeliveryLogin;
