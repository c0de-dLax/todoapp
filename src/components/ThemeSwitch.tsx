import React, { useEffect, Dispatch, SetStateAction } from "react";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

interface ThemeSwitchProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ theme, setTheme }) => {
  const selectThemeHandler = (newTheme: string) => {
    if (newTheme === "dark" || newTheme === "light") {
      setTheme(newTheme);
      localStorage.setItem("themeForTodoApp", newTheme);
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <section className="inline-block float-left">
      <label
        className="switch"
        title={
          theme === "dark"
            ? "Click to switch to Light theme"
            : "Click to switch to Dark theme"
        }
      >
        <input
          name="Theme switch"
          type="checkbox"
          onClick={() =>
            selectThemeHandler(theme === "dark" ? "light" : "dark")
          }
        />
        {theme === "dark" ? (
          <div className="disable-select absolute mt-[3px] ml-[30px] py-1 px-[5px] cursor-pointer rounded-[8px] z-[1] AnimateFadeInDark">
            <MoonIcon
              aria-label="Switch to light theme"
              className="w-[18px] h-[18px] m-auto text-white"
            />
          </div>
        ) : (
          <div className="disable-select absolute mt-[1px] ml-[0.5px] py-1 px-[5px] cursor-pointer rounded-[8px] z-[1] AnimateFadeInLight">
            <SunIcon
              aria-label="Switch to dark theme"
              className="w-[22px] h-[22px] m-auto text-[rgb(255,183,58)]"
            />
          </div>
        )}
        <span
          className={`slider round ${theme === "dark" ? "dark" : ""}`}
        ></span>
      </label>
    </section>
  );
};

export default ThemeSwitch;
