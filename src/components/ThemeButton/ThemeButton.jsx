import React, { useContext } from "react";
import { ThemeContext } from "../Context/Context";

function ThemeButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <button onClick={toggleTheme} className={`${theme}-theme`}>
            Switch Theme
        </button>
    );
}

export default ThemeButton;