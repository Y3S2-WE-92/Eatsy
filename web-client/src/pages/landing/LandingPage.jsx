import React from "react";
import { LandingNavbar, ThemeLogo, ComponentHealth } from "../../components";

function LandingPage() {
  return (
    <div className="h-screen">
      <LandingNavbar />
      <div className="relative flex flex-col items-center justify-center">
        <ThemeLogo style={"w-2xs mx-auto"} />
        <p className="mt-8">Check Component Availability Here</p>
        <ComponentHealth />
      </div>
    </div>
  );
}

export default LandingPage;
