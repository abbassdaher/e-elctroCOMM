import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
import DropDown from "./DropDown";

const NavBar = () => {
  
  // const cartItemsCount = useSelector((state: { addToCart: { value: number } }) => state.addToCart.value);
  return (
    <Fragment>
      <div className="navbar flex flex-row  justify-around p-2 ">
        <h1 className="font-bold">e-elctroCOMM</h1>
        <ul className="flex flex-row justify-content-center gap-4 cursor-pointer">
          <li><DropDown /></li>
          <li>About</li>
          <li>login</li>
        </ul>
      </div>
    </Fragment>
  );
};

export default NavBar;
