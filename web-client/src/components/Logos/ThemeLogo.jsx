import React, { useContext } from "react";
import { logos } from "../../assets/logos";
import { ThemeContext } from "../../theme/ThemeContext";

function ThemeLogo({ style }) {
  const { theme } = useContext(ThemeContext);
  return (
    <img
      src={theme == "dark" ? logos.eatsyfullwhite : logos.eatsyfullblack}
      alt="logo"
      className={`${style}`}
    />
  );
}

export default ThemeLogo;
