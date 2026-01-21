import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";
const NavBar = () => {
  // const cartItemsCount = useSelector((state: { addToCart: { value: number } }) => state.addToCart.value);
  return (
    //

    <Fragment>
      <div className="navbar flex flex-row  justify-around ">
        <h1 className="font-bold">
          <Link to="/">E-ElctroCOMM</Link>
        </h1>

        <ul className="flex flex-row justify-content-center gap-4 cursor-pointer">
          <li>
            <DropDown />
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>Login</li>
        </ul>
      </div>
    </Fragment>
  );
};

export default NavBar;
