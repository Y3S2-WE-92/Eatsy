import React, { useContext } from "react";
import { logos } from "../../assets/logos";
import { ThemeContext } from "../../theme/ThemeContext";

function ThemeLogo({ width }) {
  const { theme } = useContext(ThemeContext);
  return (
    <img
      src={theme == "dark" ? logos.eatsyfullwhite : logos.eatsyfullblack}
      alt="logo"
      className={`w-${width} mx-auto`}
    />
  );
}

export default ThemeLogo;
