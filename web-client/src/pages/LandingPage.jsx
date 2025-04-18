import React from "react";
import { ThemeButton, ThemeLogo, ComponentHealth } from "../components";

function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <div className="absolute top-0 right-0 p-4">
        <ThemeButton />
      </div>
      <ThemeLogo width={"[300px]"} />
      <ComponentHealth />
    </div>
  );
}

export default LandingPage;
