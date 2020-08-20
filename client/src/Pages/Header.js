import {KEEP} from "./../AppConstants";
import keepIcon from "../styles/keepIcon.png";
import React from "react";

const Header = () => {
    return (
        <nav className="header">
            <img src={keepIcon} className={"keepIcon"}/>
            <h2>{KEEP}</h2>
        </nav>
    );
};

export default Header;