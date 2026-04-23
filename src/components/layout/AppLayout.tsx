import {  Outlet } from "react-router-dom";
// import HomePage from "../../pages/HomePage";
import NavBarChakra from "../ui/navbarChakra/NavChakra";

function AppLayout() {
  
  return (
    <div>
      <NavBarChakra />
      {/* <HomePage/> */}
      <Outlet />
    </div>
  );
}

export default AppLayout;
