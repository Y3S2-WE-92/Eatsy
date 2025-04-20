import React, { useContext } from "react";
import { logos } from "../../assets/logos";
import { ThemeContext } from "../../theme/ThemeContext";

function ThemeTextLogo({ style }) {
  const { theme } = useContext(ThemeContext);
  return (
    <img
      src={theme == "dark" ? logos.eatsytextwhite : logos.eatsytextblack}
      alt="logo"
      className={`${style}`}
    />
  );
}

export default ThemeTextLogo;
