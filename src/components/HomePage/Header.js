import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Header.css'

const Header = () =>{
    return (
        <header>
            <h1>Paint Stream IOT App</h1>
            <hr />
            <div className="links">
                <NavLink to="/" className="link" activeClassName="active" exact>
                    Room List
                </NavLink>
                <NavLink to="/add" className="link" activeClassName="active">
                    Create New Room
                </NavLink>
            </div>
        </header>
    );
}
export default Header;