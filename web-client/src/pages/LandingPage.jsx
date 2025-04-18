import React from "react";
import { ThemeButton, ThemeLogo, ComponentHealth } from "../components";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <div className="absolute top-0 right-0 p-4">
        <Link to={"/auth/login"}>
          <button className="btn btn-error rounded-full me-2">Login</button>
        </Link>
        <Link to={"/auth/signup"}>
        <button className="btn btn-success rounded-full me-4">Sign Up</button>
        </Link>
        <ThemeButton />
      </div>
      <ThemeLogo style={"w-64 mx-auto"} />
      <p className="mt-8">Check Component Availability Here</p>
      <ComponentHealth />
    </div>
  );
}

export default LandingPage;
