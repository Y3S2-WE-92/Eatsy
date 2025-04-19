import React from "react";
import { Link } from "react-router-dom";
import ThemeLogo from "../../Logos/ThemeLogo";
import { styles } from "../../../styles/styles";

function RestaurantLogin() {
  return (
    <div
      className={`${styles.paddingY} flex flex-col items-center justify-center h-screen bg-base-300`}
    >
      <div className="card card-xl w-full max-w-sm mx-auto">
        <div className="card-body">
          <ThemeLogo style={"w-32 md:w-48 mx-auto"} />
            <h2 className="text-2xl font-bold text-center mt-4">
                Welcome back, Restaurant Owner!
            </h2>
          <p className="text-sm text-center">
            Please enter your credentials to access your restaurant dashboard.
            </p>
          
          <form className="form-control flex flex-col gap-2 mt-4">
            <input
              type="text"
              name="username"
              className="input"
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
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
