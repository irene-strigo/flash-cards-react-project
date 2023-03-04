import React, { useContext } from "react";
import { ThemeContext } from "../Context/Context";

function Footer() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`FooterContainer ${theme}-theme`} >
            & copy; ItgirlsSchool 2023

        </div >

    )


}

export default Footer